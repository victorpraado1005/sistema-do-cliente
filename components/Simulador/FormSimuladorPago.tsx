import { useSimulador } from "@/app/simulador/context/SimuladorContext";

import {
  Building,
  CalendarDays,
  History,
  Map,
  MapPin,
  Percent,
} from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function FormSimuladorPago() {
  const { valores, register } = useSimulador();

  return (
    <div className="w-full">
      <form className="grid grid-cols-3 gap-6">
        <div className="w-full">
          <div className="flex gap-2 items-center justify-between mb-2">
            <div className="flex gap-1 items-center">
              <CalendarDays className="size-4" />
              <strong className="text-sm">Qtd. de Dias:</strong>
            </div>
            <Input
              type="number"
              step="1"
              min="0"
              {...register("dias", { valueAsNumber: true })}
              className="w-20 h-9 bg-gray-100 border-none text-center font-bold text-sm text-rzk_darker"
              placeholder="10"
            />
          </div>
          <div className="flex gap-2 items-center justify-between">
            <div className="flex gap-1 items-center">
              <History className="size-4" />
              <strong className="text-sm">Saturação:</strong>
            </div>
            <Input
              {...register("saturacao", { valueAsNumber: true })}
              type="number"
              className="w-20 h-9 bg-gray-100 border-none text-center font-bold text-sm text-rzk_darker"
              placeholder="1.00"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="flex gap-2 items-center justify-between mb-2">
            <div className="flex gap-1 items-center">
              <Percent className="size-4" />
              <strong className="text-sm">Desconto:</strong>
            </div>
            <Input
              type="number"
              min="0"
              max="100"
              {...register("desconto", { valueAsNumber: true })}
              className="w-20 h-9 bg-gray-100 border-none text-center font-bold text-sm text-rzk_darker"
              placeholder="60%"
            />
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
    </div>
  );
}
