"use client";

import moment from "moment";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";
import { simuladorSchema } from "../schemas/simuladorSchema";
import { z } from "zod";
import { useQueries } from "@tanstack/react-query";
import {
  fetchConcessoes,
  fetchConcessoesPonto,
  fetchPontos,
  fetchProdutos,
} from "@/lib/api";
import { IConcedente } from "@/app/types/IConcedente";
import { IProduto } from "@/app/types/IProduto";
import { fnCalculcarInsercoes } from "@/utils/fnCalcularInsercoes";
import { fnCalcularImpactos } from "@/utils/fnCalculcarImpactos";
import { fnCalcularFrequenciaMedia } from "@/utils/fnCalcularFrequenciaMedia";
import { fnCalcularPop12Mais } from "@/utils/fnCalcularPop12Mais";
import { fnCalcularAlcance } from "@/utils/fnCalcularAlcance";
import { fnCalculcarTRP } from "@/utils/fnCalcularTRP";
import { fnCalcularVisitas } from "@/utils/fnCalcularVisitas";
import { fnCalcularPrecoTabela } from "@/utils/fnCalcularPrecoTabela";
import { fnCalculcarDescontoMedio } from "@/utils/fnCalcularDescontoMedio";
import { fnCalcularUsuariosUnicosPagoeBonificada } from "@/utils/fnCalcularUsuariosUnicosPagoeBonificada";
import { fnCalcularUsuariosUnicosPagos } from "@/utils/fnCalcularUsuariosUnicosPagos";
import { fnCalcularVisitasPagasEBonificadas } from "@/utils/fnCalcularVisitasPagasEBonificadas";
import { RefObject } from "react";
import { toast } from "sonner";
import { fnDadosTabelaPaga } from "@/utils/fnDadosTabelaPaga";
import { IConcessaoPonto } from "@/app/types/IConcessaoPonto";
import { IDadosTabela } from "@/app/types/IDadosTabela";

interface IMarkerObject {
  latitude: number;
  longitude: number;
}

