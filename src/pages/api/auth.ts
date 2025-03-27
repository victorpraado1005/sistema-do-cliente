import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";

import { toast } from "sonner";
import { IUser } from "@/app/types/IUser";
import { fetchUser } from "@/lib/api";

const SECRET = process.env.JWT_SECRET as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    return res.status(200).end();
  }

  const token = req.query.token;

  if (!token || typeof token !== "string") {
    return res.status(401).json({ error: "Token inválido" });
  }

  // if (req.method !== "POST") {
  //   return res.status(405).json({ error: "Método não permitido" });
  // }

  try {
    const decoded = jwt.verify(token, SECRET) as JwtPayload;
    const { userEmail, userId } = decoded;

    if (!userEmail) {
      return res.status(401).json({ error: "Token inválido" });
    }

    const user: IUser[] = await fetchUser({
      email: userEmail,
    });

    if (user[0].id_externo_retool != userId) {
      res.writeHead(307, { Location: "/sign-in" });
      res.end();
      return toast.error("Não foi possível realizar o login!");
    }

    const newToken = jwt.sign({ sub: user[0].uuid_colaborador }, SECRET, {
      expiresIn: "7d",
    });

    res.setHeader(
      "Set-Cookie",
      `authToken=${newToken}; Domain=sistema-do-cliente.vercel.app; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=604800`
    );

    res.writeHead(307, { Location: "/simulador" });
    return res.end();
  } catch (err) {
    console.error("Erro de autenticação:", err);
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
}
