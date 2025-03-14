'use client'

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSimulador } from "../context/SimuladorContext";
import TableDataCampaign from "./TableDataCampaign";

export default function TableContent() {
  const { dados_tabela_paga, isBonificadoPreenchido } = useSimulador();
  const [activeTab, setActiveTab] = useState("pago");
  return (
    <div>
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
              disabled={!isBonificadoPreenchido}
              className="w-28 data-[state=active]:bg-rzk_darker data-[state=active]:text-white"
            >
              Bonificado
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="pago">
          <TableDataCampaign data={dados_tabela_paga} />
        </TabsContent>
        <TabsContent value="bonificado">
          <TableDataCampaign data={dados_tabela_paga} />
        </TabsContent>
      </Tabs>
    </div>
  )
}