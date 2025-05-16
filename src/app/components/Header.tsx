"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, LogOut, LogIn } from "lucide-react";
import LanguageToggler from "./language-toggle";
import ThemeToggle from "./theme-toggle";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import UserMenu from "./UserMenu";
import { useTranslations } from "next-intl";

interface HeaderProps {
  isUserAuthenticated: boolean;
  isAdmin: boolean;
  isPremium: boolean;
}

export default function Header({
  isUserAuthenticated,
  isAdmin,
  isPremium,
}: HeaderProps) {
  const t = useTranslations("Header");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <nav className="bg-bgSecondary text-textPrimary border-b border-inactive">
      <div className="flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/logo.png"
            alt="Kotoba Logo"
            width={80}
            height={80}
          />
        </Link>

        {/* Desktop Nav */}
        {isUserAuthenticated && (
          <div className="hidden md:flex space-x-4">
            <Link
              href="/listas"
              className="text-accent hover:underline uppercase"
            >
              {t("lists")}
            </Link>
            <Link
              href="/juegos"
              className="text-accent hover:underline uppercase"
            >
              {t("games")}
            </Link>
            <Link
              href="/planes"
              className="text-accent hover:underline uppercase"
            >
              {t("plans")}
            </Link>
          </div>
        )}

        {/* Right side (desktop only) */}
        <div className="hidden md:flex items-center space-x-4">
          {isUserAuthenticated && <UserMenu isAdmin={isAdmin} />}
          {isPremium && (
            <span className="bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded uppercase">
              Premium
            </span>
          )}
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

        {/* Hamburger menu button (mobile only) */}
        <button
          className="md:hidden p-2 text-accent focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4">
          {isUserAuthenticated && (
            <>
              <Link
                href="/listas"
                className="block text-accent hover:underline uppercase"
              >
                {t("lists")}
              </Link>
              <Link
                href="/juegos"
                className="block text-accent hover:underline uppercase"
              >
                {t("games")}
              </Link>
              <Link
                href="/planes"
                className="block text-accent hover:underline uppercase"
              >
                {t("plans")}
              </Link>

              {/* Icons aligned right */}
              <div className="flex justify-end items-center space-x-4 mt-2">
                {isUserAuthenticated && <UserMenu isAdmin={isAdmin} />}
                {isPremium && (
                  <span className="bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded uppercase">
                    Premium
                  </span>
                )}
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
            </>
          )}
          {!isUserAuthenticated && (
            <div className="flex justify-end items-center space-x-4 mt-2">
              <ThemeToggle />
              <LanguageToggler />
              <LoginLink className="text-accent rounded hover:bg-accent/90 hover:text-white transition flex items-center">
                <LogIn />
              </LoginLink>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
