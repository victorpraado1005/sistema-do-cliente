"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";

const COLORS = ["#305090", "#A0D1FF", "#5ABF9A", "#CCCCCC", "#666666"];

export interface ChartData {
  name: string;
  value: number;
}

interface DashboardPieChartProps {
  title: string;
  data: ChartData[];
}

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
  return (
    <Card className="flex flex-col items-center m-auto w-full border-none shadow-none rounded-2xl">
      <div className="w-28 h-28">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" label>
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
      <div className="mb-2">
        <span className="text-sm text-rzk_darker font-medium">{title}</span>
      </div>
      <div className="grid grid-cols-1 gap-x-2 gap-y-1">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-1 text-xs">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></span>
            <span className="text-gray-900 font-medium text-xs">
              {entry.name}
            </span>
            {/* <span className="text-gray-500">{entry.value.toFixed(2)}%</span> */}
          </div>
        ))}
      </div>
    </Card>
  );
}
