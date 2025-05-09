"use client";

import { useState } from "react";
import { Flashcard } from "@/lib/definitions";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { FlashcardFront } from "./FlashcardFront";
import { FlashcardBack } from "./FlashcardBack";

interface FlashcardReviewProps {
  flashcards: Flashcard[];
  idioma: string;
}

export function FlashcardReview({ flashcards, idioma }: FlashcardReviewProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [mostrar, setMostrar] = useState<boolean>(false);

  // función para mostrar la siguiente tarjeta
  // si es la última tarjeta, vuelve a la primera
  const handleReview = async (difficulty: "easy" | "hard" | "forgot") => {
    const currentFlashcard = flashcards[currentIndex];

    // actualiza la información de la revisión para la lógica de repetición
    try {
      await fetch("/api/update-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flashcardId: currentFlashcard.id,
          currentFrequency: currentFlashcard.reviewFrequency || 0,
          difficulty,
        }),
      });
    } catch (error) {
      console.error("Error al actualizar la tarjeta:", error);
    }

    // muestra la siguiente tarjeta
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= flashcards.length) return 0;
      return nextIndex;
    });
    setMostrar(false);
  };

  if (!flashcards || flashcards.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No hay tarjetas disponibles para repasar.
      </div>
    );
  }

  const currentFlashcard = flashcards[currentIndex];

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-6">
        {/* Parte delantera */}
        <FlashcardFront
          palabra={currentFlashcard.palabra}
          mostrar={mostrar}
          onToggleMostrar={() => setMostrar(!mostrar)}
        />

        {/* Parte trasera */}
        <AnimatePresence mode="wait">
          <FlashcardBack
            flashcard={currentFlashcard}
            mostrar={mostrar}
            idioma={idioma}
          />
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => handleReview("easy")}
          className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer hover:bg-green-700 transition"
        >
          Fácil
        </button>
        <button
          onClick={() => handleReview("hard")}
          className="px-4 py-2 bg-yellow-500 text-white rounded cursor-pointer hover:bg-yellow-600 transition"
        >
          Difícil
        </button>
        <button
          onClick={() => handleReview("forgot")}
          className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer hover:bg-red-700 transition"
        >
          No me la sé
        </button>
      </div>

      <p className="text-center mt-4 text-sm text-gray-600">
        {currentIndex + 1} / {flashcards.length}
      </p>
      <Link
        href={`/listas`}
        className="mt-4 block text-center text-[var(--color-blue)]"
      >
        Volver a las listas
      </Link>
    </div>
  );
}
