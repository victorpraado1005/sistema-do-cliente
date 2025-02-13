import React, { createContext, useContext, useState } from "react";
import {
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";
import { simuladorSchema } from "../schemas/simuladorSchema";
import { z } from "zod";

type SimuladorContextType = {
  valores: z.infer<typeof simuladorSchema>;
  register: UseFormRegister<any>;
  reset: UseFormReset<any>;
  setValue: UseFormSetValue<any>;
  resultados: {
    investimento: string;
    cpmMedio: string;
    dias_totais: number;
  };
  isBonificadoPreenchido: boolean;
  dadosBackEnd: any;
};

const SimuladorContext = createContext<SimuladorContextType | null>(null);

export const SimuladorProvider = ({
  children,
  valores,
  register,
  reset,
  setValue,
  initialData,
}: {
  children: React.ReactNode;
  valores: SimuladorContextType["valores"];
  register: SimuladorContextType["register"];
  reset: SimuladorContextType["reset"];
  setValue: SimuladorContextType["setValue"];
  initialData: any;
}) => {
  const [dadosBackEnd] = useState(initialData);
  // Lógica dos cálculos
  // adicionar os calculos reais
  const precoTabela = 77040;
  const impactos = 1699056;

  const dias = Number(valores.dias) || 0;
  const dias_bonificados = Number(valores.dias_bonificados) || 0;
  const desconto = Number(valores.desconto) || 0;

  const investimento = (precoTabela * dias * (1 - desconto / 100)).toFixed(2);

  const cpmMedio = ((+investimento / impactos) * 1000).toFixed(2);

  const dias_totais = dias + dias_bonificados;

  const isBonificadoPreenchido = dias_bonificados > 0;

  return (
    <SimuladorContext.Provider
      value={{
        valores,
        register,
        reset,
        setValue,
        resultados: {
          investimento,
          cpmMedio,
          dias_totais,
        },
        isBonificadoPreenchido,
        dadosBackEnd,
      }}
    >
      {children}
    </SimuladorContext.Provider>
  );
};

export const useSimulador = () => {
  const context = useContext(SimuladorContext);
  if (!context) {
    throw new Error("useSimulador deve ser usado dentro de SimuladorProvider");
  }
  return context;
};
