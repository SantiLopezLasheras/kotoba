"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useState, useEffect, useRef } from "react";
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
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
        <div
          ref={dropdownRef}
          className="absolute top-full right-0 mt-2 bg-white border border-blue rounded-md shadow-lg overflow-hidden"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                toggleLocale(lang.code);
                setIsOpen(false);
              }}
              className="block w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-blue cursor-pointer"
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
