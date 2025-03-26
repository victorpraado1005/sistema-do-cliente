import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
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
    console.log("🟢 Preflight OPTIONS tratado com sucesso");
    return res.status(200).end();
  }

  const token = req.query.token;

  if (!token || typeof token !== "string") {
    return res.status(401).json({ error: "Token inválido" });
  }

  console.log(token);

  // if (req.method !== "POST") {
  //   return res.status(405).json({ error: "Método não permitido" });
  // }

  try {
    const decoded = jwt.verify(token, SECRET) as JwtPayload;
    const { userEmail, userId } = decoded;

    if (!userEmail) {
      return res.status(401).json({ error: "Token inválido" });
    }

    const response = await fetchUser({
      email: "victor.prado@rzkdigital.com.br ",
    });

    console.log(response);

    res.writeHead(307, { Location: "/simulador" });
    res.end();
  } catch (err) {
    console.error("Erro de autenticação:", err);
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
}
