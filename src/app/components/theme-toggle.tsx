"use client";

import { useTheme } from "next-themes";
import { SunMedium, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  if (!theme) {
    return (
      <Moon strokeWidth={1} color="#f27220" onClick={() => setTheme("dark")} />
    );
  }

  return theme === "dark" ? (
    <SunMedium
      strokeWidth={1.5}
      color="#f27220"
      onClick={() => setTheme("light")}
    />
  ) : (
    <Moon strokeWidth={1} color="#f27220" onClick={() => setTheme("dark")} />
  );
}
