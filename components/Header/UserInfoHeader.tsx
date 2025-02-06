"use client";

import DropdownMenuComponent from "./DropDownMenuHeader";
import SheetComponent from "./SheetEditUser";
import { useState } from "react";

export default function UserInfoHeader() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSheetOpen = () => {
    setIsDropdownOpen(false);
    setIsSheetOpen(true);
  };

  const handleSheetClose = () => {
    setIsSheetOpen(false);
  };

  return (
    <div className="flex space-x-2 items-center">
      <div className="flex flex-col items-end text-sm">
        <strong>Juliana Silva</strong>
        <p className="text-xs font-thin">juliana@itau-comercial.com.br</p>
      </div>
      <div className="border border-rzk_dark rounded-full w-8 h-8 text-center pt-0.5">
        <p>JS</p>
      </div>
      {/* Componente DropdownMenu */}
      <DropdownMenuComponent
        isOpen={isDropdownOpen}
        onOpenChange={setIsDropdownOpen}
        onOpenSheet={handleSheetOpen}
      />

      {/* Componente Sheet */}
      <SheetComponent isOpen={isSheetOpen} onClose={handleSheetClose} />
    </div>
  );
}
