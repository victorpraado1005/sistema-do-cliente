import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getUserByEmailAndRetoolId } from "@/lib/db";

const SECRET = process.env.JWT_SECRET as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ error: "Token não enviado" });
  }

  try {
    const token = authHeader.split(" ")[1]; // Extrai o token do header
    const decoded = jwt.verify(token, SECRET) as JwtPayload; // Decodifica e verifica
    const { userEmail, userId } = decoded;

    if (!userEmail) {
      return res.status(401).json({ error: "Token inválido" });
    }

    // Busca usuário no PostgreSQL
    const user = await getUserByEmailAndRetoolId(userEmail, userId);
    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    // Gera um novo JWT de sessão com expiração mais longa
    const newToken = jwt.sign(
      { userId: user.retool_id, userEmail: user.email },
      SECRET,
      { expiresIn: "7d" } // Expira em 7 dias
    );

    // Define o token em um httpOnly Cookie seguro
    res.setHeader(
      "Set-Cookie",
      `authToken=${newToken}; HttpOnly; Secure; Path=/; Max-Age=604800`
    );

    // Retorna a URL para redirecionamento
    return res.status(200).json({
      success: true,
      redirectUrl: "https://seusistema.com/dashboard",
    });
  } catch (err) {
    console.error("Erro de autenticação:", err);
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
}
