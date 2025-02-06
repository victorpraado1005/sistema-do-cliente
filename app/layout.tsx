import { ReactNode } from "react";
import { K2D } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";

const k2d = K2D({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata = {
  title: "RZK Digital - Sistema do Cliente",
  description: "Sistema do cliente - RZK Digital.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={`${k2d.className} antialiased`}>
        <div className="flex flex-col min-h-screen w-[1080px] m-auto">
          <Header />

          {/* Conteúdo principal */}
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
