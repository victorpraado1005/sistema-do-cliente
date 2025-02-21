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
import { fluxos } from "@/utils/fluxos";
import { fnCalcularSegundosFuncionamento } from "@/utils/fnCalcularSegundosFuncionamento";
import { fnUsuariosUnicosShopping } from "@/utils/fnUsuariosUnicosShopping";
import { fnUsuariosUnicosTerminal } from "@/utils/fnUsuariosUnicosTerminal";

type SimuladorContextType = {
  valores: z.infer<typeof simuladorSchema>;
  register: UseFormRegister<any>;
  reset: UseFormReset<any>;
  setValue: UseFormSetValue<any>;
  selectedPontos: number[];
  setSelectedPontos: React.Dispatch<React.SetStateAction<number[]>>;
  selectedPontosBonificados: number[];
  setSelectedPontosBonificados: React.Dispatch<React.SetStateAction<number[]>>;
  resultados: {
    investimento: string;
    cpmMedio: string;
    insercoes: number;
    impactos: number;
    usuarios_unicos: number;
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
  const insercoes = selectedProducts
    ?.map((product) => {
      const horario_inicio = product.horario_funcionamento_inicio;
      const horario_termino = product.horario_funcionamento_termino;

      const segundos_funcionamento = fnCalcularSegundosFuncionamento(
        horario_inicio,
        horario_termino
      );

      const insercoes_diarias =
        segundos_funcionamento / product.qtd_segundos_loop;

      return insercoes_diarias * product.qtd_faces * dias * valores.saturacao;
    })
    .reduce((acc, item) => acc + item, 0);

  // Cálculo de impactos totais da campanha (Paga)
  const impactos = selectedProducts
    ?.map((product) => {
      const impactos_diarios = product.qtd_impactos_diarios;

      return impactos_diarios * dias;
    })
    .reduce((acc, item) => acc + item, 0);

  // Cálculo de usuarios unicos
  const usuarios_unicos_terminais =
    selectedPontos
      ?.map((ponto) => {
        const fluxo = fluxos.find((item) => item.id_ponto === ponto);

        let total = 0;

        if (fluxo?.Tipo === "Terminal") {
          total = fnUsuariosUnicosTerminal(
            dias,
            fluxo.parametros_grupo_1_a,
            fluxo.parametros_grupo_1_b,
            fluxo.parametros_grupo_1_c
          );
        }

        return total;
      })
      .reduce((acc, total) => acc + total, 0) * 0.77;

  const usuarios_unicos_shopping = selectedPontos
    ?.map((ponto) => {
      const fluxo = fluxos.find((item) => item.id_ponto === ponto);

      let total = 0;

      if (fluxo?.Tipo === "Shopping") {
        total = fnUsuariosUnicosShopping(dias, fluxo?.parametros_grupo_2_a);
      }

      return total;
    })
    .reduce((acc, total) => acc + total, 0);

  const usuarios_unicos = usuarios_unicos_terminais + usuarios_unicos_shopping;

  // Lógica dos cálculos
  const precoTabela = 77040;
  const impactos_a = 1699056;

  const investimento = (precoTabela * dias * (1 - desconto / 100)).toFixed(2);

  const cpmMedio = ((+investimento / impactos_a) * 1000).toFixed(2);

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
          cpmMedio,
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
