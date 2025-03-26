import { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("authToken")?.value;
}

export async function auth(): Promise<string | boolean> {
  const accessToken = await getAccessToken();
  const SECRET = process.env.JWT_SECRET as string;

  if (!accessToken) {
    return false;
  }

  try {
    const { userId } = verify(accessToken, SECRET) as JwtPayload;
    console.log("sub " + userId);
    return true;
  } catch {
    return false;
  }
}
