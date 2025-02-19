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
import { pontos } from "@/utils/pontos";
import { IProduto } from "@/app/types/IProduto";

type SimuladorContextType = {
  valores: z.infer<typeof simuladorSchema>;
  register: UseFormRegister<any>;
  reset: UseFormReset<any>;
  setValue: UseFormSetValue<any>;
  resultados: {
    investimento: string;
    cpmMedio: string;
    dias_totais: number;
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
  initialData,
}: {
  children: React.ReactNode;
  valores: SimuladorContextType["valores"];
  register: SimuladorContextType["register"];
  reset: SimuladorContextType["reset"];
  setValue: SimuladorContextType["setValue"];
  initialData: any;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

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
    { data: IProduto[]; isLoading: boolean; error: any }
  ];

  // const concedentes = concessoesQuery.data.map((item) => ({
  //   id: item.id_concessao,
  //   label: item.empresa.nome,
  // }));

  const selectedProducts = produtosQuery.data?.filter(item =>
    valores.pontos.includes(item.id_concessao_ponto) && !item.data_venda_termino
  );
  // apos isso, fazer um reduce para calculcar a qtd_faces dos pontos selecionados
  const faces_totais = selectedProducts?.reduce((acc, item) => acc + item.qtd_faces, 0)

  // Lógica dos cálculos
  const precoTabela = 77040;
  const impactos = 1699056;

  const dias = Number(valores.dias) || 0;
  const dias_bonificados = Number(valores.dias_bonificados) || 0;
  const desconto = Number(valores.desconto) || 0;

  const investimento = (precoTabela * dias * (1 - desconto / 100)).toFixed(2);

  const cpmMedio = ((+investimento / impactos) * 1000).toFixed(2);

  const dias_totais = dias + dias_bonificados;

  const isBonificadoPreenchido = dias_bonificados > 0;

  return (
    <SimuladorContext.Provider
      value={{
        valores,
        register,
        reset,
        setValue,
        pontos: pontosQuery.data || [],
        concessoes: concessoesQuery.data || [],
        produtos: produtosQuery.data || [],
        isLoading,
        error,
        resultados: {
          investimento,
          cpmMedio,
          dias_totais,
          faces_totais
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
