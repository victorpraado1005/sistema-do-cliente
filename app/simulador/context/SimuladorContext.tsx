"use client";

import React, { createContext, useContext, useState } from "react";
import {
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";
import { simuladorSchema } from "../schemas/simuladorSchema";
import { z } from "zod";
import { useQueries } from "@tanstack/react-query";
import { fetchConcessoes, fetchPontos, fetchProdutos } from "@/lib/api";
import { IConcedente } from "@/app/types/IConcedente";
import { IProduto } from "@/app/types/IProduto";
import { fnCalcularSegundosFuncionamento } from "@/utils/fnCalcularSegundosFuncionamento";
import { fnCalcularUsuariosUnicos } from "@/utils/fnCalcularUsuariosUnicos";
import { fnCalculcarInsercoes } from "@/utils/fnCalcularInsercoes";
import { fnCalcularImpactos } from "@/utils/fnCalculcarImpactos";
import { fnCalcularFrequenciaMedia } from "@/utils/fnCalcularFrequenciaMedia";
import { fnCalcularPop12Mais } from "@/utils/fnCalcularPop12Mais";
import { fnCalcularAlcance } from "@/utils/fnCalcularAlcance";
import { fnCalculcarTRP } from "@/utils/fnCalcularTRP";
import { fnCalcularVisitas } from "@/utils/fnCalcularVisitas";
import { fnCalcularPrecoTabela } from "@/utils/fnCalcularPrecoTabela";

type SimuladorContextType = {
  valores: z.infer<typeof simuladorSchema>;
  register: UseFormRegister<any>;
  reset: UseFormReset<any>;
  setValue: UseFormSetValue<any>;
  selectedPontos: number[];
  setSelectedPontos: React.Dispatch<React.SetStateAction<number[]>>;
  selectedPontosBonificados: number[];
  setSelectedPontosBonificados: React.Dispatch<React.SetStateAction<number[]>>;
  pracas: string[];
  resultados: {
    investimento: number;
    cpm_medio: string;
    insercoes: number;
    impactos: number;
    usuarios_unicos: number;
    frequencia_media: number;
    populacao_12_mais: number;
    alcance: number;
    trp: number;
    visitas: number;
    preco_tabela: number;
    dias_totais: number;
    faces_totais_pagas: number;
    faces_totais_bonificadas: number;
    faces_totais: number;
  };
  isBonificadoPreenchido: boolean;
  pontos: any[];
  concessoes: any[];
  produtos: any[];
  isLoading: boolean;
  error: any;
};

const SimuladorContext = createContext<SimuladorContextType | null>(null);

export const SimuladorProvider = ({
  children,
  valores,
  register,
  reset,
  setValue,
}: {
  children: React.ReactNode;
  valores: SimuladorContextType["valores"];
  register: SimuladorContextType["register"];
  reset: SimuladorContextType["reset"];
  setValue: SimuladorContextType["setValue"];
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [selectedPontos, setSelectedPontos] = useState<number[]>([]);
  const [selectedPontosBonificados, setSelectedPontosBonificados] = useState<
    number[]
  >([]);

  const results = useQueries({
    queries: [
      {
        queryKey: ["pontos"],
        queryFn: fetchPontos,
        staleTime: 1000 * 60 * 5,
      },
      {
        queryKey: ["concessoes"],
        queryFn: fetchConcessoes,
        staleTime: 1000 * 60 * 5,
      },
      {
        queryKey: ["produtos"],
        queryFn: fetchProdutos,
        staleTime: 1000 * 60 * 5,
      },
    ],
  });

  const [pontosQuery, concessoesQuery, produtosQuery] = results as [
    { data: any[]; isLoading: boolean; error: any },
    { data: IConcedente[]; isLoading: boolean; error: any },
    { data: IProduto[]; isLoading: boolean; error: any },
  ];

  const dias = Number(valores.dias) || 0;
  const dias_bonificados = Number(valores.dias_bonificados) || 0;
  const desconto = Number(valores.desconto) || 0;

  const pracas = [
    ...new Set(
      pontosQuery.data
        ?.filter((item) => valores.pontos.includes(item.id_ponto))
        .map((item) => item.praca)
    ),
  ];

  if (selectedPontos.includes(12) && !pracas.includes("ABD")) {
    pracas.push("ABD");
  }

  // const concedentes = concessoesQuery.data.map((item) => ({
  //   id: item.id_concessao,
  //   label: item.empresa.nome,
  // }));

  // Varîavel para armazenar os produtos selecionados (Formulário Pago)
  const selectedProducts = produtosQuery.data?.filter(
    (item) =>
      selectedPontos.includes(item.id_concessao_ponto) &&
      !item.data_venda_termino
  );
  // Varîavel para armazenar as face totais (Formulário Pago)
  const faces_totais_pagas = selectedProducts?.reduce(
    (acc, item) => acc + item.qtd_faces,
    0
  );
  // Varíavel para armazenar os produtos selecionados (Formulário Pago)
  const selectedProductsBonificados = produtosQuery.data?.filter(
    (item) =>
      selectedPontosBonificados.includes(item.id_concessao_ponto) &&
      !item.data_venda_termino
  );
  // Varíavel para armazenar as face totais (Formulário Bonificado)
  const faces_totais_bonificadas = selectedProductsBonificados?.reduce(
    (acc, item) => acc + item.qtd_faces,
    0
  );
  // Varíavel para armazenar todos os produtos selecionados (Pagos + Bonificados)
  // Usando Set para remover os pontos duplicados desse array
  const productsTotais = [
    ...new Set(selectedProducts?.concat(selectedProductsBonificados)),
  ];
  // Varíavel para armazenar todas as faces totais (Pago + Bonificado), excluíndo telas repetidas
  const faces_totais = productsTotais?.reduce(
    (acc, item) => acc + item.qtd_faces,
    0
  );
  // Cálculo de inserções totais da campanha (Paga)
  const insercoes = fnCalculcarInsercoes(
    selectedProducts,
    dias,
    valores.saturacao
  );
  // Cálculo de impactos totais da campanha (Paga)
  const impactos = fnCalcularImpactos(
    selectedProducts,
    dias,
    valores.saturacao
  );
  // Cálculo de Usuários Únicos
  const usuarios_unicos = fnCalcularUsuariosUnicos(selectedPontos, dias);
  // Cálculo de Frequéncia Média
  const frequencia_media = fnCalcularFrequenciaMedia(impactos, usuarios_unicos);
  // Cálculo de Pop 12+ Mais
  const populacao_12_mais = fnCalcularPop12Mais(pracas);
  // Cálculo de Alcance
  const alcance = fnCalcularAlcance(usuarios_unicos, populacao_12_mais);
  // Cálculo de TRP
  const trp = fnCalculcarTRP(frequencia_media, alcance);
  // Cálculo de Visitas
  const visitas = fnCalcularVisitas(selectedProducts, dias);
  // Cálculo de Preço de Tabela
  const preco_tabela = fnCalcularPrecoTabela(
    selectedProducts,
    dias,
    valores.saturacao
  );
  // Cálculo de Investimento. Preço de Tabela - Desconto
  const investimento = preco_tabela * (1 - desconto / 100);
  // Cálculo de CPM Médio
  const cpm_medio = ((investimento / impactos) * 1000).toFixed(2);

  const dias_totais = dias + dias_bonificados;

  const isBonificadoPreenchido = dias_bonificados > 0;

  return (
    <SimuladorContext.Provider
      value={{
        valores,
        register,
        reset,
        setValue,
        selectedPontos,
        setSelectedPontos,
        selectedPontosBonificados,
        setSelectedPontosBonificados,
        pracas,
        pontos: pontosQuery.data || [],
        concessoes: concessoesQuery.data || [],
        produtos: produtosQuery.data || [],
        isLoading,
        error,
        resultados: {
          investimento,
          insercoes,
          impactos,
          usuarios_unicos,
          frequencia_media,
          populacao_12_mais,
          alcance,
          trp,
          visitas,
          preco_tabela,
          cpm_medio,
          dias_totais,
          faces_totais_pagas,
          faces_totais_bonificadas,
          faces_totais,
        },
        isBonificadoPreenchido,
      }}
    >
      {children}
    </SimuladorContext.Provider>
  );
};

export const useSimulador = () => {
  const context = useContext(SimuladorContext);
  if (!context) {
    throw new Error("useSimulador deve ser usado dentro de SimuladorProvider");
  }
  return context;
};
