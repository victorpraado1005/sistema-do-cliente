import { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("authToken")?.value;
}

export async function auth(): Promise<null> {
  const accessToken = await getAccessToken();
  const SECRET = process.env.JWT_SECRET as string;

  if (!accessToken) {
    return null;
  }

  try {
    const { sub } = verify(accessToken, SECRET) as JwtPayload;

    return null;
  } catch {
    return null;
  }
}
