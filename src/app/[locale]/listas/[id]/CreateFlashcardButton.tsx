"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import FlashcardModal from "./FlashcardModal";

export const CreateFlashcardButton = ({ listaId }: { listaId: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-[var(--color-accent)] text-white p-2 rounded cursor-pointer flex items-center gap-2 hover:bg-[var(--color-accent)]/90"
      >
        <Plus />
        <span>Crear tarjeta</span>
      </button>

      <FlashcardModal
        isOpen={open}
        onClose={() => setOpen(false)}
        mode="create"
        listaId={listaId}
      />
    </>
  );
};
