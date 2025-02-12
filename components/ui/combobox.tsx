"use client";

import * as React from "react";
import { CheckSquare, Square, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MultiSelectComboboxProps {
  options: { id_ponto: number; ponto: string }[];
  selectedValues: string[];
  setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>;
}


export function MultiSelectCombobox({
  options,
  selectedValues,
  setSelectedValues,
}: MultiSelectComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const toggleSelection = (currentValue: string) => {
    setSelectedValues((prev: string[]) =>
      prev.includes(currentValue)
        ? prev.filter((item) => item !== currentValue)
        : [...prev, currentValue]
    );
  };

  const toggleAllSelection = () => {
    if (selectedValues.length === options.length) {
      setSelectedValues([]);
    } else {
      setSelectedValues(options.map((option) => option.ponto));
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex items-center gap-1 w-24 bg-gray-100"
        >
          {selectedValues.length === 1 ? '1 Ponto' : selectedValues.length > 1 ? `${selectedValues.length} Pontos` : "Selecione"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar..." />
          <CommandList>
            <CommandEmpty>Nenhum encontrado.</CommandEmpty>

            <CommandGroup>
              {/* Botão de Selecionar Todos */}
              <CommandItem onSelect={toggleAllSelection}>
                <div className="flex items-center gap-2">
                  {selectedValues.length === options.length ? (
                    <CheckSquare className="h-4 w-4" />
                  ) : (
                    <Square className="h-4 w-4" />
                  )}
                  <span>
                    {selectedValues.length === options.length
                      ? "Desmarcar Todos"
                      : "Selecionar Todos"}
                  </span>
                </div>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id_ponto}
                  value={option.ponto}
                  onSelect={() => toggleSelection(option.ponto)}
                >
                  <div className="flex items-center gap-2">
                    {selectedValues.includes(option.ponto) ? (
                      <CheckSquare className="h-4 w-4" />
                    ) : (
                      <Square className="h-4 w-4" />
                    )}
                    {option.ponto}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
