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
        className="bg-[var(--color-accent)] text-white p-2 rounded-lg flex items-center gap-2 hover:bg-[var(--color-accent)]/90 cursor-pointer"
      >
        <Plus />
        <span>Crear tarjeta</span>
      </button>

      {/* Modal for creating or editing a flashcard */}
      <FlashcardModal
        isOpen={open}
        onClose={() => setOpen(false)}
        mode="create"
        listaId={listaId}
      />
    </>
  );
};
