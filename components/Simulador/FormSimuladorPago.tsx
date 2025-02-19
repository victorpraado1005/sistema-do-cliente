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
import { useState, useMemo, useEffect } from "react";
import { MultiSelectDropdown } from "../ui/MultiSelectDropdown";
import { MultiSelectCombobox } from "../ui/combobox";

export default function FormSimuladorPago() {
  const { register, concessoes, pontos, setValue } = useSimulador();
  const [selectedConcedentes, setSelectedConcedentes] = useState<string[]>([]);
  const [selectedPracas, setSelectedPracas] = useState<string[]>([]);
  const [selectedPontos, setSelectedPontos] = useState<number[]>([]);

  const concedentes = concessoes.map((item) => ({
    id: item.id_concessao,
    label: item.empresa.nome,
  }));

  const pracas = pontos
    .map((item) => ({
      id: item.praca,
      label: item.praca,
    }))
    .filter(
      (item, index, self) =>
        index === self.findIndex((obj) => obj.id === item.id)
    );

  const filteredPontos = useMemo(() => {
    return pontos.filter(
      (ponto) =>
        (selectedConcedentes.length === 0 ||
          selectedConcedentes.includes(ponto.concessoes[0].id_concessao)) &&
        (selectedPracas.length === 0 || selectedPracas.includes(ponto.praca))
    );
  }, [pontos, selectedConcedentes, selectedPracas]);

  useEffect(() => {
    setValue("pontos", selectedPontos);
  }, [selectedPontos, setValue]);

  useEffect(() => {
    setValue("pracas", selectedPracas.join(', '));
  }, [selectedPracas, setValue]);

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
              {...register("dias", {
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
              {...register("saturacao", {
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
              {...register("desconto", {
                setValueAs: (v) => {
                  if (v === "" || v === null || v === undefined) return 0;
                  let num = parseFloat(v.toString().replace(",", "."));
                  if (isNaN(num)) return 0;
                  return Math.min(Math.max(num, 0), 100);
                },
              })}
              type="number"
              step="0.1"
              min="0"
              max="100"
              className="w-20 h-9 bg-gray-100 border-none text-center font-bold text-sm text-rzk_darker"
              placeholder="0%"
              onKeyDown={(e) => {
                if (e.key === "-") e.preventDefault();
              }}
              onInput={(e) => {
                const input = e.target as HTMLInputElement;
                if (parseFloat(input.value) > 100) input.value = "100";
                100;
              }}
            />
          </div>
          <div className="flex gap-2 items-center justify-between mb-2">
            <div className="flex gap-1 items-center">
              <Building className="size-4" />
              <strong className="text-sm">Concedente:</strong>
            </div>
            <MultiSelectDropdown
              label="Concedentes"
              options={concedentes}
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
              {...register('pracas')}
              options={pracas}
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
              options={filteredPontos}
              selectedValues={selectedPontos}
              setSelectedValues={setSelectedPontos}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
