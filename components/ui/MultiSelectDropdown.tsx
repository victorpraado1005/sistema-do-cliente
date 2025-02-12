"use client";

import * as React from "react";
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

interface MultiSelectDropdownProps {
  label: string;
  options: { id: string; label: string }[];
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

export function MultiSelectDropdown({
  label,
  options,
  selectedItems,
  setSelectedItems,
}: MultiSelectDropdownProps) {
  const [open, setOpen] = React.useState(false);

  const toggleSelection = (id: string, event: React.MouseEvent) => {
    event.preventDefault();

    setSelectedItems((prev: string[]) => {
      return prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
    });
  };


  const toggleAllSelection = (event: React.MouseEvent) => {
    event.preventDefault();

    if (selectedItems.length === options.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(options.map((item) => item.id));
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
        <DropdownMenuLabel className="font-extrabold text-rzk_darker">{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem
          checked={selectedItems.length === options.length}
          onClick={toggleAllSelection}
        >
          {selectedItems.length === options.length ? "Desmarcar Todos" : "Selecionar Todos"}
        </DropdownMenuCheckboxItem>

        <DropdownMenuSeparator />

        {options.map((item) => (
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
