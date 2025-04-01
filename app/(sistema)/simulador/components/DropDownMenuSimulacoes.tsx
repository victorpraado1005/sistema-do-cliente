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
import { MenuIcon } from "lucide-react";
import { useSimulador } from "../context/SimuladorContext";

const simulacoes: ISimulacao[] = [
  {
    id_colaborador: 6,
    nome: "Sadia_Galeria_2025_Dezembro_De_2025",
    desconto: 20,
    ano_preco_tabela: 2024,
    veiculacoes: [
      {
        qtd_segundos_veiculacao: 86400,
        saturacao: 1,
        qtd_segundos_insercao: 10,
        is_bonificacao: false,
        produtos: [1, 2, 4],
      },
      {
        qtd_segundos_veiculacao: 432000,
        saturacao: 0.5,
        qtd_segundos_insercao: 10,
        is_bonificacao: true,
        produtos: [1, 2, 30],
      },
    ],
  },
  {
    id_colaborador: 6,
    nome: "BK_Streetwise_2025",
    desconto: 70,
    ano_preco_tabela: 2025,
    veiculacoes: [
      {
        qtd_segundos_veiculacao: 86400 * 2,
        saturacao: 1,
        qtd_segundos_insercao: 10,
        is_bonificacao: false,
        produtos: [1, 22, 30],
      },
    ],
  },
  {
    id_colaborador: 6,
    nome: "Nubank_Galeria_2025",
    desconto: 30,
    ano_preco_tabela: 2025,
    veiculacoes: [
      {
        qtd_segundos_veiculacao: 86400,
        saturacao: 1,
        qtd_segundos_insercao: 10,
        is_bonificacao: false,
        produtos: [1, 2, 4],
      },
    ],
  },
];

export default function DropDownMenuSimulacoes() {
  const {
    setValue,
    setSelectedPontos,
    setSelectedPontosBonificados,
    setSelectedTabelaPreco,
    concessoes_ponto,
    produtos,
  } = useSimulador();

  function handleAbrirSimulacao(simulacao: ISimulacao) {
    const veiculacao_paga = simulacao.veiculacoes.filter(
      (veiculacao) => !veiculacao.is_bonificacao
    )[0];

    const produtos_pagos = produtos
      .filter((produto) =>
        veiculacao_paga.produtos.includes(produto.id_produto)
      )
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
      const produtos_bonificados = produtos
        .filter((produto) =>
          veiculacao_bonificada.produtos.includes(produto.id_produto)
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
        <DropdownMenuLabel className="text-base text-center text-rzk_darker">
          Minhas Simulações
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {simulacoes.map((simulacao, index) => (
          <DropdownMenuItem key={index}>
            <div className="w-full p-2 flex items-center justify-between gap-4">
              <span>
                {simulacao.nome.length > 30
                  ? simulacao.nome.substring(0, 30) + "..."
                  : simulacao.nome}
              </span>
              <Button
                className="h-7 bg-rzk_green hover:bg-rzk_green/80 hover:transition-all"
                onClick={() => handleAbrirSimulacao(simulacao)}
              >
                Abrir
              </Button>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
