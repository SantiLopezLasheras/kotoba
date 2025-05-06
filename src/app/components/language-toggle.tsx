"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import { Languages } from "lucide-react";

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "ca", label: "Català" },
];

const LanguageToggler = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  if (!isMounted) {
    return null; // para evitar el error de Hydration
  }

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center p-2 bg-transparent border-none cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Languages size={24} strokeWidth={1.5} color="#f27220" />
      </button>

      {/* Dropdown para cambiar de idioma */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => toggleLocale(lang.code)}
              className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 cursor-pointer"
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageToggler;
