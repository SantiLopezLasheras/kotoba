"use client";

import { useTheme } from "next-themes";
import { SunMedium, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // evita errores de hidratación
  const iconProps = {
    strokeWidth: 1.5,
    color: "#f27220",
  };

  if (!mounted) {
    return null; // evita errores de hidratación
  }

  if (!theme) {
    return <Moon {...iconProps} onClick={() => setTheme("dark")} />;
  }

  return theme === "dark" ? (
    <SunMedium {...iconProps} onClick={() => setTheme("light")} />
  ) : (
    <Moon {...iconProps} onClick={() => setTheme("dark")} />
  );
}
