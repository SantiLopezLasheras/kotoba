"use client";

import { Flashcard } from "@/lib/definitions";
import { HeartOff } from "lucide-react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { EditFlashcardButton } from "../listas/[id]/EditFlashcardButton";

export function FlashcardList({
  flashcards,
  onFlashcardSelect,
}: {
  flashcards: Flashcard[];
  userId: string;
  onFlashcardSelect: (f: Flashcard | null) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleUnfavorite = (id: number) => {
    startTransition(async () => {
      try {
        const res = await fetch(`/api/favorites?flashcardId=${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          toast.error("Error al eliminar favorito", {
            duration: 4000,
            position: "top-right",
          });
          return;
        }
        onFlashcardSelect(null);
        router.refresh();
      } catch (error) {
        void error;
        toast.error("Error inesperado al eliminar favorito", {
          duration: 4000,
          position: "top-right",
        });
      }
    });
  };

  return (
    <div className="space-y-2">
      {flashcards.map((flashcard) => (
        <div
          key={flashcard.id}
          className="flex items-center justify-between p-2 cursor-pointer rounded transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={() => onFlashcardSelect(flashcard)}
        >
          <span className="font-medium text-[var(--color-accent)]">
            {flashcard.palabra}
          </span>
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => handleUnfavorite(flashcard.id)}
              disabled={isPending}
              className="flex justify-center items-center bg-red-500 text-white p-2 rounded-full cursor-pointer hover:bg-red-600 transition duration-300"
            >
              <HeartOff size={24} />
            </button>

            <EditFlashcardButton
              flashcard={{
                ...flashcard,
                fraseEjemplo: flashcard.fraseEjemplo ?? null,
                categoriaGramatical: flashcard.categoriaGramatical ?? null,
                notas: flashcard.notas ?? null,
                pronunciacion: flashcard.pronunciacion ?? null,
                image: flashcard.image ?? null,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
