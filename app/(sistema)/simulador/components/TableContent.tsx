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
    let data = new Blob();
    if (isBonificadoPreenchido) {
      data = exportAllTablesToExcel(
        dados_tabela_paga.sort((a, b) =>
          a.nome_ponto.localeCompare(b.nome_ponto)
        ),
        dados_tabela_bonificada.sort((a, b) =>
          a.nome_ponto.localeCompare(b.nome_ponto)
        )
      );
    } else {
      data = exportTableToExcel(
        dados_tabela_paga.sort((a, b) =>
          a.nome_ponto.localeCompare(b.nome_ponto)
        )
      );
    }

    const url = window.URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tabela.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const dados_formatados_tabela_paga = dados_tabela_paga.map((item) => ({
    id_ponto: item.id_ponto,
    nome_ponto: item.nome_ponto,
    dias: item.dias,
    faces: item.faces,
    visitas: item.visitas.toLocaleString("pt-br"),
    insercoes: item.insercoes.toLocaleString("pt-br"),
    impactos: item.impactos.toLocaleString("pt-br"),
    usuarios_unicos: item.usuarios_unicos.toLocaleString("pt-br"),
    freq_media: item.freq_media.toFixed(2),
    alcance: (item.alcance * 100).toFixed(2) + "%",
    trp: item.trp,
    cpm: item.cpm.toLocaleString("pt-br", {
      style: "currency",
      currency: "brl",
    }),
    preco_tabela: item.preco_tabela.toLocaleString("pt-br", {
      style: "currency",
      currency: "brl",
    }),
    investimento: item.investimento.toLocaleString("pt-br", {
      style: "currency",
      currency: "brl",
    }),
  }));

  const dados_formatados_tabela_bonificada = dados_tabela_bonificada.map(
    (item) => ({
      id_ponto: item.id_ponto,
      nome_ponto: item.nome_ponto,
      dias: item.dias,
      faces: item.faces,
      visitas: item.visitas.toLocaleString("pt-br"),
      insercoes: item.insercoes.toLocaleString("pt-br"),
      impactos: item.impactos.toLocaleString("pt-br"),
      usuarios_unicos: item.usuarios_unicos.toLocaleString("pt-br"),
      freq_media: item.freq_media.toFixed(2),
      alcance: (item.alcance * 100).toFixed(2) + "%",
      trp: item.trp,
      cpm: item.cpm.toLocaleString("pt-br", {
        style: "currency",
        currency: "brl",
      }),
      preco_tabela: item.preco_tabela.toLocaleString("pt-br", {
        style: "currency",
        currency: "brl",
      }),
      investimento: item.investimento.toLocaleString("pt-br", {
        style: "currency",
        currency: "brl",
      }),
    })
  );

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
          <TableDataCampaign
            data={dados_formatados_tabela_paga.sort((a, b) =>
              a.nome_ponto.localeCompare(b.nome_ponto)
            )}
          />
        </TabsContent>
        <TabsContent value="bonificado">
          <TableDataCampaign
            data={dados_formatados_tabela_bonificada.sort((a, b) =>
              a.nome_ponto.localeCompare(b.nome_ponto)
            )}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
