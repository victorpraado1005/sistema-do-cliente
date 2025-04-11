"use client";

import {
  Building,
  CalendarDays,
  History,
  Map,
  MapPin,
  MapPinCheck,
  Percent,
  Tag,
} from "lucide-react";
import { Input } from "../ui/input";
import { useState, useMemo, useEffect } from "react";
import { MultiSelectDropdown } from "../ui/MultiSelectDropdown";
import { MultiSelectCombobox } from "../ui/combobox";
import { useSimulador } from "@/app/(sistema)/simulador/context/SimuladorContext";
import { Switch } from "../ui/switch";

export default function FormSimuladorPago() {
  const {
    register,
    concessoes,
    pontos,
    produtos,
    setValue,
    selectedPontos,
    setSelectedPontos,
  } = useSimulador();
  const [selectedConcedentes, setSelectedConcedentes] = useState<string[]>([]);
  const [selectedPracas, setSelectedPracas] = useState<string[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const concedentes = concessoes.map((item) => ({
    id: item.id_concessao,
    label: item.empresa.nome,
  }));

  const categoria = pontos.map((item) => ({
    id: item.categoria,
    label: item.categoria,
  })).filter(
    (item, index, self) =>
      index === self.findIndex((obj) => obj.id === item.id)
  );

  const pracas = pontos
    .map((item) => ({
      id: item.praca,
      label: item.praca,
    }))
    .filter(
      (item, index, self) =>
        index === self.findIndex((obj) => obj.id === item.id)
    );

  const pontosComProdutos = pontos.map(ponto => {
    const idConcessaoPonto = ponto.concessoes?.[0]?.id_concessao_ponto;

    const produtosDoPonto = produtos.filter(
      produto => produto.id_concessao_ponto === idConcessaoPonto
    );

    return {
      ...ponto,
      produtos: produtosDoPonto
    };
  });

  const filteredPontos = useMemo(() => {
    return pontosComProdutos.filter((ponto) =>
      (selectedConcedentes.length === 0 ||
        selectedConcedentes.includes(ponto.concessoes[0].id_concessao)) &&
      (selectedPracas.length === 0 || selectedPracas.includes(ponto.praca)) &&
      (selectedCategoria.length === 0 || selectedCategoria.includes(ponto.categoria)) &&
      (!isChecked || ponto.produtos.some((item: any) => item.data_venda_inicio != null))
    );
  }, [pontosComProdutos, selectedConcedentes, selectedPracas, selectedCategoria, isChecked]);


  useEffect(() => {
    setValue("pontos", selectedPontos);
  }, [selectedPontos, setValue]);

  useEffect(() => {
    setValue("pracas", selectedPracas.join(", "));
  }, [selectedPracas, setValue]);

  return (
    <div className="w-full">
      <form className="flex gap-3">
        <div className="w-[160px]">
          <div className="flex gap-2 items-center justify-between mb-2">
            <div className="flex gap-1 items-center">
              <CalendarDays className="size-4" />
              <strong className="text-sm">Dias:</strong>
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
              className="appearance-none w-14 h-9 bg-gray-100 border-none text-center font-bold text-sm text-rzk_darker leading-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
              className="appearance-none w-14 h-9 bg-gray-100 border-none text-center font-bold text-sm text-rzk_darker leading-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              placeholder="0"
              onKeyDown={(e) => {
                if (e.key === "-") e.preventDefault();
              }}
            />
          </div>
        </div>

        <div className="w-[190px]">
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
              className="appearance-none w-20 h-9 bg-gray-100 border-none text-center font-bold text-sm text-rzk_darker leading-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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

        <div className="w-[180px]">
          <div className="flex gap-2 items-center justify-between mb-2">
            <div className="flex gap-1 items-center">
              <Map className="size-4" />
              <strong className="text-sm">Praça:</strong>
            </div>
            <MultiSelectDropdown
              label="Praças"
              {...register("pracas")}
              options={pracas}
              selectedItems={selectedPracas}
              setSelectedItems={setSelectedPracas}
            />
          </div>
          <div className="flex gap-2 items-center justify-between mb-2">
            <div className="flex gap-1 items-center">
              <Tag className="size-4" />
              <strong className="text-sm">Categoria:</strong>
            </div>
            <MultiSelectDropdown
              label="Categoria"
              {...register("categoria")}
              options={categoria}
              selectedItems={selectedCategoria}
              setSelectedItems={setSelectedCategoria}
            />
          </div>
        </div>

        <div className="w-[180px]">
          <div className="flex items-center justify-between space-x-2 h-11 ">
            <div className="flex gap-2">
              <MapPinCheck className="size-4" />
              <label htmlFor="airplane-mode" className="text-sm font-bold">Pontos Ativos:</label>
            </div>
            <Switch
              id="airplane-mode"
              className="data-[state=checked]:bg-rzk_darker"
              checked={isChecked}
              onCheckedChange={(checked) => setIsChecked(checked)}
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
