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
import { useSimulador } from "@/app/(sistema)/simulador/context/SimuladorContext";

interface MultiSelectComboboxProps {
  options: IPonto[];
  selectedValues: number[];
  setSelectedValues: React.Dispatch<React.SetStateAction<number[]>>;
}

export function MultiSelectCombobox({
  options,
  selectedValues,
  setSelectedValues,
}: MultiSelectComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const { isLoading } = useSimulador();

  const filteredOptions = React.useMemo(() => {
    return options.filter((option) =>
      option.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, options]);

  const toggleSelection = (id: number) => {
    setSelectedValues((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAllSelection = () => {
    if (selectedValues.length === filteredOptions.length) {
      setSelectedValues([]);
    } else {
      setSelectedValues(filteredOptions.map((option) => option.id_ponto));
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={isLoading}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex items-center gap-1 w-24 bg-gray-100"
        >
          {selectedValues.length === 1
            ? "1 Ponto"
            : selectedValues.length > 1
              ? `${selectedValues.length} Pontos`
              : "Selecione"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput
            placeholder="Buscar..."
            value={searchTerm}
            onValueChange={(value) => setSearchTerm(value.trim())}
          />
          <CommandList>
            {filteredOptions.length === 0 ? (
              <CommandEmpty>Nenhum ponto encontrado.</CommandEmpty>
            ) : (
              <>
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      toggleAllSelection();
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {selectedValues.length === filteredOptions.length ? (
                        <CheckSquare className="h-4 w-4" />
                      ) : (
                        <Square className="h-4 w-4" />
                      )}
                      <span>
                        {selectedValues.length === filteredOptions.length
                          ? "Desmarcar Todos"
                          : "Selecionar Todos"}
                      </span>
                    </div>
                  </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup>
                  {filteredOptions.map((option) => (
                    <CommandItem
                      key={option.id_ponto}
                      value={option.nome}
                      onSelect={() => {
                        toggleSelection(option.id_ponto);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {selectedValues.includes(option.id_ponto) ? (
                          <CheckSquare className="h-4 w-4" />
                        ) : (
                          <Square className="h-4 w-4" />
                        )}
                        {option.nome}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
