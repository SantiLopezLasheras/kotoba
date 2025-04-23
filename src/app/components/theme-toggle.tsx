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
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-2">
      <SunMedium className="w-5 h-5 text-yellow-500" />
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={`w-12 h-6 flex items-center rounded-full cursor-pointer px-1 transition-colors duration-300 ${
          isDark ? "bg-orange-400" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            isDark ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
      <Moon className="w-5 h-5 text-gray-500" />
    </div>
  );
}
