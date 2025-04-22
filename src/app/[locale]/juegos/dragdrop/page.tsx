"use client";

import { useEffect, useState } from "react";

interface Sentence {
  sentence: string;
  words: string[];
  meaning: string;
}

const frases: Sentence[] = [
  {
    sentence: "一举两得",
    words: ["一", "举", "两", "得"],
    meaning: "two birds with one stone",
  },
  {
    sentence: "丢三落四",
    words: ["丢", "三", "落", "四 "],
    meaning: "forgetful",
  },
  {
    sentence: "家喻户晓",
    words: ["家", "喻", "户", "晓"],
    meaning: "well-known",
  },
  {
    sentence: "一丝不苟",
    words: ["一", "丝", "不", "苟"],
    meaning: "strictly according to the rules",
  },
  {
    sentence: "拔苗助长",
    words: ["拔", "苗", "助", "长"],
    meaning: "to spoil things through excessive enthusiasm",
  },
  {
    sentence: "一帆风顺",
    words: ["一", "帆", "风", "顺 "],
    meaning: "propitious wind throughout the journey",
  },
  {
    sentence: "滔滔不绝",
    words: ["滔", "滔", "不", "绝"],
    meaning: "unceasing torrent, non-stop",
  },
  {
    sentence: "画蛇添足",
    words: ["画", "蛇", "添", "足"],
    meaning: "to ruin the effect by adding sth superfluous",
  },
];

export default function Page() {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [userOrder, setUserOrder] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [showCorrectOrder, setShowCorrectOrder] = useState<boolean>(false);
  const [isWrong, setIsWrong] = useState<boolean>(false);

  const shuffle = <T,>(array: T[]): T[] => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  useEffect(() => {
    const shuffledSentences = shuffle(frases);
    setSentences(shuffledSentences);

    const firstSentence = shuffledSentences[0];
    setShuffledWords(shuffle([...firstSentence.words]));
    setUserOrder([...firstSentence.words]);
  }, []);

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
      setUserOrder([...nextSentence.words]);
      setIsChecked(false);
      setShowCorrectOrder(false);
      setIsWrong(false);
    } else {
      setCurrentSentenceIndex(0);
      const firstSentence = sentences[0];
      setShuffledWords(shuffle([...firstSentence.words]));
      setUserOrder([...firstSentence.words]);
      setIsChecked(false);
      setShowCorrectOrder(false);
      setIsWrong(false);
    }
  };

  const handleCheck = () => {
    if (shuffledWords.join(" ") === userOrder.join(" ")) {
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
    <div className="container mt-10 mx-auto p-6 text-gray-800 dark:text-white min-h-[500px] flex flex-col">
      <h1 className="text-center text-3xl font-bold mb-6 text-[var(--color-textPrimary)]">
        ¡Ordena la frase!
      </h1>

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
                className="bg-[var(--color-bgSecondary)] dark:bg-[var(--color-bgSecondary)] text-[var(--color-textPrimary)] dark:text-white p-2 rounded-md m-2 cursor-pointer hover:bg-[var(--color-accent)] dark:hover:bg-[var(--color-accent)]"
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
          className="px-4 py-2 bg-[var(--color-blue)] text-white rounded-md hover:bg-[var(--color-blue)]/80 transition-all"
        >
          Comprobar
        </button>
        <button
          onClick={handleGiveUp}
          className="px-4 py-2 bg-[var(--color-pink)] text-white rounded-md hover:bg-[var(--color-pink)]/80 transition-all"
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
          <p className="font-bold">{userOrder.join(" ")}</p>
          <p className="mt-4">{sentences[currentSentenceIndex].meaning}</p>
        </div>
      )}

      <div className="flex justify-center gap-4 mt-5">
        <button
          onClick={handleNextSentence}
          className="px-4 py-2 bg-[var(--color-accent)] text-white rounded-md hover:bg-[var(--color-accent)]/80 transition-all"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
