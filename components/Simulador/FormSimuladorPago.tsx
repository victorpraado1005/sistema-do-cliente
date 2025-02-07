"use client";

import { useForm } from "react-hook-form";

import { Building, CalendarDays, History, Map, MapPin, Percent } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function FormSimuladorPago() {
  const { register, watch } = useForm({
    defaultValues: {
      desconto: 60,
      saturacao: 1.0,
    },
  });

  const valores = watch();

  // Cálculos dinâmicos
  const precoTabela = 77040; // Valor fixo
  const impactos = 1699056; // Valor fixo
  const investimento = (precoTabela * (1 - valores.desconto / 100)).toFixed(2);
  const cpmMedio = ((+investimento / impactos) * 1000).toFixed(2);

  return (
    <div className="w-full border">
      <form className="grid grid-cols-3 gap-6">
        <div className="w-full">
          <div className="flex gap-2 items-center justify-between mb-2">
            <div className="flex gap-1 items-center">
              <CalendarDays className="size-4" />
              <strong className="text-sm">Qtd. de Dias:</strong>
            </div>
            <Input type="number" step="0.1" {...register("saturacao")} className="w-20 h-9 bg-gray-100 border-none text-center font-bold text-sm text-rzk_darker" placeholder="10" />
          </div>
          <div className="flex gap-2 items-center justify-between">
            <div className="flex gap-1 items-center">
              <History className="size-4" />
              <strong className="text-sm">Saturação:</strong>
            </div>
            <Input className="w-20 h-9 bg-gray-100 border-none text-center font-bold text-sm text-rzk_darker" placeholder="1.00" />
          </div>
        </div>

        <div className="w-full">
          <div className="flex gap-2 items-center justify-between mb-2">
            <div className="flex gap-1 items-center">
              <Percent className="size-4" />
              <strong className="text-sm">Desconto:</strong>
            </div>
            <Input {...register("desconto")} type="number" className="w-20 h-9 bg-gray-100 border-none text-center font-bold text-sm text-rzk_darker" placeholder="60%" />
          </div>
          <div className="flex gap-2 items-center justify-between mb-2">
            <div className="flex gap-1 items-center">
              <Building className="size-4" />
              <strong className="text-sm">Concedente:</strong>
            </div>
            <Select>
              <SelectTrigger className="w-full bg-gray-100 h-9">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Next</SelectItem>
                <SelectItem value="dark">SpTrans</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full">
          <div className="flex gap-2 items-center justify-between mb-2">
            <div className="flex gap-1 items-center">
              <Map className="size-4" />
              <strong className="text-sm">Praça:</strong>
            </div>
            <Select>
              <SelectTrigger className="w-30 bg-gray-100 h-9">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="abc">ABC</SelectItem>
                <SelectItem value="sao-paulo">São Paulo</SelectItem>
                <SelectItem value="recife">Recife</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 items-center justify-between mb-2">
            <div className="flex gap-1 items-center">
              <MapPin className="size-4" />
              <strong className="text-sm">Pontos:</strong>
            </div>
            <Select>
              <SelectTrigger className="w-30 bg-gray-100 h-9">
                <SelectValue placeholder="10 Pontos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="abc">Ana Rosa</SelectItem>
                <SelectItem value="sao-paulo">Bandeira</SelectItem>
                <SelectItem value="recife">Carrão</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>

      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">Resultados</h2>
        <p>
          <strong>Investimento:</strong> R$ {investimento}
        </p>
        <p>
          <strong>CPM Médio:</strong> R$ {cpmMedio}
        </p>
        {/* Adicione outros cálculos aqui conforme necessário */}
      </div>
    </div>
  )
}