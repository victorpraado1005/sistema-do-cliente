import { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("authToken")?.value;
}

export async function auth(): Promise<string | boolean | undefined> {
  const accessToken = await getAccessToken();
  const SECRET = process.env.JWT_SECRET as string;
  if (!accessToken) {
    return false;
  }

  try {
    const { sub } = verify(accessToken, SECRET) as JwtPayload;
    return sub;
  } catch {
    return false;
  }
}
