import { useSimulador } from "../context/SimuladorContext";
import CardBonificacao from "./CardBonificacao";
import CardNumerosCampanhaPaga from "./CardNumerosCampanhaPaga";
import CardNumerosCampanhaPagaEBonificada from "./CardNumerosCampanhaPagaEBonificada";
import CardInvestimento from "./CardInvestimento";
import CardMaps from "./CardMaps";
import CardMapsInvestimento from "./CardMapsInvestimento";

export default function LayoutCards() {
  const { resultados, isBonificadoPreenchido } = useSimulador();

  return (
    <div className="">
      {!isBonificadoPreenchido ? (
        <div className="flex gap-4">
          <div className="space-y-4">
            <CardNumerosCampanhaPaga />
            <div className="border border-rzk_ligth rounded-2xl">
              <h1>charts</h1>
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
          <div className="flex gap-2 mt-4">
            <CardMapsInvestimento latitude={-23.5970792} longitude={-46.686439819} />
            <CardMapsInvestimento latitude={-23.5970792} longitude={-46.686439819} />
            <div className="w-[700px] border border-rzk_ligth rounded-2xl">
              <h1>charts</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
