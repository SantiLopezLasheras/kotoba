"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunMedium, ToggleLeft, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <ToggleLeft className="animate-pulse" size={24} />;
  }

  if (theme === "dark") {
    return (
      <SunMedium
        strokeWidth={1.5}
        color="#f27220"
        onClick={() => setTheme("light")}
      />
    );
  }
  if (theme === "light") {
    return (
      <Moon strokeWidth={1} color="#f27220" onClick={() => setTheme("dark")} />
    );
  }
}
