import { NextResponse } from "next/server";
import { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers";

async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("authToken")?.value;
}

export async function GET() {
  const accessToken = await getAccessToken();
  const SECRET = process.env.JWT_SECRET as string;

  if (!accessToken) {
    return NextResponse.json(
      { error: "Token não encontrado" },
      { status: 401 }
    );
  }

  try {
    const { sub } = verify(accessToken, SECRET) as JwtPayload;
    return NextResponse.json({ sub });
  } catch (error) {
    return NextResponse.json(
      { error: "Token inválido ou expirado" },
      { status: 401 }
    );
  }
}
