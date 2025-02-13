import PieChartCard from "./PieChartCard";

const chartData1 = [
  { name: "Masculino", value: 39.11 },
  { name: "Feminino", value: 28.02 },
];

const chartData2 = [
  { name: "11 - 17", value: 15.94 },
  { name: "18 - 30", value: 28.02 },
  { name: "30 - 40", value: 28.02 },
  { name: "40+", value: 28.02 },
];

const chartData3 = [
  { name: "11 - 17", value: 15.94 },
  { name: "18 - 30", value: 28.02 },
  { name: "30 - 40", value: 28.02 },
  { name: "40+", value: 28.02 },
];

const chartData4 = [
  { name: "11 - 17", value: 15.94 },
  { name: "18 - 30", value: 28.02 },
  { name: "30 - 40", value: 28.02 },
  { name: "40+", value: 28.02 },
];

export default function ContainerCharts() {
  return (
    <div className="grid grid-cols-2 gap-2 place-items-center">
      <PieChartCard data={chartData1} />
      <PieChartCard data={chartData2} />
      <PieChartCard data={chartData3} />
      <PieChartCard data={chartData4} />
    </div>
  );
}
