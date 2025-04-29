import Image from "next/image";
import Link from "next/link";
import LanguageToggler from "./language-toggle";
import ThemeToggle from "./theme-toggle";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { LogOut, LogIn } from "lucide-react";
// import { useTranslations } from "next-intl";

export default async function Header() {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  // const t = useTranslations("Header");

  return (
    <nav className="flex justify-between items-center p-4 bg-bgPrimary">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/images/logo.png"
          alt="Kotoba Logo"
          width={80}
          height={80}
        />
      </Link>

      <div className="flex space-x-4">
        <Link href="/listas" className="text-accent hover:underline uppercase">
          Listas
        </Link>
        <Link href="/juegos" className="text-accent hover:underline uppercase">
          Juegos
        </Link>
        <Link href="/planes" className="text-accent hover:underline uppercase">
          Planes
        </Link>
        <Link
          href="/favoritos"
          className="text-accent hover:underline uppercase"
        >
          Favoritos
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <LanguageToggler />
        <ThemeToggle />
        {isUserAuthenticated ? (
          <LogoutLink
            postLogoutRedirectURL="/"
            className="text-accent rounded hover:bg-accent/90 hover:text-white transition"
          >
            <LogOut />
          </LogoutLink>
        ) : (
          <LoginLink className="text-accent rounded hover:bg-accent/90 hover:text-white transition">
            <LogIn />
          </LoginLink>
        )}
      </div>
    </nav>
  );
}
