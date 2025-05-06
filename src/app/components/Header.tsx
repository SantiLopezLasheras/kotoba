import Image from "next/image";
import Link from "next/link";
import LanguageToggler from "./language-toggle";
import ThemeToggle from "./theme-toggle";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { LogOut, LogIn } from "lucide-react";
import UserMenu from "./UserMenu";
import { useTranslations } from "next-intl";

interface HeaderProps {
  isUserAuthenticated: boolean;
}

export default function Header({ isUserAuthenticated }: HeaderProps) {
  const t = useTranslations("Header");
  console.log("Is User Authenticated: ", isUserAuthenticated);

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
          {t("lists")}
        </Link>
        <Link href="/juegos" className="text-accent hover:underline uppercase">
          {t("games")}
        </Link>
        <Link href="/planes" className="text-accent hover:underline uppercase">
          {t("plans")}
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {isUserAuthenticated && <UserMenu isAdmin={false} />}
        <ThemeToggle />
        <LanguageToggler />
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
