import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getUserByEmailAndRetoolId } from "@/lib/db"; // Sua função para buscar o usuário no banco

const SECRET = process.env.JWT_SECRET as string;

// Extendendo o NextApiRequest para incluir o usuário autenticado
export interface AuthenticatedNextApiRequest extends NextApiRequest {
  user?: {
    id: number;
    name: string;
    email: string;
    retool_id: number;
  };
}

export function authenticate(
  handler: (
    req: AuthenticatedNextApiRequest,
    res: NextApiResponse
  ) => void | Promise<void>
) {
  return async (req: AuthenticatedNextApiRequest, res: NextApiResponse) => {
    // Supondo que o token esteja salvo em um cookie chamado "authToken"
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    try {
      // Verifica e decodifica o token
      const decoded = jwt.verify(token, SECRET) as JwtPayload;

      // Aqui, considere que o payload do token possui, por exemplo, "userId" e "userEmail"
      const { userRetoolId, userEmail } = decoded;

      if (!userRetoolId || !userEmail) {
        return res.status(401).json({ error: "Token inválido" });
      }

      // Busca o usuário no banco usando as informações do token
      const user = await getUserByEmailAndRetoolId(userRetoolId, userEmail);
      if (!user) {
        return res.status(401).json({ error: "Usuário não encontrado" });
      }

      // Anexa as informações do usuário à requisição para uso posterior
      req.user = user;
      return handler(req, res);
    } catch (error) {
      console.error("Erro ao validar token:", error);
      return res.status(401).json({ error: "Token inválido ou expirado" });
    }
  };
}
