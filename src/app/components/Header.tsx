import LanguageToggler from "./language-toggle";
import ThemeToggle from "./theme-toggle";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { LogOut, LogIn } from "lucide-react";

export default function Header() {
  const { isAuthenticated } = getKindeServerSession();

  return (
    <nav className="flex justify-between items-center p-4 bg-bgPrimary">
      <div className="text-lg font-bold text-accent">KOTOBA</div>

      <div className="flex items-center space-x-4">
        <LanguageToggler />
        <ThemeToggle />
        {isAuthenticated() ? (
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
