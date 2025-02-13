"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import HeaderSimulador from "@/components/Simulador/HeaderSimulador";
import { SimuladorProvider, useSimulador } from "./context/SimuladorContext";
import { simuladorSchema } from "./schemas/simuladorSchema";
import LayoutCards from "./components/LayoutCards";
import { pontos } from "@/utils/pontos";

export default function Simulador() {
  const { register, watch, reset, setValue } = useForm({
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
    <SimuladorProvider
      valores={valores}
      register={register}
      reset={reset}
      setValue={setValue}
      initialData={pontos}
    >
      <HeaderSimulador />
      <div className="">
        <LayoutCards />
      </div>
    </SimuladorProvider>
  );
}
