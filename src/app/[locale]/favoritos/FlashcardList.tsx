"use client";

import { Flashcard } from "@/lib/definitions";
import { HeartOff, Edit } from "lucide-react";
import { unfavoriteCard } from "./unfavoriteCardAction";
import { useTransition } from "react";

export function FlashcardList({
  flashcards,
  userId,
  onFlashcardSelect,
  onUnfavorite,
}: {
  flashcards: Flashcard[];
  userId: string;
  onFlashcardSelect: (f: Flashcard) => void;
  onUnfavorite: (id: number) => void;
}) {
  const [isPending, startTransition] = useTransition();

  const handleUnfavorite = (id: number) => {
    startTransition(async () => {
      try {
        await unfavoriteCard(userId, id);
        onUnfavorite(id);
      } catch (err) {
        console.error("Error al eliminar favorito:", err);
      }
    });
  };

  return (
    <div className="space-y-2">
      {flashcards.map((f) => (
        <div
          key={f.id}
          className="flex items-center justify-between p-2 cursor-pointer rounded transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={() => onFlashcardSelect(f)}
        >
          <span className="font-medium text-[var(--color-accent)]">
            {f.palabra}
          </span>
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => handleUnfavorite(f.id)} disabled={isPending}>
              <HeartOff size={18} className="text-red-500" />
            </button>
            <button>
              <Edit size={18} className="text-blue-500" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
