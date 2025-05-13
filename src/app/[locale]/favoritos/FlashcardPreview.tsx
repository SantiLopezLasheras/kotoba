import Image from "next/image";
import { Flashcard } from "@/lib/definitions";

interface FlashcardPreviewProps {
  flashcard: Flashcard | null;
}

export function FlashcardPreview({ flashcard }: FlashcardPreviewProps) {
  if (!flashcard) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-500 text-center p-6">
        <Image
          src="/images/empty.svg"
          alt="No flashcard selected"
          width={200}
          height={200}
          className="mb-4 opacity-60"
        />
        <p>Selecciona una palabra para ver los detalles.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-sm min-h-[320px] rounded-xl border border-[var(--color-accent)] shadow-md p-4 hover:shadow-lg transition duration-300 text-[var(--color-textPrimary)] bg-gradient-to-br from-[var(--color-bgSecondary)] via-[var(--color-blue)]/10 to-[var(--color-pink)]/20 dark:bg-[var(--color-bgPrimary)] dark:text-[var(--color-textPrimary)]">
      <div className="flex flex-col justify-between h-full">
        <h3 className="text-2xl font-bold mb-2 text-center text-[var(--color-accent)]">
          {flashcard.palabra.toUpperCase()}
        </h3>

        {flashcard.categoriaGramatical && (
          <p className="text-sm italic text-right text-gray-500 dark:text-gray-400 mb-0.5">
            {flashcard.categoriaGramatical}
          </p>
        )}

        {flashcard.pronunciacion && (
          <p className="text-sm italic text-right text-gray-500 dark:text-gray-400 mb-2">
            /{flashcard.pronunciacion}/
          </p>
        )}

        <hr className="w-[90%] border-t-2 border-[var(--color-accent)] mx-auto my-4" />

        <p className="text-lg font-semibold text-left mb-4 leading-snug">
          {flashcard.traduccion}
        </p>

        {flashcard.fraseEjemplo && (
          <p className="text-sm italic text-left mb-2 text-[var(--color-textSecondary)]">
            {flashcard.fraseEjemplo}
          </p>
        )}

        {flashcard.notas && (
          <p className="text-sm text-left mt-2 text-[var(--color-textSecondary)]">
            <span className="font-semibold">Notas:</span> {flashcard.notas}
          </p>
        )}
      </div>
    </div>
  );
}
