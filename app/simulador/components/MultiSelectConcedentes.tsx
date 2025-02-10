"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useSimulador } from "@/app/simulador/context/SimuladorContext";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export function MultiSelectConcedentes() {
  const { register, valores } = useSimulador();

  // Lista de opções do dropdown
  const concedentes = [
    { id: "status-bar", label: "Status Bar" },
    { id: "activity-bar", label: "Activity Bar" },
    { id: "panel", label: "Panel" },
  ];

  // Controlar os itens selecionados
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  // Alternar seleção
  const toggleSelection = (id: string) => {
    setSelectedItems((prev) => {
      const newSelection = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      // Atualizar o valor no React Hook Form
      //setValue("concedentes", newSelection);
      return newSelection;
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-24">
        <Button
          variant="outline"
          className="flex items-center gap-1 w-24 bg-gray-100"
        >
          Selecione <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Concedentes</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {concedentes.map((item) => (
          <DropdownMenuCheckboxItem
            key={item.id}
            checked={selectedItems.includes(item.id)}
            onCheckedChange={() => toggleSelection(item.id)}
          >
            {item.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
