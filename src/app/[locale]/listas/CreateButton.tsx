"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import ListaModal from "./ListaModal";

export const CreateButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-[var(--color-accent)] text-white p-2 rounded-lg flex items-center gap-2 hover:bg-[var(--color-accent)]/90 cursor-pointer"
      >
        <Plus />
        <span>Crear lista</span>
      </button>

      <ListaModal isOpen={open} onClose={() => setOpen(false)} mode="create" />
    </>
  );
};
