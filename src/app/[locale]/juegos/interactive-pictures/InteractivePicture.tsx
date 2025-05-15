"use client";

import { Flashcard } from "./Flashcard";
import { useEffect, useState } from "react";

type VocabWord = {
  translation: string;
  pronunciation?: string;
  exampleSentence?: string;
  notes?: string;
  categoriaGramatical?: string;
};

type Vocab = Record<string, VocabWord>;

export default function InteractivePicture({
  initialTheme,
}: {
  initialTheme: string;
}) {
  const [vocab, setVocab] = useState<Vocab>({});
  const [svgContent, setSvgContent] = useState("");
  const [selectedWord, setSelectedWord] = useState<{
    id: string;
    word: VocabWord;
  } | null>(null);

  useEffect(() => {
    fetch(`/images/vocab/${initialTheme}.json`)
      .then((res) => res.json())
      .then((data: Vocab) => {
        setVocab(data);
        return fetch(`/svgs/${initialTheme}.svg`);
      })
      .then((res) => res.text())
      .then(setSvgContent)
      .catch((err) => {
        console.error(err);
        setSvgContent(
          `<p class="text-red-500">Error loading theme "${initialTheme}"</p>`
        );
      });
  }, [initialTheme]);

  useEffect(() => {
    if (!svgContent) return;
    const container = document.getElementById("interactive-area");
    if (!container) return;

    container.innerHTML = svgContent;

    Object.keys(vocab).forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.style.cursor = "pointer";
        el.onclick = () => setSelectedWord({ id, word: vocab[id] });
      }
    });
  }, [svgContent, vocab]);

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">{initialTheme.toUpperCase()}</h1>

      <div
        id="interactive-area"
        className="[&_svg]:mx-auto [&_svg]:w-72 [&_svg]:h-auto mt-6"
      ></div>

      {selectedWord && (
        <>
          <div
            className="fixed inset-0  z-40"
            onClick={() => setSelectedWord(null)}
          />
          <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Flashcard
              wordKey={selectedWord.id}
              wordData={selectedWord.word}
              onClose={() => setSelectedWord(null)}
            />
          </div>
        </>
      )}
    </>
  );
}
