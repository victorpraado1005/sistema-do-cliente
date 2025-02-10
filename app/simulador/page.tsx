"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import HeaderSimulador from "@/components/Simulador/HeaderSimulador";
import { SimuladorProvider } from "./context/SimuladorContext";
import { simuladorSchema } from "./schemas/simuladorSchema";
import CardNumerosSimulador from "./components/Resultados";

export default function Simulador() {
  const { register, watch, reset } = useForm({
    resolver: zodResolver(simuladorSchema),
    defaultValues: {
      desconto: 0,
      saturacao: 1.0,
      dias: 0,
      pontos: 10,
      dias_bonificados: 0,
    },
  });

  const valores = watch();

  return (
    <SimuladorProvider valores={valores} register={register} reset={reset}>
      <HeaderSimulador />
      <div className="flex gap-4">
        <CardNumerosSimulador />
      </div>
    </SimuladorProvider>
  );
}
