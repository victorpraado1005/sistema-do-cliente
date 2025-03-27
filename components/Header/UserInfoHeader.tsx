"use client";

import { useUser } from "@/app/(sistema)/context/UserContext";
import DropdownMenuComponent from "./DropDownMenuHeader";
import SheetComponent from "./SheetEditUser";
import { Suspense, useState } from "react";
import { Spinner } from "../ui/spinner";

export default function UserInfoHeader() {
  const { user, isLoading } = useUser();
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
        {isLoading ? (
          <Suspense />
        ) : (
          <strong>{`${user?.nome} ${user?.sobrenome}`}</strong>
        )}
        {isLoading ? (
          <Suspense />
        ) : (
          <p className="text-xs font-thin">{user?.email}</p>
        )}
      </div>
      <div className="border border-rzk_dark rounded-full w-8 h-8 text-center pt-0.5">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Spinner />
          </div>
        ) : (
          <p>{`${user?.nome.charAt(0).toUpperCase()}${user?.sobrenome.charAt(0).toUpperCase()}`}</p>
        )}
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
