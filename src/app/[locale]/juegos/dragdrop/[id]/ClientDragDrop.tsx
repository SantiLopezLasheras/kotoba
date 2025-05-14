"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Sentence = {
  id: number;
  words: string[];
  meaning: string;
};

export default function ClientDragDrop({
  flashcards,
}: {
  flashcards: Sentence[];
}) {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [showCorrectOrder, setShowCorrectOrder] = useState<boolean>(false);
  const [isWrong, setIsWrong] = useState<boolean>(false);

  const shuffle = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    let currentIndex = newArray.length;
    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [newArray[currentIndex], newArray[randomIndex]] = [
        newArray[randomIndex],
        newArray[currentIndex],
      ];
    }
    return newArray;
  };

  useEffect(() => {
    const shuffled = shuffle(flashcards);
    setSentences(shuffled);
    setShuffledWords(shuffle([...shuffled[0].words]));
  }, [flashcards]);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.dataTransfer.setData("draggedIndex", index.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetIndex: number
  ) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("draggedIndex"), 10);
    const updatedWords = [...shuffledWords];
    [updatedWords[draggedIndex], updatedWords[targetIndex]] = [
      updatedWords[targetIndex],
      updatedWords[draggedIndex],
    ];
    setShuffledWords(updatedWords);
  };

  const handleNextSentence = () => {
    const nextIndex = currentSentenceIndex + 1;

    if (nextIndex < sentences.length) {
      setCurrentSentenceIndex(nextIndex);
      const nextSentence = sentences[nextIndex];
      setShuffledWords(shuffle([...nextSentence.words]));
    } else {
      setCurrentSentenceIndex(0);
      setShuffledWords(shuffle([...sentences[0].words]));
    }

    setIsChecked(false);
    setShowCorrectOrder(false);
    setIsWrong(false);
  };

  const handleCheck = () => {
    if (
      shuffledWords.join(" ") ===
      sentences[currentSentenceIndex].words.join(" ")
    ) {
      setIsChecked(true);
      setIsWrong(false);
    } else {
      setIsChecked(false);
      setIsWrong(true);
      setShowCorrectOrder(false);
    }
  };

  const handleGiveUp = () => {
    setShowCorrectOrder(true);
    setIsWrong(false);
  };

  return (
    <div className="container  mx-auto p-6 text-gray-800 dark:text-white min-h-[500px] flex flex-col bg-gradient-to-r from-[var(--color-blue)] to-[var(--color-accent)]">
      <div className="flex justify-between items-center px-8 py-5 mb-6">
        <h1 className="text-center text-3xl  text-[var(--color-textPrimary)] dark:text-white ">
          ¡Ordena la frase!
        </h1>
        <Link
          href={`/listas`}
          className="bg-[var(--color-blue)] text-white py-2 px-4 rounded hover:bg-[var(--color-blue)]/80 transition"
        >
          Volver a listas
        </Link>
      </div>

      <div className="flex justify-center space-x-6 mb-6">
        <div className="w-[500px] bg-[var(--color-bgPrimary)] dark:bg-[var(--color-bgSecondary)] p-6 rounded-lg shadow-lg">
          <div
            className="flex flex-wrap justify-center"
            onDragOver={handleDragOver}
          >
            {shuffledWords.map((word, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                className="bg-[var(--color-bgSecondary)] dark:bg-[var(--color-bgSecondary)] text-[var(--color-textPrimary)] dark:text-white p-2 rounded m-2 cursor-pointer hover:bg-[var(--color-accent)] dark:hover:bg-[var(--color-accent)]"
              >
                {word}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={handleCheck}
          className="px-4 py-2 bg-[var(--color-blue)] text-white rounded cursor-pointer hover:bg-[var(--color-blue)]/80 transition-all"
        >
          Comprobar
        </button>
        <button
          onClick={handleGiveUp}
          className="px-4 py-2 bg-[var(--color-pink)] text-white rounded cursor-pointer hover:bg-[var(--color-pink)]/80 transition-all"
        >
          Rendirse
        </button>
      </div>

      {isChecked && !isWrong && (
        <div>
          <div className="text-center text-green-500 mt-4">¡Correcto!</div>
          <p className="text-center mt-4">
            {sentences[currentSentenceIndex].meaning}
          </p>
        </div>
      )}

      {isWrong && !isChecked && (
        <div className="text-center text-red-500 mt-4">
          ¡Incorrecto! Intenta de nuevo o haz clic en Rendirse.
        </div>
      )}

      {showCorrectOrder && (
        <div className="text-center text-red-500 mt-4">
          <p>Correct order:</p>
          <p className="font-bold">
            {sentences[currentSentenceIndex].words.join(" ")}
          </p>
          {/* <p className="mt-4">{sentences[currentSentenceIndex].meaning}</p> */}
        </div>
      )}

      <div className="flex justify-center gap-4 mt-5">
        <button
          onClick={handleNextSentence}
          className="px-4 py-2 bg-[var(--color-accent)] text-white rounded cursor-pointer hover:bg-[var(--color-accent)]/80 transition-all"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
