import { useSimulador } from "../context/SimuladorContext";
import PieChartCard from "./PieChartCard";

export default function ContainerCharts() {
  const {
    dados_grafico_idade,
    dados_grafico_genero,
    dados_grafico_classe_social,
  } = useSimulador();
  return (
    <div className="flex items-center justify-center">
      <PieChartCard title="Gênero" data={dados_grafico_genero} />
      <PieChartCard title="Faixa Etária" data={dados_grafico_idade} />
      <PieChartCard title="Classe Social" data={dados_grafico_classe_social} />
    </div>
  );
}
