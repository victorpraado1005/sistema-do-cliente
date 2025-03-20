import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import { clerkClient } from "@clerk/nextjs/server";

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

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const decoded = jwt.verify(token, SECRET) as JwtPayload;
    const { userEmail, userId } = decoded;

    if (!userEmail) {
      return res.status(401).json({ error: "Token inválido" });
    }

    const users = await clerkClient.users.getUserList({
      emailAddress: [userEmail],
    });

    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = users[0];

    // 🔐 Verificar se o retool_id bate com o valor salvo
    if (user.privateMetadata?.retool_id !== userId) {
      return res.status(401).json({ error: "Invalid retool_id" });
    }

    // ✅ Criar uma sessão diretamente sem senha
    const session = await clerkClient.sessions.createSession({
      userId: user.id,
    });

    res.writeHead(307, { Location: "/simulador" });
    res.end();
  } catch (err) {
    console.error("Erro de autenticação:", err);
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
}
