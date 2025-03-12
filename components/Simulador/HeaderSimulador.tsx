"use client";

import { CirclePlus, Database, Download } from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import FormSimuladorBonificado from "./FormSimuladorBonificado";
import FormSimuladorPago from "./FormSimuladorPago";
import { useSimulador } from "@/app/simulador/context/SimuladorContext";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function HeaderSimulador() {
  const { isBonificadoPreenchido, reset, valores, captureScreenshot } =
    useSimulador();

  const [activeTab, setActiveTab] = useState("pago");

  const resetBonificada = () => {
    reset({
      ...valores,
      dias_bonificados: 0,
    });

    setActiveTab("pago");
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl text-rzk_darker font-extrabold">Simulador</h1>
          <p className="text-sm font-thin text-rzk_ligth">
            Confira abaixo os dados da sua simulação.
          </p>
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
            </div>
            <TabsContent value="pago">
              <FormSimuladorPago />
            </TabsContent>
            <TabsContent value="bonificado">
              <FormSimuladorBonificado />
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="w-32 h-8 text-xs bg-rzk_darker rounded-md">
            <Dialog>
              <DialogTrigger className="w-full h-full text-white flex items-center justify-center font-bold gap-2">
                <Database className="size-4" />
                Tabela
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div>
            <Button
              className="w-32 h-8 text-xs bg-rzk_darker"
              onClick={captureScreenshot}
            >
              <Download />
              <strong>Download</strong>
            </Button>
          </div>
          <div>
            <Button className="w-32 h-8 text-xs bg-rzk_green hover:bg-rzk_green/80">
              <CirclePlus />
              <strong>Criar Proposta</strong>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
