"use client";

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
import JSZip, { file } from "jszip";
import { saveAs } from "file-saver";
import { z } from "zod";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { simuladorSchema } from "../schemas/simuladorSchema";
import {
  fetchConcessoes,
  fetchConcessoesPonto,
  fetchPontos,
  fetchProdutos,
  fetchSimulacao,
  postSimulacao,
  putSimulacao,
} from "@/lib/api";
import { RefObject } from "react";
import moment from "moment";

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
import { fnDadosTabela } from "@/utils/fnDadosTabela";
import { IConcessaoPonto } from "@/app/types/IConcessaoPonto";
import { IDadosTabela } from "@/app/types/IDadosTabela";
import {
  exportAllTablesToExcel,
  exportTableToExcel,
} from "@/utils/ExportTable/exportTable";
import fnCaptureScreenshot from "@/utils/captureScreenshot/fnCaptureScreenshot";
import { ISimulacao } from "@/app/types/ISimulacao";
import { useUser } from "../../context/UserContext";
import fnCalcularGraficoIdade from "@/utils/fnCalcularGraficoIdade";
import { ChartData } from "../components/PieChartCard";
import fnCalcularGraficoGenero from "@/utils/fnCalcularGraficoGenero";
import fnCalcularGraficoClasseSocial from "@/utils/fnCalcularGraficoClasseSocial";
import { IVeiculacao } from "../components/DialogCriarProposta";
import { IPostSimulacao } from "@/app/types/IPostSimulacao";
import { toast } from "sonner";
import { delay } from "@/lib/delay";
import { IVeiculacaoPut } from "@/app/types/IVeiculacaoPut";

interface IMarkerObject {
  latitude: number;
  longitude: number;
}

