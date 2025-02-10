import { useSimulador } from "../context/SimuladorContext";
import ResultadosBonificado from "./ResultadosBonificado";
import ResultadosTotais from "./ResultadosTotais";

export default function CardNumerosSimulador() {
  const { resultados, isBonificadoPreenchido } = useSimulador();

  return (
    <div className="flex gap-40 mt-8 items-center justify-center">
      <div>
        <h2 className="text-lg font-bold">Resultados</h2>
        <p>
          <strong>Investimento:</strong> R$ {resultados.investimento}
        </p>
        <p>
          <strong>CPM Médio:</strong> R$ {resultados.cpmMedio}
        </p>
      </div>
      {isBonificadoPreenchido && (
        <>
          <ResultadosBonificado />
        </>
      )}
      {isBonificadoPreenchido && (
        <>
          <ResultadosTotais />
        </>
      )}
    </div>
  );
}
