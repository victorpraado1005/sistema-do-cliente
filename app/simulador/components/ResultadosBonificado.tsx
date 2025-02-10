import { useSimulador } from "../context/SimuladorContext";

export default function ResultadosBonificado() {
  const { resultados } = useSimulador();

  return (
    <div className="">
      <h2 className="text-lg font-bold mb-4">Resultados Bonificado</h2>
      <p>
        <strong>Investimento:</strong> R$ {resultados.investimento}
      </p>
      <p>
        <strong>CPM Médio:</strong> R$ {resultados.cpmMedio}
      </p>
    </div>
  );
}
