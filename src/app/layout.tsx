import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Kotoba",
  description: "Flashcards to Fluency!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
