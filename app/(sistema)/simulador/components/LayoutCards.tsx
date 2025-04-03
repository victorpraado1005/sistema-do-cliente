"use client";

// @ts-ignore
// import domtoimage from "dom-to-image";
import { useRef } from "react";
import { useSimulador } from "../context/SimuladorContext";
import CardBonificacao from "./CardBonificacao";
import CardNumerosCampanhaPaga from "./CardNumerosCampanhaPaga";
import CardNumerosCampanhaPagaEBonificada from "./CardNumerosCampanhaPagaEBonificada";
import CardInvestimento from "./CardInvestimento";
import CardMaps from "./CardMaps";
import CardMapsInvestimento from "./CardMapsInvestimento";
import ContainerCharts from "./ContainerCharts";

export default function LayoutCards() {
  const { isBonificadoPreenchido, markers, markers_bonificados, ref } =
    useSimulador();

  return (
    <div>
      <div>
        {!isBonificadoPreenchido ? (
          <div className="flex gap-2 px-1" ref={ref}>
            <div className="space-y-2 mb-2">
              <CardNumerosCampanhaPaga />
              <div className="border border-rzk_ligth rounded-2xl py-2">
                <ContainerCharts />
              </div>
            </div>
            <CardMaps />
          </div>
        ) : (
          <div className="flex flex-col items-center mb-4 py-1" ref={ref}>
            <div className="flex gap-2 mt-0">
              <CardInvestimento />
              <CardBonificacao />
              <CardNumerosCampanhaPagaEBonificada />
            </div>
            <div className="flex gap-2 mt-2">
              <CardMapsInvestimento markers={markers} />
              <CardMapsInvestimento markers={markers_bonificados} />
              <div className="w-[700px] border border-rzk_ligth rounded-2xl py-2">
                <ContainerCharts />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
