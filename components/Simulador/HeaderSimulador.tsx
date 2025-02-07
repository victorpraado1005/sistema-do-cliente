import { CirclePlus, Database, Download } from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import FormSimuladorBonificado from "./FormSimuladorBonificado";
import FormSimuladorPago from "./FormSimuladorPago";

export default function HeaderSimulador() {
  return (
    <div>
      <div className="flex justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl text-rzk_darker font-extrabold">Simulador</h1>
          <p className="text-sm font-thin text-rzk_ligth">Confira abaixo os dados da sua simulação.</p>
        </div>

        <div className="w-[650px]">
          <Tabs defaultValue="pago">
            <TabsList className="pb-2">
              <TabsTrigger value="pago" className="w-28 data-[state=active]:bg-rzk_darker data-[state=active]:text-white">Pago</TabsTrigger>
              <TabsTrigger value="bonificado" className="w-28 data-[state=active]:bg-rzk_darker data-[state=active]:text-white">Bonificado</TabsTrigger>
            </TabsList>
            <TabsContent value="pago">
              <FormSimuladorPago />
            </TabsContent>
            <TabsContent value="bonificado">
              <FormSimuladorBonificado />
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex flex-col gap-2 items-center justify-center">
          <div>
            <Button className="w-32 h-8 text-xs bg-rzk_darker">
              <Database />
              <strong>Tabela</strong>
            </Button >
          </div>
          <div>
            <Button className="w-32 h-8 text-xs bg-rzk_darker">
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
  )
}