"use client";

import Image from "next/image";
import Link from "next/link";
import UserInfoHeader from "./UserInfoHeader";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname ? pathname.startsWith(path) : false;
  };

  return (
    <header className="bg-background text-rzk_dark w-full h-[50px] flex items-center pt-10">
      <div className="flex justify-between w-full">
        <div className="flex items-center w-[410px] space-x-4">
          <Image
            src="/logo-rzk-digital.svg"
            alt="Logo RZK Digital"
            width={120}
            height={50}
          />
          <div className="border-l border-rzk_darker h-full"></div>
          <nav>
            <ul className="flex space-x-4 text-sm">
              <li>
                <Link
                  href="/dashboard"
                  className={`${
                    isActive("/dashboard")
                      ? "font-extrabold"
                      : "font-extralight"
                  }`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/campanhas"
                  className={`${
                    isActive("/campanhas")
                      ? "font-extrabold"
                      : "font-extralight"
                  }`}
                >
                  Campanhas
                </Link>
              </li>
              <li>
                <Link
                  href="/simulador"
                  className={`${
                    isActive("/simulador")
                      ? "font-extrabold"
                      : "font-extralight"
                  }`}
                >
                  Simulador
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <UserInfoHeader />
      </div>
    </header>
  );
}
