import { useQuery } from "@tanstack/react-query";
import { IUser } from "@/app/types/IUser";

async function fetchUser(): Promise<IUser> {
  const res = await fetch("/api/auth/validate", { credentials: "include" });
  if (!res.ok) {
    throw new Error("Erro na requisição");
  }
  const data = await res.json();
  return data[0];
}

export function useUserData() {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: Infinity,
  });
}
