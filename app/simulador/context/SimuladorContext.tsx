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

type SimuladorContextType = {
  valores: z.infer<typeof simuladorSchema>;
  register: UseFormRegister<any>;
  reset: UseFormReset<any>;
  setValue: UseFormSetValue<any>;
  resultados: {
    investimento: string;
    cpmMedio: string;
    dias_totais: number;
  };
  isBonificadoPreenchido: boolean;
  dadosBackEnd: any;
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
  const [dadosBackEnd] = useState(initialData);
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

  const [pontosQuery, concessoesQuery, produtosQuery] = results;

  const concedentes = concessoesQuery.data.map((item: IConcedente) => ({
    id: item.id_concessao,
    label: item.empresa.nome,
  }));

  // Lógica dos cálculos
  // adicionar os calculos reais
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
        },
        isBonificadoPreenchido,
        dadosBackEnd,
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
