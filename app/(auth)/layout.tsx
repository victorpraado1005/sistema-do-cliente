import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const accessToken = await auth();

  if (accessToken) {
    redirect("/dashboard");
  }

  return <div>{children}</div>;
}
