import { useSimulador } from "../context/SimuladorContext";
import CardBonificacao from "./CardBonificacao";
import CardNumerosCampanhaPaga from "./CardNumerosCampanhaPaga";
import CardNumerosCampanhaPagaEBonificada from "./CardNumerosCampanhaPagaEBonificada";
import CardInvestimento from "./CardInvestimento";
import CardMaps from "./CardMaps";
import CardMapsInvestimento from "./CardMapsInvestimento";
import ContainerCharts from "./ContainerCharts";

export default function LayoutCards() {
  const { resultados, isBonificadoPreenchido } = useSimulador();

  return (
    <div>
      {!isBonificadoPreenchido ? (
        <div className="flex gap-4">
          <div className="space-y-2 mb-2">
            <CardNumerosCampanhaPaga />
            <div className="border border-rzk_ligth rounded-2xl">
              <ContainerCharts />
            </div>
          </div>
          <CardMaps latitude={-23.5970792} longitude={-46.686439819} />
        </div>
      ) : (
        <div>
          <div className="flex gap-2 mt-4">
            <CardInvestimento />
            <CardBonificacao />
            <CardNumerosCampanhaPagaEBonificada />
          </div>
          <div className="flex gap-2 mt-2 mb-2">
            <CardMapsInvestimento
              latitude={-23.5970792}
              longitude={-46.686439819}
            />
            <CardMapsInvestimento
              latitude={-23.5970792}
              longitude={-46.686439819}
            />
            <div className="w-[700px] border border-rzk_ligth rounded-2xl">
              <ContainerCharts />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
