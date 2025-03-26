import { ReactNode } from "react";
import { getAccessToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const accessToken = await getAccessToken();

  if (accessToken) {
    redirect("/dashboard");
  }

  return <div>{children}</div>;
}
