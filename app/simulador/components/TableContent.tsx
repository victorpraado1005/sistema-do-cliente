"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSimulador } from "../context/SimuladorContext";
import TableDataCampaign from "./TableDataCampaign";
import {
  exportAllTablesToExcel,
  exportTableToExcel,
} from "@/utils/ExportTable/exportTable";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function TableContent() {
  const { dados_tabela_paga, dados_tabela_bonificada, isBonificadoPreenchido } =
    useSimulador();
  const [activeTab, setActiveTab] = useState("pago");
  const handleExport = () => {
    if (isBonificadoPreenchido) {
      exportAllTablesToExcel(dados_tabela_paga, dados_tabela_bonificada);
    } else {
      exportTableToExcel(dados_tabela_paga);
    }
  };
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
          <Button
            className="w-32 h-8 text-xs bg-rzk_green hover:bg-rzk_green/80"
            onClick={handleExport}
          >
            <Download />
            Exportar
          </Button>
        </div>
        <TabsContent value="pago">
          <TableDataCampaign data={dados_tabela_paga} />
        </TabsContent>
        <TabsContent value="bonificado">
          <TableDataCampaign data={dados_tabela_bonificada} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
