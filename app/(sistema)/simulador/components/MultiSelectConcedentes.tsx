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
import { useSimulador } from "../context/SimuladorContext";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export function MultiSelectConcedentes() {
  const { register, valores } = useSimulador();
  const [open, setOpen] = React.useState(false);

  // Lista de opções do dropdown
  const concedentes = [
    { id: "status-bar", label: "Status Bar" },
    { id: "activity-bar", label: "Activity Bar" },
    { id: "panel", label: "Panel" },
  ];

  // Controlar os itens selecionados
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  // Alternar seleção sem fechar o dropdown
  const toggleSelection = (id: string, event: React.MouseEvent) => {
    event.preventDefault();

    setSelectedItems((prev) => {
      const newSelection = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      // Atualizar o valor no React Hook Form
      // setValue("concedentes", newSelection);

      // Manter o menu aberto após selecionar
      setOpen(true);

      return newSelection;
    });
  };

  // Alternar entre selecionar todos ou desmarcar todos
  const toggleAllSelection = (event: React.MouseEvent) => {
    event.preventDefault();

    if (selectedItems.length === concedentes.length) {
      // Se todos estão selecionados, desmarcar todos
      setSelectedItems([]);
      // setValue("concedentes", []);
    } else {
      // Se não estão todos selecionados, selecionar todos
      const allItems = concedentes.map((item) => item.id);
      setSelectedItems(allItems);
      // setValue("concedentes", allItems);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild className="w-24">
        <Button
          variant="outline"
          className="flex items-center gap-1 w-24 bg-gray-100"
        >
          {!selectedItems.length ? "Selecione" : selectedItems.length}{" "}
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="font-extrabold text-rzk_darker">
          Concedentes
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem
          checked={selectedItems.length === concedentes.length}
          onClick={toggleAllSelection}
        >
          {selectedItems.length === concedentes.length
            ? "Desmarcar Todos"
            : "Selecionar Todos"}
        </DropdownMenuCheckboxItem>

        <DropdownMenuSeparator />
        {concedentes.map((item) => (
          <DropdownMenuCheckboxItem
            key={item.id}
            checked={selectedItems.includes(item.id)}
            onClick={(event) => toggleSelection(item.id, event)}
          >
            {item.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
