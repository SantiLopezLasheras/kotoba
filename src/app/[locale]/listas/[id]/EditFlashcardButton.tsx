"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import FlashcardModal from "./FlashcardModal";

type Props = {
  flashcard: {
    id: number;
    palabra: string;
    traduccion: string;
    fraseEjemplo: string | null;
    categoriaGramatical: string | null;
    notas: string | null;
    pronunciacion: string | null;
    listaId: number;
    image: string | null;
  };
};

export const EditFlashcardButton = ({ flashcard }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex justify-center items-center bg-[var(--color-blue)] text-white p-2 rounded-full cursor-pointer hover:bg-[var(--color-blue)]/80 transition duration-300"
        title="Editar"
      >
        <Pencil className="w-5 h-5" />
      </button>

      <FlashcardModal
        isOpen={open}
        onClose={() => setOpen(false)}
        mode="edit"
        id={flashcard.id}
        listaId={flashcard.listaId}
        defaultValues={{
          palabra: flashcard.palabra,
          traduccion: flashcard.traduccion,
          fraseEjemplo: flashcard.fraseEjemplo ?? "",
          categoriaGramatical: flashcard.categoriaGramatical ?? "",
          notas: flashcard.notas ?? "",
          pronunciacion: flashcard.pronunciacion ?? "",
          image: flashcard.image ?? "",
        }}
      />
    </>
  );
};
