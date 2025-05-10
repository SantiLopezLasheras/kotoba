"use client";

import { useState, useEffect } from "react";

type Pair = {
  id: number;
  word: string;
  translation: string;
};

type Card = {
  id: number;
  content: string;
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
  backgroundColor: string;
  textColor: string;
};

export default function ClientMemoryGame({
  pairs,
  title,
}: {
  pairs: Pair[];
  title: string;
}) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium"
  );

  // Set the MAX_PAIRS based on selected difficulty
  const MAX_PAIRS =
    difficulty === "easy" ? 5 : difficulty === "medium" ? 10 : 15;

  useEffect(() => {
    const selected = [...pairs]
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(MAX_PAIRS, pairs.length));

    const newDeck: Card[] = selected.flatMap((pair, index) => {
      const { backgroundColor, textColor } = getRandomColor();

      return [
        {
          id: index * 2,
          content: pair.word,
          pairId: index,
          isFlipped: false,
          isMatched: false,
          backgroundColor,
          textColor,
        },
        {
          id: index * 2 + 1,
          content: pair.translation,
          pairId: index,
          isFlipped: false,
          isMatched: false,
          backgroundColor,
          textColor,
        },
      ];
    });

    setCards(shuffle(newDeck));
    setFlipped([]);
    setGameWon(false);
  }, [pairs, MAX_PAIRS]);

  const shuffle = (array: Card[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const getRandomColor = () => {
    const colors = [
      "#FF6B6B",
      "#FFB347",
      "#FFD93D",
      "#6BCB77",
      "#4D96FF",
      "#845EC2",
      "#F9C80E",
      "#F86624",
      "#EA3546",
      "#00C2A8",
      "#9B5DE5",
      "#F15BB5",
      "#2EC4B6",
      "#FF6F91",
      "#FFC75F",
      "#6A4C93",
      "#29C7AC",
      "#E94F37",
      "#7ECA9C",
      "#FF9671",
      "#F95738",
      "#00B8A9",
      "#FF5E78",
      "#ACD8AA",
      "#B388EB",
      "#F8B400",
      "#36C9C6",
      "#EF476F",
      "#06D6A0",
      "#FFD166",
    ];
    const bg = colors[Math.floor(Math.random() * colors.length)];
    const brightness =
      (parseInt(bg.slice(1, 3), 16) * 299 +
        parseInt(bg.slice(3, 5), 16) * 587 +
        parseInt(bg.slice(5, 7), 16) * 114) /
      1000;
    const text = brightness > 128 ? "#000000" : "#FFFFFF";
    return { backgroundColor: bg, textColor: text };
  };

  const handleFlip = (cardIndex: number) => {
    if (
      cards[cardIndex].isFlipped ||
      cards[cardIndex].isMatched ||
      flipped.length === 2
    )
      return;

    const updated = [...cards];
    updated[cardIndex].isFlipped = true;
    const newFlipped = [...flipped, cardIndex];
    setCards(updated);
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [firstIdx, secondIdx] = newFlipped;
      const first = updated[firstIdx];
      const second = updated[secondIdx];

      setTimeout(() => {
        if (first.pairId === second.pairId) {
          updated[firstIdx].isMatched = true;
          updated[secondIdx].isMatched = true;
        } else {
          updated[firstIdx].isFlipped = false;
          updated[secondIdx].isFlipped = false;
        }

        setCards([...updated]);
        setFlipped([]);

        if (updated.every((card) => card.isMatched)) {
          setGameWon(true);
        }
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">{title}</h1>

      {/* Difficulty Selection */}
      <div className="mb-6">
        <button
          onClick={() => setDifficulty("easy")}
          className={`px-4 py-2 rounded cursor-pointer mr-2 transition-all duration-300 ${
            difficulty === "easy"
              ? "bg-accent text-white"
              : "bg-white dark:bg-accent text-textPrimary dark:text-white"
          }`}
        >
          Easy
        </button>
        <button
          onClick={() => setDifficulty("medium")}
          className={`px-4 py-2 rounded cursor-pointer mr-2 transition-all duration-300 ${
            difficulty === "medium"
              ? "bg-accent text-white"
              : "bg-white dark:bg-accent text-textPrimary dark:text-white"
          }`}
        >
          Medium
        </button>
        <button
          onClick={() => setDifficulty("hard")}
          className={`px-4 py-2 rounded cursor-pointer transition-all duration-300 ${
            difficulty === "hard"
              ? "bg-accent text-white"
              : "bg-white dark:bg-accent text-textPrimary dark:text-white"
          }`}
        >
          Hard
        </button>
      </div>

      {gameWon && (
        <div className="mt-6 mb-4 text-center">
          <h2 className="text-2xl font-bold text-green-600">You won! 🎉</h2>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-accent text-white rounded cursor-pointer hover:bg-orange-600 transition-all"
          >
            Play Again
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 w-full max-w-screen-xl">
        {cards.map((card, index) => (
          <button
            key={card.id}
            onClick={() => handleFlip(index)}
            style={
              !card.isFlipped && !card.isMatched
                ? {
                    backgroundColor: card.backgroundColor,
                    color: card.textColor,
                  }
                : undefined
            }
            className={`aspect-[3/2] w-full sm:w-[100px] md:w-[120px] lg:w-[140px] xl:w-[160px] rounded cursor-pointer text-sm sm:text-base md:text-lg lg:text-xl font-semibold flex items-center justify-center shadow transition-all duration-300 select-none border border-accent dark:border-white
            ${
              card.isMatched
                ? "bg-green-400 dark:bg-green-600 text-black dark:text-white cursor-default"
                : card.isFlipped
                ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
                : ""
            }`}
          >
            {!card.isFlipped && !card.isMatched ? (
              <span className="text-3xl text-black">?</span>
            ) : (
              card.content
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
