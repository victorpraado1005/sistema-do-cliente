import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
// import { getUserByEmail } from "@/lib/db"; // Busca usuário no PostgreSQL

const SECRET = process.env.JWT_SECRET as string; // Garante que a chave seja string

function getUserByEmail(userEmail: String) {
   const email = 'dados@rzkdigital.com.br'
   if (userEmail === email) {
    return {
        id: 123,
        email: 'dados@rzkdigital.com.br'
    }
   } else {
    return false
   }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
        const { userEmail } = decoded;

        if (!userEmail) {
            return res.status(401).json({ error: "Token inválido" });
        }

        // Busca usuário no PostgreSQL
        const user = await getUserByEmail(userEmail);
        if (!user) {
            return res.status(401).json({ error: "Usuário não encontrado" });
        }

        // Gera um novo JWT de sessão com expiração mais longa
        const newToken = jwt.sign(
            { userId: user.id, userEmail: user.email },
            SECRET,
            { expiresIn: "7d" } // Expira em 7 dias
        );

        // Define o token em um httpOnly Cookie seguro
        res.setHeader("Set-Cookie", `authToken=${newToken}; HttpOnly; Secure; Path=/; Max-Age=604800`);

        // Retorna a URL para redirecionamento
        return res.status(200).json({
            success: true,
            redirectUrl: "https://seusistema.com/dashboard"
        });
    } catch (err) {
        console.error("Erro de autenticação:", err);
        return res.status(401).json({ error: "Token inválido ou expirado" });
    }
}
