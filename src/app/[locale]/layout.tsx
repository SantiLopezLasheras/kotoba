import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Kotoba",
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
  // comprobar si el locale es válido
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" enableSystem defaultTheme="system">
            <Navbar />
            <main>{children}</main>
          </ThemeProvider>
          {/* <Footer /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
