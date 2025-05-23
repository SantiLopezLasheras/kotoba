"use client";

import { useState } from "react";
import { Flashcard } from "@/lib/definitions";
import { FlashcardList } from "./FlashcardList";
import { FlashcardPreview } from "./FlashcardPreview";
import { Printer } from "lucide-react";
import { printFlashcards } from "@/utils/printFlashcards";
import Link from "next/link";

export function FlashcardFavoritesClient({
  flashcards,
  userId,
  isPremium,
}: {
  flashcards: Flashcard[];
  userId: string;
  isPremium: boolean;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<Flashcard | null>(null);

  const filtered = flashcards.filter((flashcard) =>
    flashcard.palabra.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-end gap-4 px-8 py-5 ">
        {isPremium && (
          <button
            onClick={() => printFlashcards(flashcards)}
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-orange-600"
          >
            <Printer size={18} />
            Imprimir Flashcards
          </button>
        )}

        <Link
          href="/listas"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Volver a Listas
        </Link>
      </div>
      <div className="flex">
        <div className="w-1/3 p-4 border-r">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full p-2 mb-4 border-2 border-[var(--color-accent)] rounded outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FlashcardList
            flashcards={filtered}
            userId={userId}
            onFlashcardSelect={setSelected}
          />
        </div>

        <div className="w-2/3 p-4">
          <FlashcardPreview flashcard={selected} />
        </div>
      </div>
    </>
  );
}
