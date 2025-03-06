import { ReactNode } from "react";
import { K2D, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import { Providers } from "./providers";

const k2d = K2D({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const ibm = IBM_Plex_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "RZK Digital - Sistema do Cliente",
  description: "Sistema do cliente - RZK Digital.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={`${ibm.className} antialiased`}>
        <Providers>
          <div className="flex flex-col min-h-screen w-[1280px] m-auto">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
