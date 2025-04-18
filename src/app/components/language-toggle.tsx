"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Languages } from "lucide-react";

const LanguageToggler = () => {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();

  const toggleLocale = (newLocale: string) => {
    router.push(`/${newLocale}`);
  };

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
          <Link
            href="#"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              toggleLocale(locale === "en" ? "es" : "en");
            }}
          >
            {locale === "en" ? "Español" : "English"}
          </Link>
        </div>
      )}
    </div>
  );
};

export default LanguageToggler;
