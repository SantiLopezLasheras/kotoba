"use client";

import { useState, useEffect, useRef } from "react";
import { UserRound } from "lucide-react";
import Link from "next/link";

interface UserMenuProps {
  isAdmin: boolean;
}

const UserMenu = ({ isAdmin }: UserMenuProps) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="text-white bg-accent rounded-full p-1"
      >
        <UserRound className="cursor-pointer" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-50 overflow-hidden">
          <ul className="flex flex-col text-sm text-gray-800">
            <li>
              <Link
                href="#"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 hover:bg-blue"
              >
                Mi Perfil
              </Link>
            </li>
            <li>
              <Link
                href="/favoritos"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 hover:bg-blue"
              >
                Mis Favoritos
              </Link>
            </li>
            <li>
              <Link
                href="/listas"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 hover:bg-blue"
              >
                Mis Listas
              </Link>
            </li>
            {isAdmin && (
              <li>
                <Link href="/admin" className="block px-4 py-2 hover:bg-blue">
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
