"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { useSimulador } from "../context/SimuladorContext";

const COLORS = ["#305090", "#A0D1FF", "#5ABF9A", "#CCCCCC", "#666666"];

export interface ChartData {
  name: string;
  value: number;
}

interface DashboardPieChartProps {
  title: string;
  data: ChartData[];
}

const RADIAN = Math.PI / 180;
// Função para renderizar a label fora do gráfico
const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}: any) => {
  // Calcula o raio onde a label será posicionada
  const radius = outerRadius + 10; // Ajuste conforme necessário
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#333"
      fontSize={13}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${value.toFixed(2)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-1 rounded shadow text-xs text-gray-700">
        <p className="font-semibold">{payload[0].name}</p>
        <p>{payload[0].value.toFixed(2)}%</p>
      </div>
    );
  }
  return null;
};

export default function PieChartCard({ title, data }: DashboardPieChartProps) {
  const { isBonificadoPreenchido } = useSimulador();
  return (
    <Card
      className={`"flex flex-col items-center ${!isBonificadoPreenchido ? "px-2" : "px-0"} w-full border-none shadow-none rounded-2xl`}
    >
      <div className="w-56 h-40 m-auto">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={!isBonificadoPreenchido ? 55 : 45}
              startAngle={90}
              endAngle={450}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col items-center w-full">
        <div className="mb-2">
          <span className="text-xs text-rzk_darker font-medium">{title}</span>
        </div>
        <div
          className={`grid ${data.length < 3 ? "grid-cols-2" : "grid-cols-5"} ${!isBonificadoPreenchido ? "gap-x-2" : "gap-x-1"} gap-y-1 place-items-center`}
        >
          {data.map((entry, index) => (
            <div key={index} className="flex items-center gap-1 text-xs">
              <span
                className={`${!isBonificadoPreenchido ? "w-2 h-2" : "w-1 h-2.5"} rounded-full`}
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>
              <span
                className={`text-gray-900 font-medium ${!isBonificadoPreenchido ? "text-[10px]" : "text-[10px]"}`}
              >
                {entry.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
