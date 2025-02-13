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
import { MultiSelectDropdown } from "../ui/MultiSelectDropdown";
import { useMemo, useState } from "react";
import { MultiSelectCombobox } from "../ui/combobox";

interface IPonto {
  id_ponto: number;
  nome: string;
  nome_concedente: string;
  praca: string;
}

export default function FormSimuladorBonificado() {
  const { register, dadosBackEnd } = useSimulador();
  const [selectedConcedentes, setSelectedConcedentes] = useState<string[]>([]);
  const [selectedPracas, setSelectedPracas] = useState<string[]>([]);
  const [selectedPontos, setSelectedPontos] = useState<string[]>([]);

  const filteredPontos = useMemo(() => {
    return dadosBackEnd.filter(
      (ponto: IPonto) =>
        (selectedConcedentes.length === 0 ||
          selectedConcedentes.includes(ponto.nome_concedente)) &&
        (selectedPracas.length === 0 || selectedPracas.includes(ponto.praca))
    );
  }, [selectedConcedentes, selectedPracas]);

  return (
    <div className="grid grid-cols-3 gap-6 w-full">
      <div className="w-full">
        <div className="flex gap-2 items-center justify-between mb-2">
          <div className="flex gap-1 items-center">
            <CalendarDays className="size-4" />
            <strong className="text-sm">Qtd. de Dias:</strong>
          </div>
          <Input
            {...register("dias_bonificados", {
              setValueAs: (v) => {
                if (v === "" || v === null || v === undefined) return 0;
                const num = parseInt(v.toString().replace(",", "."), 10);
                return isNaN(num) ? 0 : num;
              },
            })}
            type="number"
            step="1"
            min="0"
            className="w-20 h-9 bg-gray-100 border-none text-center font-bold text-sm text-rzk_darker"
            placeholder="0"
            onKeyDown={(e) => {
              if (e.key === "-") e.preventDefault();
            }}
          />
        </div>
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-1 items-center">
            <History className="size-4" />
            <strong className="text-sm">Saturação:</strong>
          </div>
          <Input
            {...register("saturacao_bonificada", {
              setValueAs: (v) => {
                if (v === "" || v === null || v === undefined) return 0;
                const num = parseFloat(v.toString().replace(",", "."));
                return isNaN(num) ? 0 : num;
              },
            })}
            type="number"
            step="0.01"
            min="0"
            max="1"
            className="w-20 h-9 bg-gray-100 border-none text-center font-bold text-sm text-rzk_darker"
            placeholder="0"
            onKeyDown={(e) => {
              if (e.key === "-") e.preventDefault();
            }}
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
            className="w-20 h-9 bg-gray-100 border-none text-center font-bold text-sm text-rzk_darker"
            placeholder="100%"
            disabled
          />
        </div>
        <div className="flex gap-2 items-center justify-between mb-2">
          <div className="flex gap-1 items-center">
            <Building className="size-4" />
            <strong className="text-sm">Concedente:</strong>
          </div>
          <MultiSelectDropdown
            label="Concedentes"
            options={[
              { id: "unitah", label: "Unitah" },
              { id: "socicam", label: "Socicam" },
              { id: "nova-mobi", label: "Nova Mobi" },
            ]}
            selectedItems={selectedConcedentes}
            setSelectedItems={setSelectedConcedentes}
          />
        </div>
      </div>

      <div className="w-full">
        <div className="flex gap-2 items-center justify-between mb-2">
          <div className="flex gap-1 items-center">
            <Map className="size-4" />
            <strong className="text-sm">Praça:</strong>
          </div>
          <MultiSelectDropdown
            label="Praças"
            options={[
              { id: "sao-paulo", label: "São Paulo" },
              { id: "abc", label: "ABC" },
              { id: "recife", label: "Recife" },
            ]}
            selectedItems={selectedPracas}
            setSelectedItems={setSelectedPracas}
          />
        </div>
        <div className="flex gap-2 items-center justify-between mb-2">
          <div className="flex gap-1 items-center">
            <MapPin className="size-4" />
            <strong className="text-sm">Pontos:</strong>
          </div>
          <MultiSelectCombobox
            options={filteredPontos.map((ponto: IPonto) => ({
              id_ponto: ponto.id_ponto,
              ponto: ponto.nome,
            }))}
            selectedValues={selectedPontos}
            setSelectedValues={setSelectedPontos}
          />
        </div>
      </div>
    </div>
  );
}
