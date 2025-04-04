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
import { MenuIcon, SearchX } from "lucide-react";
import { useSimulador } from "../context/SimuladorContext";

export default function DropDownMenuSimulacoes() {
  const {
    setValue,
    setSelectedPontos,
    setSelectedPontosBonificados,
    setSelectedTabelaPreco,
    selectedPontosBonificados,
    concessoes_ponto,
    produtos,
    simulacao,
    setIsSimulacaoOpen,
    setNameSimulacao,
  } = useSimulador();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredSimulacoes = simulacao.filter((s) =>
    s.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleAbrirSimulacao(simulacao: ISimulacao) {
    setIsSimulacaoOpen(true);
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

  return (
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
                  <span>
                    {s.nome.length > 30
                      ? s.nome.substring(0, 30) + "..."
                      : s.nome}
                  </span>
                  <Button
                    className="h-7 bg-rzk_green hover:bg-rzk_green/80 hover:transition-all"
                    onClick={() => handleAbrirSimulacao(s)}
                  >
                    Abrir
                  </Button>
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
  );
}
