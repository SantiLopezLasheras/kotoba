import { X } from "lucide-react";
import { AudioButton } from "@/app/components/AudioButton";

type VocabWord = {
  translation: string;
  pronunciation?: string;
  exampleSentence?: string;
  notes?: string;
  categoriaGramatical?: string;
};

interface FlashcardProps {
  wordKey: string;
  wordData: VocabWord;
  onClose: () => void;
}

export function Flashcard({ wordKey, wordData, onClose }: FlashcardProps) {
  return (
    <div className="relative w-[420px] min-h-[320px] rounded border border-[var(--color-blue)]/20 shadow-md p-4 bg-gradient-to-br from-[var(--color-bgSecondary)] via-[var(--color-blue)]/20 to-[var(--color-pink)]/30 dark:bg-[var(--color-bgPrimary)] dark:text-[var(--color-textPrimary)] text-[var(--color-textPrimary)]">
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-3 right-3 text-[var(--color-textPrimary)] hover:text-[var(--color-accent)] cursor-pointer"
      >
        <X size={24} />
      </button>

      <div className="flex flex-col justify-between h-full">
        <h3 className="text-2xl font-bold mb-4 text-center text-[var(--color-accent)]">
          {wordKey.toUpperCase()}
        </h3>

        {wordData.categoriaGramatical && (
          <p className="text-sm italic text-right mb-4">
            {wordData.categoriaGramatical}
          </p>
        )}

        {wordData.pronunciation && (
          <p className="text-sm italic text-right mb-4">
            /{wordData.pronunciation}/
          </p>
        )}

        <hr className="w-[90%] border-t-2 border-[var(--color-accent)] mx-auto mt-2 mb-4" />

        <div className="mb-4 space-y-1">
          <p className="text-lg font-bold text-left">{wordData.translation}</p>
        </div>

        {wordData.exampleSentence && (
          <div className="flex items-center gap-2 mb-4">
            <AudioButton
              exampleToSpeak={wordData.exampleSentence}
              language="en-US"
            />
            <p className="text-sm italic text-left">
              {wordData.exampleSentence}
            </p>
          </div>
        )}

        {wordData.notes && (
          <p className="text-sm text-left mt-2">
            <span className="font-semibold">Notes:</span> {wordData.notes}
          </p>
        )}
      </div>
    </div>
  );
}
