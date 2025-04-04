"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import HeaderSimulador from "@/components/Simulador/HeaderSimulador";
import { SimuladorProvider } from "./context/SimuladorContext";
import { simuladorSchema } from "./schemas/simuladorSchema";
import LayoutCards from "./components/LayoutCards";

export default function Simulador() {
  const { register, watch, reset, setValue } = useForm({
    resolver: zodResolver(simuladorSchema),
    defaultValues: {
      desconto: 0,
      saturacao: 1.0,
      dias: 0,
      pontos: [],
      pracas: [],
      dias_bonificados: 0,
      saturacao_bonificada: 1.0,
      pontos_bonificados: [],
    },
  });

  const valores = watch();

  return (
    <SimuladorProvider
      valores={valores}
      register={register}
      reset={reset}
      setValue={setValue}
    >
      <HeaderSimulador />
      <div>
        <LayoutCards />
      </div>
    </SimuladorProvider>
  );
}
