import type { Metadata } from "next";
import "../globals.css";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import Navbar from "../components/Header";
import Footer from "../components/Footer";
import { Providers } from "./providers";
import { comprobarUsuarioEnBD } from "@/lib/comprobarUsuario";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { checkAdminRole } from "@/lib/auth/checkAdmin";
import { checkPremiumRole } from "@/lib/auth/checkPremium";
import { Toaster } from "react-hot-toast";
import { InitVoices } from "./initVoices";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KOTOBA",
  description: "Flashcards to Fluency!",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}>) {
  // comprobar si el usuario está autenticado
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = (await isAuthenticated()) ?? false;

  // comprobar si el usuario existe en la base de datos
  const user = await getUser();

  if (user) {
    await comprobarUsuarioEnBD({
      id: user.id,
      email: user.email ?? undefined, // el email puede ser undefined
    });
  }

  // comprobar si el usuario es admin
  const isAdmin = await checkAdminRole();

  // comprobar si el usuario es premium
  const isPremium = await checkPremiumRole();

  // comprobar si el locale es válido
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // cargar las traducciones
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} className={inter.className} suppressHydrationWarning>
      <body>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Navbar
              isUserAuthenticated={isUserAuthenticated}
              isAdmin={isAdmin}
              isPremium={isPremium}
            />
            <InitVoices />
            <main>{children}</main>
            <Toaster position="top-right" />
            <Footer />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
