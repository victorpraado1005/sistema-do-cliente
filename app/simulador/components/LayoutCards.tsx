import { useSimulador } from "../context/SimuladorContext";
import CardBonificacao from "./CardBonificacao";
import CardNumerosCampanhaPaga from "./CardNumerosCampanhaPaga";
import CardNumerosCampanhaPagaEBonificada from "./CardNumerosCampanhaPagaEBonificada";
import CardInvestimento from "./CardInvestimento";

export default function LayoutCards() {
  const { resultados, isBonificadoPreenchido } = useSimulador();

  return (
    <div className="">
      {!isBonificadoPreenchido ? (
        <CardNumerosCampanhaPaga />
      ) : (
        <div className="flex gap-2 mt-4">
          <CardInvestimento />
          <CardBonificacao />
          <CardNumerosCampanhaPagaEBonificada />
        </div>
      )}
    </div>
  );
}
