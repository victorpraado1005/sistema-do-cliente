import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Header from "@/components/Header/Header";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await auth();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col min-h-screen w-[1280px] m-auto">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}