export interface UploadResult {
  nome: string;
  formato: string;
  url: string;
  categoria: string;
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
  selectedTabelaPreco: string;
  setSelectedTabelaPreco: React.Dispatch<React.SetStateAction<string>>;
  selectedProducts: IProduto[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<IProduto[]>>;
  selectedProductsBonificados: IProduto[];
  setSelectedProductsBonificados: React.Dispatch<
    React.SetStateAction<IProduto[]>
  >;
  isSimulacaoOpen: boolean;
  setIsSimulacaoOpen: React.Dispatch<React.SetStateAction<boolean>>;
  simulacaoObject: ISimulacao | null;
  setSimulacaoObject: React.Dispatch<React.SetStateAction<ISimulacao | null>>;
  nomeSimulacao: string;
  setNameSimulacao: React.Dispatch<React.SetStateAction<string>>;
  isModalSalvarPropostaOpen: boolean;
  setIsModalSalvarPropostaOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pontos_totais: number[];
  dados_grafico_idade: ChartData[];
  dados_grafico_genero: ChartData[];
  dados_grafico_classe_social: ChartData[];
  downloadZip: () => Promise<void>;
  handleSalvarSimulacao: () => Promise<void>;
  handleAtualizarSimulacao: () => Promise<void>;
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
  isDownloading: boolean;
  concessoes: any[];
  concessoes_ponto: IConcessaoPonto[];
  produtos: any[];
  dados_tabela_paga: IDadosTabela[];
  dados_tabela_bonificada: IDadosTabela[];
  simulacao: ISimulacao[];
  isLoading: boolean;
  error: any;
  uploadPrintSimulador: (nome: string) => Promise<UploadResult>;
  uploadTabelaSimulador: (nome: string) => Promise<UploadResult>;
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
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [selectedPontos, setSelectedPontos] = useState<number[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSimulacaoOpen, setIsSimulacaoOpen] = useState<boolean>(false);
  const [simulacaoObject, setSimulacaoObject] = useState<ISimulacao | null>(
    null
  );
  const [nomeSimulacao, setNameSimulacao] = useState<string>("");
  const [selectedTabelaPreco, setSelectedTabelaPreco] =
    useState<string>("2025");
  const [selectedPontosBonificados, setSelectedPontosBonificados] = useState<
    number[]
  >([]);
  const [selectedProducts, setSelectedProducts] = useState<IProduto[]>([]);
  const [selectedProductsBonificados, setSelectedProductsBonificados] =
    useState<IProduto[]>([]);
  const [isModalSalvarPropostaOpen, setIsModalSalvarPropostaOpen] =
    useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user } = useUser();

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
      {
        queryKey: ["simulacao", user?.id_colaborador],
        queryFn: ({ queryKey }) => {
          const [, id_colaborador] = queryKey;
          return fetchSimulacao({ id_colaborador: id_colaborador });
        },
        staleTime: 1000 * 60 * 5,
      },
    ],
  });

  const [
    pontosQuery,
    concessoesQuery,
    concessoesPontoQuery,
    produtosQuery,
    simulacoesQuery,
  ] = results as [
    { data: any[]; isLoading: boolean; error: any },
    { data: IConcedente[]; isLoading: boolean; error: any },
    { data: IConcessaoPonto[]; isLoading: boolean; error: any },
    { data: IProduto[]; isLoading: boolean; error: any },
    { data: ISimulacao[]; isLoading: boolean; error: any },
  ];

  const dias = Number(valores.dias) || 0;
  const dias_bonificados = Number(valores.dias_bonificados) || 0;
  const dias_totais = dias + dias_bonificados;
  const isBonificadoPreenchido = dias_bonificados > 0;
  const desconto = Number(valores.desconto) || 0;

  useEffect(() => {
    setIsLoading(results.some((query) => query.isLoading));
  }, [results]);

  useEffect(() => {
    if (produtosQuery.data) {
      const produtos_api = produtosQuery.data.filter((item) =>
        selectedPontos.includes(item.id_concessao_ponto)
      );

      let array_filtrado: IProduto[] = [];
      if (isSimulacaoOpen) {
        const produtos_simulacao: number[] =
          simulacaoObject?.veiculacoes
            .filter((item) => !item.is_bonificacao)
            .flatMap((veic) => veic.produtos.map((prod) => prod.id_produto)) ||
          [];
        array_filtrado = produtos_api.reduce<IProduto[]>(
          (acumulador, produtoAtual) => {
            const indiceExistente = acumulador.findIndex(
              (item) =>
                item.id_concessao_ponto === produtoAtual.id_concessao_ponto
            );

            if (indiceExistente === -1) {
              acumulador.push(produtoAtual);
            } else {
              if (
                produtos_simulacao.includes(produtoAtual.id_produto) &&
                !produtos_simulacao.includes(
                  acumulador[indiceExistente].id_produto
                )
              ) {
                acumulador[indiceExistente] = produtoAtual;
              }
            }
            return acumulador;
          },
          []
        );
      } else {
        array_filtrado = produtos_api.reduce<IProduto[]>(
          (acumulador, produtoAtual) => {
            const indiceExistente = acumulador.findIndex(
              (item) =>
                item.id_concessao_ponto === produtoAtual.id_concessao_ponto
            );

            if (indiceExistente === -1) {
              acumulador.push(produtoAtual);
            } else {
              if (
                acumulador[indiceExistente].data_venda_inicio === null &&
                produtoAtual.data_venda_inicio !== null
              ) {
                acumulador[indiceExistente] = produtoAtual;
              }
            }
            return acumulador;
          },
          []
        );
      }

      setSelectedProducts(array_filtrado);
    }
  }, [produtosQuery.data, selectedPontos]);

  useEffect(() => {
    if (produtosQuery.data) {
      const produtos_api = produtosQuery.data.filter((item) =>
        selectedPontosBonificados.includes(item.id_concessao_ponto)
      );
      let array_filtrado: IProduto[] = [];
      if (isSimulacaoOpen) {
        const produtos_simulacao: number[] =
          simulacaoObject?.veiculacoes
            .filter((item) => item.is_bonificacao)
            .flatMap((veic) => veic.produtos.map((prod) => prod.id_produto)) ||
          [];
        array_filtrado = produtos_api.reduce<IProduto[]>(
          (acumulador, produtoAtual) => {
            const indiceExistente = acumulador.findIndex(
              (item) =>
                item.id_concessao_ponto === produtoAtual.id_concessao_ponto
            );

            if (indiceExistente === -1) {
              acumulador.push(produtoAtual);
            } else {
              if (
                produtos_simulacao.includes(produtoAtual.id_produto) &&
                !produtos_simulacao.includes(
                  acumulador[indiceExistente].id_produto
                )
              ) {
                acumulador[indiceExistente] = produtoAtual;
              }
            }
            return acumulador;
          },
          []
        );
      } else {
        array_filtrado = produtos_api.reduce<IProduto[]>(
          (acumulador, produtoAtual) => {
            const indiceExistente = acumulador.findIndex(
              (item) =>
                item.id_concessao_ponto === produtoAtual.id_concessao_ponto
            );

            if (indiceExistente === -1) {
              acumulador.push(produtoAtual);
            } else {
              if (
                acumulador[indiceExistente].data_venda_inicio === null &&
                produtoAtual.data_venda_inicio !== null
              ) {
                acumulador[indiceExistente] = produtoAtual;
              }
            }
            return acumulador;
          },
          []
        );
      }

      setSelectedProductsBonificados(array_filtrado);
    }
  }, [produtosQuery.data, selectedPontosBonificados]);

  // Varíavel para armazenar as face totais (Formulário Pago)
  const faces_totais_pagas = selectedProducts?.reduce(
    (acc, item) => acc + item.qtd_faces,
    0
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
          .filter((item) => pontos_totais.includes(item.id_ponto))
          .map((item) => item.praca)
      ),
    ];
  } else {
    // Praças formulário PAGO
    pracas = [
      ...new Set(
        pontosQuery.data
          ?.filter((item) => pontos_totais.includes(item.id_ponto))
          .map((item) => item.praca)
      ),
    ];
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
  }
  insercoes_totais = insercoes + insercoes_bonificadas;

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
      valores.saturacao,
      selectedTabelaPreco
    );

    const preco_tabela_bonificado = fnCalcularPrecoTabela(
      selectedProductsBonificados,
      dias_bonificados,
      valores.saturacao_bonificada,
      selectedTabelaPreco
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
    // Cálculo de Preço de Tabela Pagox
    preco_tabela = fnCalcularPrecoTabela(
      selectedProducts,
      dias,
      valores.saturacao,
      selectedTabelaPreco
    );

    // Cálculo de Investimento. Preço de Tabela - Desconto
    investimento = preco_tabela * (1 - desconto / 100);

    // Cálculo de CPM Médio
    cpm_medio = (investimento / impactos) * 1000;
  }

  const dados_tabela_paga = fnDadosTabela(
    selectedProducts,
    dias,
    desconto,
    valores.saturacao,
    concessoesPontoQuery.data,
    pontosQuery.data,
    selectedTabelaPreco
  );

  let dados_tabela_bonificada: IDadosTabela[] = [];
  if (isBonificadoPreenchido) {
    dados_tabela_bonificada = fnDadosTabela(
      selectedProductsBonificados,
      dias_bonificados,
      desconto,
      valores.saturacao_bonificada,
      concessoesPontoQuery.data,
      pontosQuery.data,
      selectedTabelaPreco,
      isBonificadoPreenchido
    );
  }

  let dados_grafico_idade = [];
  let dados_grafico_genero = [];
  let dados_grafico_classe_social = [];
  if (pontos_totais.length && !isBonificadoPreenchido) {
    dados_grafico_idade = fnCalcularGraficoIdade(
      pontos_totais,
      dias,
      isBonificadoPreenchido
    );
    dados_grafico_genero = fnCalcularGraficoGenero(
      pontos_totais,
      dias,
      isBonificadoPreenchido
    );
    dados_grafico_classe_social = fnCalcularGraficoClasseSocial(
      pontos_totais,
      dias,
      isBonificadoPreenchido
    );
  } else if (pontos_totais.length && isBonificadoPreenchido) {
    dados_grafico_idade = fnCalcularGraficoIdade(
      pontos_totais,
      dias,
      isBonificadoPreenchido,
      selectedPontosBonificados,
      dias_bonificados,
      dias_totais
    );
    dados_grafico_genero = fnCalcularGraficoGenero(
      pontos_totais,
      dias,
      isBonificadoPreenchido,
      selectedPontosBonificados,
      dias_bonificados,
      dias_totais
    );
    dados_grafico_classe_social = fnCalcularGraficoClasseSocial(
      pontos_totais,
      dias,
      isBonificadoPreenchido,
      selectedPontosBonificados,
      dias_bonificados,
      dias_totais
    );
  } else {
    const pontos_totais = pontosQuery.data?.map((ponto) => ponto.id_ponto);
    dados_grafico_idade = fnCalcularGraficoIdade(
      pontos_totais,
      1,
      isBonificadoPreenchido
    );
    dados_grafico_genero = fnCalcularGraficoGenero(
      pontos_totais,
      1,
      isBonificadoPreenchido
    );
    dados_grafico_classe_social = fnCalcularGraficoClasseSocial(
      pontos_totais,
      1,
      isBonificadoPreenchido
    );
  }

  const downloadZip = async () => {
    setIsDownloading(true);
    const zip = new JSZip();

    try {
      await delay(300);

      const imageDataUrl = await fnCaptureScreenshot(ref.current!);

      const base64Image = imageDataUrl.split(",")[1];

      let tabela = undefined;
      if (isBonificadoPreenchido) {
        tabela = exportAllTablesToExcel(
          dados_tabela_paga,
          dados_tabela_bonificada
        );
      } else {
        tabela = exportTableToExcel(dados_tabela_paga);
      }

      zip.file("print_simulador.png", base64Image, { base64: true });
      zip.file("tabela.xlsx", tabela);

      const zipBlob = await zip.generateAsync({ type: "blob" });

      saveAs(
        zipBlob,
        `Proposta${nomeSimulacao ? `-${nomeSimulacao}-` : `-`}${moment().format("DD/MM/YYYY")}.zip`
      );
    } catch (error) {
      console.error("Erro no download:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSalvarSimulacao = async (): Promise<void> => {
    if (nomeSimulacao === "") {
      toast.warning("Preencher campo de 'Nome da Proposta'!");
      return;
    }
    let veiculacoes: IVeiculacao[] = [];

    if (valores.dias && selectedProducts.length) {
      const veiculacao_paga = {
        qtd_segundos_veiculacao: valores.dias * 86400,
        saturacao: valores.saturacao,
        qtd_segundos_insercao: 10,
        is_bonificacao: false,
        produtos: selectedProducts.map((produto) => produto.id_produto),
      };

      veiculacoes = veiculacoes.concat(veiculacao_paga);
    }

    if (isBonificadoPreenchido && selectedProductsBonificados.length) {
      const veiculacao_bonificada = {
        qtd_segundos_veiculacao: valores.dias_bonificados * 86400,
        saturacao: valores.saturacao_bonificada,
        qtd_segundos_insercao: 10,
        is_bonificacao: true,
        produtos: selectedProductsBonificados.map(
          (produto) => produto.id_produto
        ),
      };

      veiculacoes = veiculacoes.concat(veiculacao_bonificada);
    }

    const simulacao: IPostSimulacao = {
      nome: nomeSimulacao,
      id_colaborador: user?.id_colaborador!,
      ano_preco_tabela: Number(selectedTabelaPreco),
      desconto: valores.desconto,
      veiculacoes,
    };

    try {
      const res: ISimulacao = await postSimulacao(simulacao);
      if (res) {
        toast.success("Simulação criada com sucesso!");
      }
      setIsModalSalvarPropostaOpen(false);
      setIsSimulacaoOpen(true);
      setSimulacaoObject(res);
      await queryClient.fetchQuery({
        queryKey: ["simulacao", user?.id_colaborador],
        queryFn: ({ queryKey }) => {
          const [, id_colaborador] = queryKey;
          return fetchSimulacao({ id_colaborador });
        },
      });
    } catch {
      toast.error("Houve um erro ao criar a Simulação!", {
        description: "Tente novamente mais tarde.",
      });
    }
  };

  const handleAtualizarSimulacao = async () => {
    const id_simulacao = simulacaoObject!.id_simulacao;

    let veiculacoes: IVeiculacaoPut[] = [];

    if (valores.dias && selectedProducts.length) {
      const id_veiculacao_paga = simulacaoObject!.veiculacoes.filter(
        (veic) => !veic.is_bonificacao
      )[0]?.produtos[0].id_veiculacao;
      const veiculacao_paga = {
        qtd_segundos_veiculacao: valores.dias * 86400,
        saturacao: valores.saturacao,
        qtd_segundos_insercao: 10,
        is_bonificacao: false,
        produtos: selectedProducts.map((produto) => ({
          id_produto: produto.id_produto,
          id_veiculacao: id_veiculacao_paga,
        })),
      };

      veiculacoes = veiculacoes.concat(veiculacao_paga);
    }

    if (isBonificadoPreenchido && selectedProductsBonificados.length) {
      const id_veiculacao_bonificada = simulacaoObject!.veiculacoes.filter(
        (veic) => veic.is_bonificacao
      )[0]?.produtos[0].id_veiculacao;
      const veiculacao_bonificada = {
        qtd_segundos_veiculacao: valores.dias_bonificados * 86400,
        saturacao: valores.saturacao_bonificada,
        qtd_segundos_insercao: 10,
        is_bonificacao: true,
        produtos: selectedProductsBonificados.map((produto) => ({
          id_produto: produto.id_produto,
          id_veiculacao: id_veiculacao_bonificada,
        })),
      };

      veiculacoes = veiculacoes.concat(veiculacao_bonificada);
    }
    const simulacao: ISimulacao = {
      id_colaborador: simulacaoObject!.id_colaborador,
      nome: nomeSimulacao,
      desconto: valores.desconto,
      ano_preco_tabela: Number(selectedTabelaPreco),
      veiculacoes,
    };

    try {
      const res = await putSimulacao(id_simulacao!, simulacao);
      if (res) {
        toast.success("Simulação atualizada com sucesso!");
      }
      setIsModalSalvarPropostaOpen(false);
      await queryClient.fetchQuery({
        queryKey: ["simulacao", user?.id_colaborador],
        queryFn: ({ queryKey }) => {
          const [, id_colaborador] = queryKey;
          return fetchSimulacao({ id_colaborador });
        },
      });
    } catch {
      toast.error("Houve um erro ao atualizar a simulação!");
    }
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          // O result geralmente possui o formato "data:application/octet-stream;base64,..."
          // Se você precisar da parte somente base64, pode fazer um split(",")
          const base64 = result.split(',')[1];
          resolve(base64);
        } else {
          reject(new Error("Falha na conversão do Blob para base64"));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const uploadPrintSimulador = async (nome: string) => {
    await delay(300);

    const imageDataUrl = await fnCaptureScreenshot(ref.current!);

    const base64Image = imageDataUrl.split(",")[1];

    const file_name = `Proposta-${nome}-Print.png`

    await handleUpload(base64Image, file_name, 'print');

    return {
      "nome": file_name,
      "formato": "png",
      "url": `https://storage.cloud.google.com/rzkdigital-bucket-private/${file_name}`,
      "categoria": "Proposta"
    }
  }

  const uploadTabelaSimulador = async (nome: string) => {
    let tabela = undefined;
    if (isBonificadoPreenchido) {
      tabela = exportAllTablesToExcel(
        dados_tabela_paga,
        dados_tabela_bonificada
      );
    } else {
      tabela = exportTableToExcel(dados_tabela_paga);
    }

    const file_name = `Proposta-${nome}-Tabela.xlsx`

    const base64Image = await blobToBase64(tabela);

    await handleUpload(base64Image, file_name, 'table');

    return {
      "nome": file_name,
      "formato": "xlsx",
      "url": `https://storage.cloud.google.com/rzkdigital-bucket-private/${file_name}`,
      "categoria": "Proposta"
    }
  }



  const handleUpload = async (base64: string | Blob, file_name: string, type: string) => {
    try {
      const base64Data = base64;
      const filename = file_name;

      const customMetadata = {
        file_name,
        retool_user_fullname: user!.nome + ' ' + user!.sobrenome,
        postgresql_categoria: 'Proposta',
        retool_environment: 'production',
        app_name: 'Simulador'
      };
      const path = type === 'print' ? 'print' : 'table'
      const route = `/api/upload-${path}`
      const res = await fetch(route, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename,
          data: base64Data,
          customMetadata
        }),
      });


      const data = await res.json();

      if (!res.ok) {
        toast.error(`Erro: ${data.error || 'Não foi possível realizar o upload.'}`);
        return;
      }
    } catch (error: any) {
      toast.error(`Erro inesperado: ${error.message}`);
    }
  };

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
        selectedTabelaPreco,
        setSelectedTabelaPreco,
        selectedProducts,
        setSelectedProducts,
        selectedProductsBonificados,
        setSelectedProductsBonificados,
        isSimulacaoOpen,
        setIsSimulacaoOpen,
        simulacaoObject,
        setSimulacaoObject,
        nomeSimulacao,
        setNameSimulacao,
        isModalSalvarPropostaOpen,
        setIsModalSalvarPropostaOpen,
        pontos_totais,
        pracas,
        downloadZip,
        handleSalvarSimulacao,
        handleAtualizarSimulacao,
        dados_grafico_idade,
        dados_grafico_genero,
        dados_grafico_classe_social,
        ref,
        pontos:
          pontosQuery.data?.sort((a, b) => a.nome.localeCompare(b.nome)) || [],
        concessoes:
          concessoesQuery.data?.sort((a, b) =>
            a.empresa.nome.localeCompare(b.empresa.nome)
          ) || [],
        concessoes_ponto: concessoesPontoQuery.data || [],
        produtos: produtosQuery.data || [],
        simulacao: simulacoesQuery.data || [],
        dados_tabela_paga,
        dados_tabela_bonificada,
        isLoading,
        isDownloading,
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
        uploadPrintSimulador,
        uploadTabelaSimulador
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
