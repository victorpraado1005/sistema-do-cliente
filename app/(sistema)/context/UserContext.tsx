"use client";
import { IUser } from "@/app/types/IUser";
import { fetchUserData } from "@/lib/api";
import { getAccessToken } from "@/lib/auth";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = await getAccessToken();
        const res = await fetchUserData({ uuid_colaborador: token });
        if (res.ok) {
          const data = (await res.json()) as IUser;
          setUser(data);
        } else {
          console.error("Erro ao buscar dados do usuário");
        }
      } catch (error) {
        console.error("Erro:", error);
      }
    }
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