type SimuladorContextType = {
  valores: z.infer<typeof simuladorSchema>;
  register: UseFormRegister<any>;
  reset: UseFormReset<any>;
  setValue: UseFormSetValue<any>;
  selectedPontos: number[];
  setSelectedPontos: React.Dispatch<React.SetStateAction<number[]>>;
  selectedPontosBonificados: number[];
  setSelectedPontosBonificados: React.Dispatch<React.SetStateAction<number[]>>;
  captureScreenshot: () => Promise<void>;
  ref: RefObject<HTMLDivElement | null>;
  pracas: string[];
  markers: IMarkerObject[];
  markers_bonificados: IMarkerObject[];
  resultados: {
    investimento: number;
    cpm_medio: number;
    insercoes: number;
    impactos: number;
    usuarios_unicos: number;
    frequencia_media: number;
    populacao_12_mais: number;
    alcance: number;
    trp: number;
    visitas: number;
    preco_tabela: number;
    desconto_medio: number;
    insercoes_bonificadas: number;
    insercoes_totais: number;
    impactos_totais: number;
    dias_totais: number;
    faces_totais_pagas: number;
    faces_totais_bonificadas: number;
    faces_totais: number;
  };
  isBonificadoPreenchido: boolean;
  pontos: any[];
  concessoes: any[];
  concessoes_ponto: IConcessaoPonto[];
  produtos: any[];
  dados_tabela_paga: IDadosTabela[];
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
  const ref = useRef<HTMLDivElement>(null);

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
        queryKey: ["concessoes_ponto"],
        queryFn: fetchConcessoesPonto,
        staleTime: 1000 * 60 * 5,
      },
      {
        queryKey: ["produtos"],
        queryFn: fetchProdutos,
        staleTime: 1000 * 60 * 5,
      },
    ],
  });

  const [pontosQuery, concessoesQuery, concessoesPontoQuery, produtosQuery] =
    results as [
      { data: any[]; isLoading: boolean; error: any },
      { data: IConcedente[]; isLoading: boolean; error: any },
      { data: IConcessaoPonto[]; isLoading: boolean; error: any },
      { data: IProduto[]; isLoading: boolean; error: any },
    ];

  const dias = Number(valores.dias) || 0;
  const dias_bonificados = Number(valores.dias_bonificados) || 0;
  const dias_totais = dias + dias_bonificados;
  const isBonificadoPreenchido = dias_bonificados > 0;
  const desconto = Number(valores.desconto) || 0;

  useEffect(() => {
    setIsLoading(results.some((query) => query.isLoading));
  }, [results]);

  // Varíavel para armazenar os produtos selecionados (Formulário Pago)
  const selectedProducts = produtosQuery.data?.filter(
    (item) =>
      selectedPontos.includes(item.id_concessao_ponto) &&
      !item.data_venda_termino
  );

  // Varíavel para armazenar as face totais (Formulário Pago)
  const faces_totais_pagas = selectedProducts?.reduce(
    (acc, item) => acc + item.qtd_faces,
    0
  );

  // Varíavel para armazenar os produtos selecionados (Formulário Bonificado)
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

  let pracas = [];
  const pontos_totais = [
    ...new Set(selectedPontos.concat(selectedPontosBonificados)),
  ];
  if (isBonificadoPreenchido) {
    // Praças formulário PAGO + BONIFICADO
    pracas = [
      ...new Set(
        pontosQuery.data
          ?.filter((item) => pontos_totais.includes(item.id_ponto))
          .map((item) => item.praca)
      ),
    ];

    if (pontos_totais.includes(12) && !pracas.includes("ABD")) {
      pracas.push("ABD");
    }
  } else {
    // Praças formulário PAGO
    pracas = [
      ...new Set(
        pontosQuery.data
          ?.filter((item) => valores.pontos.includes(item.id_ponto))
          .map((item) => item.praca)
      ),
    ];

    if (pontos_totais.includes(12) && !pracas.includes("ABD")) {
      pracas.push("ABD");
    }
  }

  const markers = pontosQuery.data
    ?.filter((ponto) => selectedPontos.includes(ponto.id_ponto))
    .map((ponto) => ({
      latitude: ponto.endereco.latitude,
      longitude: ponto.endereco.longitude,
    }));

  let markers_bonificados: IMarkerObject[] = [];
  if (isBonificadoPreenchido) {
    markers_bonificados = pontosQuery.data
      ?.filter((ponto) => selectedPontosBonificados.includes(ponto.id_ponto))
      .map((ponto) => ({
        latitude: ponto.endereco.latitude,
        longitude: ponto.endereco.longitude,
      }));
  }

  // Cálculo de inserções totais da campanha (Paga)
  const insercoes = fnCalculcarInsercoes(
    selectedProducts,
    dias,
    valores.saturacao
  );

  // Cálculo de inserções totais da campanha (Bonificada)
  let insercoes_bonificadas = 0;
  let insercoes_totais = 0;
  if (selectedProductsBonificados?.length > 0) {
    insercoes_bonificadas = fnCalculcarInsercoes(
      selectedProductsBonificados,
      dias_bonificados,
      valores.saturacao_bonificada
    );
    // Cálculo de inserções totais da campanha (Pago + Bonificada)
    insercoes_totais = insercoes + insercoes_bonificadas;
  }

  // Cálculo de impactos totais da campanha (Paga)
  const impactos = fnCalcularImpactos(
    selectedProducts,
    dias,
    valores.saturacao
  );

  let impactos_bonificados = 0;
  let impactos_totais = 0;
  if (isBonificadoPreenchido) {
    // Cálculo de impactos totais da campanha (Bonificado)
    impactos_bonificados = fnCalcularImpactos(
      selectedProductsBonificados,
      dias_bonificados,
      valores.saturacao_bonificada
    );
    // Cálculo de impactos totais da campanha (Pago + Bonificado)
    impactos_totais = impactos + impactos_bonificados;
  }

  let usuarios_unicos = 0;
  if (isBonificadoPreenchido) {
    // Cálculo de Usuários Únicos Pagos + Bonificados
    usuarios_unicos = fnCalcularUsuariosUnicosPagoeBonificada(
      selectedPontos,
      selectedPontosBonificados,
      dias,
      dias_bonificados
    );
  } else {
    // Cálculo de Usuários Únicos Pagos
    usuarios_unicos = fnCalcularUsuariosUnicosPagos(selectedPontos, dias);
  }

  // Cálculo de Frequéncia Média
  let frequencia_media = 0;
  if (isBonificadoPreenchido) {
    frequencia_media = fnCalcularFrequenciaMedia(
      impactos_totais,
      usuarios_unicos
    );
  } else {
    frequencia_media = fnCalcularFrequenciaMedia(impactos, usuarios_unicos);
  }

  // Cálculo de Pop 12+ Mais
  const populacao_12_mais = fnCalcularPop12Mais(pracas);

  // Cálculo de Alcance
  const alcance = fnCalcularAlcance(usuarios_unicos, populacao_12_mais);

  // Cálculo de TRP
  const trp = fnCalculcarTRP(frequencia_media, alcance);

  let visitas = 0;
  if (isBonificadoPreenchido) {
    // Cálculo de Visitas Pagas + Bonificadas
    visitas = fnCalcularVisitasPagasEBonificadas(
      selectedProducts,
      dias,
      selectedProductsBonificados,
      dias_bonificados
    );
  } else {
    // Cálculo de Visitas Pagas
    visitas = fnCalcularVisitas(selectedProducts, dias);
  }

  // Cálculo de Preço de Tabela
  let preco_tabela = 0;
  let desconto_medio = 0;
  let investimento = 0;
  let cpm_medio = 0;
  if (isBonificadoPreenchido) {
    // Cálculo de Preço de Tabela Pago + Bonificado
    const preco_tabela_pago = fnCalcularPrecoTabela(
      selectedProducts,
      dias,
      valores.saturacao
    );

    const preco_tabela_bonificado = fnCalcularPrecoTabela(
      selectedProductsBonificados,
      dias_bonificados,
      valores.saturacao_bonificada
    );

    preco_tabela = preco_tabela_pago + preco_tabela_bonificado;

    // Cálculo do Desconto Médio Pago + Bonificado
    desconto_medio = fnCalculcarDescontoMedio(
      preco_tabela_pago,
      preco_tabela,
      desconto
    );

    // Cálculo de Investimento. Preço de Tabela Pago - Desconto
    investimento = preco_tabela_pago * (1 - desconto / 100);

    // Cálculo de CPM Médio considerando os Impactos Totais
    cpm_medio = (investimento / impactos_totais) * 1000;
  } else {
    // Cálculo de Preço de Tabela Pago
    preco_tabela = fnCalcularPrecoTabela(
      selectedProducts,
      dias,
      valores.saturacao
    );

    // Cálculo de Investimento. Preço de Tabela - Desconto
    investimento = preco_tabela * (1 - desconto / 100);

    // Cálculo de CPM Médio
    cpm_medio = (investimento / impactos) * 1000;
  }

  const captureScreenshot = async () => {
    const html2canvas = (await import("html2canvas")).default;

    html2canvas(ref.current!, { useCORS: true, scale: 2 })
      .then((canvas) => {
        const image = canvas.toDataURL("image/png", 1);
        const link = document.createElement("a");
        link.href = image;
        link.download = `Proposta-${moment().format("DD/MM/YYYY")}`;
        link.click();
      })
      .catch((error) => {
        toast.error("Houve um erro ao realizar o Download da Proposta!", {
          description: "Tente novamente.",
        });
        console.error("Erro ao capturar o print:", error);
      });
  };

  const dados_tabela_paga = fnDadosTabelaPaga(
    selectedProducts,
    dias,
    desconto,
    valores.saturacao,
    concessoesPontoQuery.data,
    pontosQuery.data
  );

  console.log(dados_tabela_paga);

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
        captureScreenshot,
        ref,
        pontos:
          pontosQuery.data?.sort((a, b) => a.nome.localeCompare(b.nome)) || [],
        concessoes:
          concessoesQuery.data?.sort((a, b) =>
            a.empresa.nome.localeCompare(b.empresa.nome)
          ) || [],
        concessoes_ponto: concessoesPontoQuery.data || [],
        produtos: produtosQuery.data || [],
        dados_tabela_paga,
        isLoading,
        markers,
        markers_bonificados,
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
          insercoes_bonificadas,
          desconto_medio,
          insercoes_totais,
          impactos_totais,
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
