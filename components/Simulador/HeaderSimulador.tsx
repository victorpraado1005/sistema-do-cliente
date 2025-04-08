"use client";

import {
  CircleX,
  Database,
  Download,
  Eraser,
  MonitorCog,
  Save,
} from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import FormSimuladorBonificado from "./FormSimuladorBonificado";
import FormSimuladorPago from "./FormSimuladorPago";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Spinner } from "../ui/spinner";
import { useSimulador } from "@/app/(sistema)/simulador/context/SimuladorContext";
import TableContent from "@/app/(sistema)/simulador/components/TableContent";
import DialogCriarProposta from "@/app/(sistema)/simulador/components/DialogCriarProposta";
import DropDownMenuSimulacoes from "@/app/(sistema)/simulador/components/DropDownMenuSimulacoes";
import TooltipMain from "@/app/(sistema)/simulador/components/Tooltip";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function HeaderSimulador() {
  const {
    isBonificadoPreenchido,
    reset,
    valores,
    downloadZip,
    setSelectedTabelaPreco,
    isDownloading,
    isSimulacaoOpen,
    nomeSimulacao,
    setNameSimulacao,
    setIsSimulacaoOpen,
    setSelectedPontos,
    setSelectedPontosBonificados,
    handleSalvarSimulacao,
    pontos,
    produtos,
    selectedPontos,
    selectedProducts,
  } = useSimulador();

  const [activeTab, setActiveTab] = useState("pago");

  const resetBonificada = () => {
    reset({
      ...valores,
      dias_bonificados: 0,
    });

    setActiveTab("pago");
  };

  const handleCloseSimulacao = () => {
    reset();
    setIsSimulacaoOpen(false);
    setSelectedPontos([]);
    setSelectedPontosBonificados([]);
    setNameSimulacao("");
  };

  const handleResetSimulacao = () => {
    reset();
    setNameSimulacao("");
    setSelectedPontos([]);
    setSelectedPontosBonificados([]);
  };

  const selecionarTabelaPreco = (data: string) => {
    setSelectedTabelaPreco(data);
  };

  const handleNomeSimulacao = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameSimulacao(event.target.value);
  };

  const pontosComProdutos = pontos
    .filter((ponto) => selectedPontos.includes(ponto.id_ponto))
    .map((ponto) => {
      const idsConcessao = ponto.concessoes.map(
        (concessao: any) => concessao.id_concessao_ponto
      );

      const produtosEncontrados = produtos.filter((produto) =>
        idsConcessao.includes(produto.id_concessao_ponto)
      );

      return { ...ponto, produtos: produtosEncontrados };
    });

  const products = selectedProducts?.map((produto) => produto.id_produto);

  console.log(products);

  return (
    <div>
      <div className="flex justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-2 justify-between">
            <div className="flex gap-2">
              <DropDownMenuSimulacoes />
              <h1 className="text-2xl text-rzk_darker font-extrabold">
                Simulador
              </h1>
            </div>
            {isSimulacaoOpen && (
              <TooltipMain text="Fechar Simulação">
                <CircleX
                  className="text-red-600"
                  onClick={handleCloseSimulacao}
                />
              </TooltipMain>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-rzk_darker font-bold">Proposta:</span>
            <Input
              placeholder="Nome da Proposta..."
              className="h-9"
              value={nomeSimulacao}
              onChange={handleNomeSimulacao}
            />
          </div>
          <div className="flex gap-2 items-center">
            <h1 className="text-rzk_darker text-sm font-bold">
              Tabela de Preço:{" "}
            </h1>
            <Select
              defaultValue={"2025"}
              onValueChange={(value: string) => selecionarTabelaPreco(value)}
            >
              <SelectTrigger className="w-[100px] bg-gray-100">
                <SelectValue placeholder="Selecionar Tabela de Preço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-[650px]">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="w-full flex items-center justify-between">
              <TabsList>
                <TabsTrigger
                  value="pago"
                  className="w-28 data-[state=active]:bg-rzk_darker data-[state=active]:text-white"
                >
                  Pago
                </TabsTrigger>
                <TabsTrigger
                  value="bonificado"
                  className="w-28 data-[state=active]:bg-rzk_darker data-[state=active]:text-white"
                >
                  Bonificado
                </TabsTrigger>
              </TabsList>
              {isBonificadoPreenchido && activeTab === "bonificado" && (
                <>
                  <Button
                    className="w-36 h-8 bg-rzk_green hover:bg-rzk_green/90"
                    onClick={resetBonificada}
                  >
                    Limpar Bonificação
                  </Button>
                </>
              )}
              {!isSimulacaoOpen && valores.dias > 0 && activeTab === "pago" && (
                <TooltipMain text="Resetar Simulação">
                  <Eraser
                    className="text-rzk_darker"
                    onClick={handleResetSimulacao}
                  />
                </TooltipMain>
              )}
            </div>
            <TabsContent value="pago">
              <FormSimuladorPago />
            </TabsContent>
            <TabsContent value="bonificado">
              <FormSimuladorBonificado />
            </TabsContent>
          </Tabs>
        </div>

        <div className="grid grid-cols-2 grid-rows-3 gap-2 my-auto">
          <div className="col-span-2 flex justify-center">
            <div className="w-40 h-8 text-xs flex bg-rzk_darker hover:bg-rzk_darker/90 hover:transition-all rounded-md">
              <Dialog>
                <DialogTrigger className="w-full text-white flex items-center justify-center font-bold gap-2 outline-none">
                  <MonitorCog className="size-4" />
                  Editar Produtos
                </DialogTrigger>
                <DialogContent className="w-full max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <div className="flex flex-col">
                      <DialogTitle className="text-2xl text-rzk_darker font-extrabold">
                        Editar Produtos
                      </DialogTitle>
                    </div>
                  </DialogHeader>
                  <div className="flex flex-col gap-2">
                    {pontosComProdutos.map(
                      (ponto) =>
                        ponto.produtos.length > 1 && (
                          <div key={ponto.id_ponto}>
                            <div className="border border-rzk_extra_ligth p-2 rounded-md text-rzk_darker font-medium flex gap-4">
                              <div>{ponto.nome}</div>
                              <div>
                                <RadioGroup
                                  defaultValue={String(
                                    ponto.produtos.filter((item: any) =>
                                      products.includes(item.id_produto)
                                    )[0]?.id_produto || ""
                                  )}
                                >
                                  {ponto.produtos.map((produto: any) => (
                                    <div key={produto.id_produto}>
                                      <RadioGroupItem
                                        value={produto.id_produto.toString()}
                                        id={produto.id_produto}
                                      />
                                      <label
                                        htmlFor={String(produto.id_produto)}
                                        className="ml-2"
                                      >
                                        {produto.qtd_faces +
                                          " Telas - Status: " +
                                          produto.fase}
                                      </label>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </div>
                            </div>
                          </div>
                        )
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="w-32 h-8 text-xs bg-rzk_darker hover:bg-rzk_darker/90 hover:transition-all rounded-md">
            <Dialog>
              <DialogTrigger className="w-full h-full text-white flex items-center justify-center font-bold gap-2 outline-none">
                <Database className="size-4" />
                Tabela
              </DialogTrigger>
              <DialogContent className="max-w-7xl w-full">
                <DialogHeader>
                  <div className="flex">
                    <DialogTitle className="text-2xl text-rzk_darker font-extrabold">
                      Dados por Ponto
                    </DialogTitle>
                  </div>
                </DialogHeader>
                <TableContent />
              </DialogContent>
            </Dialog>
          </div>

          <div>
            <Button
              className="w-32 h-8 text-xs bg-rzk_darker hover:bg-rzk_darker/90 hover:transition-all"
              onClick={downloadZip}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <Spinner />
              ) : (
                <>
                  <Download />
                  <strong>Download</strong>
                </>
              )}
            </Button>
          </div>

          <div>
            <Button
              onClick={handleSalvarSimulacao}
              className="w-32 h-8 text-xs text-white bg-rzk_darker hover:bg-rzk_darker/90 hover:transition-all rounded-md flex items-center justify-center font-bold gap-2 outline-none"
            >
              <Save className="size-4" />
              <strong>Salvar</strong>
            </Button>
          </div>

          <div>
            <DialogCriarProposta nomeProposta={nomeSimulacao} />
          </div>
        </div>
      </div>
    </div>
  );
}
