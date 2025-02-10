import { useSimulador } from "../context/SimuladorContext";

export default function ResultadosTotais() {
  const { resultados } = useSimulador();

  return (
    <div className="">
      <h2 className="text-lg font-bold mb-4">Resultados Totais</h2>
      <p>
        <strong>Dias totais:</strong> {resultados.dias_totais}
      </p>
    </div>
  );
}
