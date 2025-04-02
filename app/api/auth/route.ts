// app/api/auth/route.ts
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { fetchUser } from "@/lib/api";

const SECRET = process.env.JWT_SECRET as string;

export async function OPTIONS(request: Request) {
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Credentials", "true");
  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  return new NextResponse(null, { headers, status: 204 });
}

export async function GET(request: Request) {
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Credentials", "true");
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, SECRET) as JwtPayload;
    const { userEmail, userId } = decoded;

    if (!userEmail) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    const user = await fetchUser({ email: userEmail });

    if (user[0].id_externo_retool !== userId) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    const newToken = jwt.sign({ sub: user[0].uuid_colaborador }, SECRET, {
      expiresIn: "7d",
    });

    // Cria uma resposta de redirecionamento para /simulador e define o cookie
    const response = NextResponse.redirect(new URL("/simulador", request.url));
    response.cookies.set("authToken", newToken, {
      domain: "sistema-do-cliente.vercel.app",
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 604800, // 7 dias em segundos
    });

    return response;
  } catch (err) {
    console.error("Erro de autenticação:", err);
    return NextResponse.json(
      { error: "Token inválido ou expirado" },
      { status: 401 }
    );
  }
}
