"use client";

import { useState } from "react";
import { ISimulacao } from "@/app/types/ISimulacao";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon, SearchX, Trash } from "lucide-react";
import { useSimulador } from "../context/SimuladorContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { deleteSimulacao, fetchSimulacao } from "@/lib/api";
import { useUser } from "../../context/UserContext";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";

export default function DropDownMenuSimulacoes() {
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSimulacao, setSelectedSimulacao] = useState<ISimulacao | null>(
    null
  );
  const {
    setValue,
    setSelectedPontos,
    setSelectedPontosBonificados,
    setSelectedTabelaPreco,
    concessoes_ponto,
    produtos,
    simulacao,
    isSimulacaoOpen,
    simulacaoObject,
    reset,
    setIsSimulacaoOpen,
    setNameSimulacao,
    setSimulacaoObject,
  } = useSimulador();

  const { user } = useUser();

  const [searchTerm, setSearchTerm] = useState("");

  const abrirDialogExcluir = (simulacao: ISimulacao) => {
    setSelectedSimulacao(simulacao);
    setOpenDialog(true);
  };

  const filteredSimulacoes = simulacao
    .filter((s) => s.nome.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const dateA = new Date(a.insert_data_horario ?? "1970-01-01T00:00:00Z");
      const dateB = new Date(b.insert_data_horario ?? "1970-01-01T00:00:00Z");

      return dateB.getTime() - dateA.getTime();
    });

  function handleAbrirSimulacao(simulacao: ISimulacao) {
    setIsSimulacaoOpen(true);
    setSimulacaoObject(simulacao);
    setNameSimulacao(simulacao.nome);

    const veiculacao_paga = simulacao.veiculacoes.filter(
      (veiculacao) => !veiculacao.is_bonificacao
    )[0];

    const produto_veiculacao_paga = veiculacao_paga.produtos.map(
      (produto) => produto.id_produto
    );

    const produtos_pagos = produtos
      .filter((produto) => produto_veiculacao_paga.includes(produto.id_produto))
      .map((produto) => produto.id_concessao_ponto);

    const pontos = concessoes_ponto
      .filter((concessao) =>
        produtos_pagos.includes(concessao.id_concessao_ponto)
      )
      .map((ponto) => ponto.id_ponto);

    setSelectedPontos(pontos);
    setValue("dias", veiculacao_paga.qtd_segundos_veiculacao / 86400);
    setValue("saturacao", veiculacao_paga.saturacao);
    setValue("desconto", simulacao.desconto);

    const veiculacao_bonificada = simulacao.veiculacoes.filter(
      (veiculacao) => veiculacao.is_bonificacao
    )[0];

    if (veiculacao_bonificada) {
      const produto_veiculacao_bonificada = veiculacao_bonificada.produtos.map(
        (produto) => produto.id_produto
      );

      const produtos_bonificados = produtos
        .filter((produto) =>
          produto_veiculacao_bonificada.includes(produto.id_produto)
        )
        .map((produto) => produto.id_concessao_ponto);

      const pontos_bonificados = concessoes_ponto
        .filter((concessao) =>
          produtos_bonificados.includes(concessao.id_concessao_ponto)
        )
        .map((ponto) => ponto.id_ponto);

      setSelectedPontosBonificados(pontos_bonificados);
      setValue(
        "dias_bonificados",
        veiculacao_bonificada.qtd_segundos_veiculacao / 86400
      );
      setValue("saturacao_bonificada", veiculacao_bonificada.saturacao);
    } else {
      setValue("dias_bonificados", 0);
      setSelectedPontosBonificados([]);
      setValue("saturacao_bonificada", 1);
    }
    setSelectedTabelaPreco(String(simulacao.ano_preco_tabela));
  }

  async function handleDeletarSimulacao(id_simulacao: number) {
    try {
      await deleteSimulacao(id_simulacao);
      setOpenDialog(false);
      toast.success("Simulação deletada com sucesso!");
      if (simulacaoObject?.id_simulacao === id_simulacao) {
        setIsSimulacaoOpen(false);
        reset();
        setNameSimulacao("");
        setSelectedPontos([]);
        setSelectedPontosBonificados([]);
      }
      setSelectedSimulacao(null);
      await queryClient.fetchQuery({
        queryKey: ["simulacao", user?.id_colaborador],
        queryFn: ({ queryKey }) => {
          const [, id_colaborador] = queryKey;
          return fetchSimulacao({ id_colaborador });
        },
      });
    } catch {
      toast.error("Houve um erro ao tentar deletar a simulação.");
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <MenuIcon className="hover:size-7 hover:transition-all" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mx-2">
          <DropdownMenuLabel className="text-lg text-center text-rzk_darker">
            Minhas Simulações
          </DropdownMenuLabel>
          <div className="p-1">
            <input
              type="text"
              placeholder="Buscar simulação..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
            />
          </div>
          <DropdownMenuSeparator />
          <div className="max-h-[400px] overflow-y-auto">
            {filteredSimulacoes.length > 0 ? (
              filteredSimulacoes.map((s, index) => (
                <DropdownMenuItem key={index}>
                  <div className="w-full p-2 flex items-center justify-between gap-4">
                    <span className="w-[200px] text-rzk_darker font-bold">
                      {s.nome.length > 25
                        ? s.nome.substring(0, 25) + "..."
                        : s.nome}
                    </span>
                    <span className="text-rzk_darker font-medium">
                      {moment(s.insert_data_horario).format("DD/MM/YYYY")}
                    </span>
                    <div className="flex gap-3 items-center">
                      <Button
                        className="bg-transparent hover:bg-transparent w-2 p-3"
                        onClick={() => abrirDialogExcluir(s)}
                      >
                        <Trash className="size-5 text-red-500" />
                      </Button>
                      <Button
                        className="h-7 bg-rzk_green hover:bg-rzk_green/80 hover:transition-all"
                        onClick={() => handleAbrirSimulacao(s)}
                      >
                        Abrir
                      </Button>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem disabled>
                <div className="w-full p-2 flex items-center justify-center gap-2">
                  <SearchX className="w-5 h-5 text-gray-800" />
                  <span className="text-gray-800 text-sm">
                    Nenhuma simulação encontrada
                  </span>
                </div>
              </DropdownMenuItem>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog confirmar exclusão de Simulação */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <span />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl text-red-500 font-bold">
              Excluir Simulação
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="w-full flex flex-col items-center text-rzk_darker">
              <p>Tem certeza que deseja excluir a simulação: </p>
              <strong>{selectedSimulacao?.nome}?</strong>
            </div>
            <div className="flex gap-2 justify-center">
              <Button
                variant="outline"
                onClick={() => setOpenDialog(false)}
                className="text-rzk_darker border-rzk_darker"
              >
                Cancelar
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-500/90"
                onClick={() => {
                  handleDeletarSimulacao(selectedSimulacao!.id_simulacao!);
                }}
              >
                Excluir
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
