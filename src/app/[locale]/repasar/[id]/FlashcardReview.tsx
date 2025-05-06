"use client";

import { useState } from "react";
import { Flashcard } from "@/lib/definitions";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

interface FlashcardReviewProps {
  flashcards: Flashcard[];
  listaId: number;
}

export function FlashcardReview({ flashcards }: FlashcardReviewProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [mostrar, setMostrar] = useState<boolean>(false);

  const nextCard = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= flashcards.length) return 0;
      return nextIndex;
    });
    setMostrar(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-6">
        {/* Front of flashcard */}
        <div className="w-full sm:w-[500px] h-72 flex flex-col items-center justify-center bg-white text-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            {flashcards[currentIndex].palabra}
          </h2>

          <button
            onClick={() => setMostrar(!mostrar)}
            className="mt-4 px-4 py-2 bg-[var(--color-blue)] text-white rounded-md hover:bg-[var(--color-blue)]/80 transition-all"
          >
            {mostrar ? "Ocultar" : "Mostrar"}
          </button>
        </div>

        {/* Back of flashcard */}
        <div className="w-full sm:w-[500px] h-72 bg-white text-gray-800 rounded-lg shadow-lg relative overflow-hidden">
          <AnimatePresence mode="wait">
            {mostrar ? (
              <motion.div
                key="back"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 p-6"
              >
                <h2 className="text-center text-2xl sm:text-3xl font-bold mb-3">
                  {flashcards[currentIndex].traduccion}
                </h2>
                <p className="font-semibold text-sm italic text-right">
                  {flashcards[currentIndex].categoriaGramatical}
                </p>
                {flashcards[currentIndex].pronunciacion && (
                  <p className="text-right text-sm italic">
                    /{flashcards[currentIndex].pronunciacion}/
                  </p>
                )}
                <hr className="my-4 border-gray-300" />
                <p className="italic">
                  {flashcards[currentIndex].fraseEjemplo}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="front"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center p-6"
              >
                <Image
                  width={200}
                  height={200}
                  src="/images/interrogation.webp"
                  alt="interrogantes"
                  className="rounded-md"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* <div className="w-full sm:w-[500px] h-72 bg-white text-gray-800 p-6 rounded-lg shadow-lg">
          <div className={mostrar ? "" : "hidden"}>
            <h2 className="text-center text-2xl sm:text-3xl font-bold mb-3">
              {flashcards[currentIndex].traduccion}
            </h2>
            <p className="font-semibold text-sm italic text-right">
              {flashcards[currentIndex].categoriaGramatical}
            </p>
            {flashcards[currentIndex].pronunciacion && (
              <p className="text-right text-sm italic">
                /{flashcards[currentIndex].pronunciacion}/
              </p>
            )}
            <hr className="my-4 border-gray-300" />
            <p className="italic">{flashcards[currentIndex].fraseEjemplo}</p>
          </div>
          {!mostrar && (
            <Image
              width={200}
              height={200}
              src="/images/interrogation.webp"
              alt="interrogantes"
              className="my-4 rounded-md mx-auto"
            />
          )}
        </div> */}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={nextCard}
          className="px-4 py-2 bg-[var(--color-blue)] text-white rounded-md cursor-pointer hover:bg-[var(--color-blue)]/80 transition-all"
        >
          Siguiente
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
