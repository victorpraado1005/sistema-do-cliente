import { ReactNode } from "react";

import { redirect } from "next/navigation";
import Header from "@/components/Header/Header";
import { UserProvider } from "./context/UserContext";
import { auth } from "@/lib/auth";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await auth();

  if (!user) {
    redirect("https://www.rzkdigital.com.br");
  }

  return (
    <div className="flex flex-col min-h-screen w-[1280px] m-auto">
      <UserProvider>
        <Header />
        <main className="flex-1">{children}</main>
      </UserProvider>
    </div>
  );
}
