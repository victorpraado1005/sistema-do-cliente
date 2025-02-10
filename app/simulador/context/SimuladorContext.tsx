import React, { createContext, useContext } from "react";
import { UseFormRegister, UseFormReset } from "react-hook-form";
import { simuladorSchema } from "../schemas/simuladorSchema";
import { z } from "zod";

type SimuladorContextType = {
  valores: z.infer<typeof simuladorSchema>;
  register: UseFormRegister<any>;
  reset: UseFormReset<any>;
  resultados: {
    investimento: string;
    cpmMedio: string;
    dias_totais: number;
  };
  isBonificadoPreenchido: boolean;
};

const SimuladorContext = createContext<SimuladorContextType | null>(null);

export const SimuladorProvider = ({
  children,
  valores,
  register,
  reset,
}: {
  children: React.ReactNode;
  valores: SimuladorContextType["valores"];
  register: SimuladorContextType["register"];
  reset: SimuladorContextType["reset"];
}) => {
  // Lógica dos cálculos
  // adicionar os calculos reais
  const precoTabela = 77040;
  const impactos = 1699056;

  const investimento = (
    precoTabela *
    valores.dias *
    (1 - valores.desconto / 100)
  ).toFixed(2);

  const cpmMedio = ((+investimento / impactos) * 1000).toFixed(2);

  const dias_totais = valores.dias + valores.dias_bonificados;

  const isBonificadoPreenchido = valores.dias_bonificados > 0;

  return (
    <SimuladorContext.Provider
      value={{
        valores,
        register,
        reset,
        resultados: {
          investimento,
          cpmMedio,
          dias_totais,
        },
        isBonificadoPreenchido,
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
