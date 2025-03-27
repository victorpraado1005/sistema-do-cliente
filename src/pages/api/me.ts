import type { NextApiRequest, NextApiResponse } from "next";

import cookie from "cookie";
import { IUser } from "@/app/types/IUser";
import { fetchUserData } from "@/lib/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUser | { error: string }>
) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const authToken = cookies.authToken;

  if (!authToken) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  const user = await fetchUserData({ uuid_colaborador: authToken });

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  return res.status(200).json(user);
}
