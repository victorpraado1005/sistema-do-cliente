"use client";

import { createContext, useContext, ReactNode } from "react";
import { useUserData } from "@/hooks/useUserData";
import { IUser } from "@/app/types/IUser";

interface IUserContext {
  user: IUser | null;
  isLoading: boolean;
  error: Error | null;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, error } = useUserData();

  return (
    <UserContext.Provider value={{ user: data ?? null, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): IUserContext => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
