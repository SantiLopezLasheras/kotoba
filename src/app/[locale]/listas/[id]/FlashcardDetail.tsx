import { Flashcard } from "@/lib/definitions";
import { DeleteFlashcardButton } from "./DeleteFlashcardButton";
import { EditFlashcardButton } from "./EditFlashcardButton";
import { HeartButton } from "./HeartButton";
import { AudioButton } from "../../../components/AudioButton";

type Props = {
  flashcard: Flashcard;
  language?: string;
};

export const FlashcardDetail: React.FC<Props> = ({ flashcard, language }) => {
  return (
    <div className="relative w-full max-w-sm min-h-[320px] rounded border border-[var(--color-blue)]/20 shadow-md p-4 hover:shadow-lg transition duration-300 text-[var(--color-textPrimary)] bg-gradient-to-br from-[var(--color-bgSecondary)] via-[var(--color-blue)]/20 to-[var(--color-pink)]/30 dark:bg-[var(--color-bgPrimary)] dark:text-[var(--color-textPrimary)]">
      <div className="flex flex-col justify-between h-full">
        <h3 className="text-2xl font-bold mb-4 text-center text-[var(--color-accent)]">
          {flashcard.palabra.toUpperCase()}
        </h3>

        {flashcard.categoriaGramatical && (
          <p className="text-sm italic text-right mb-1">
            {flashcard.categoriaGramatical}
          </p>
        )}

        {flashcard.pronunciacion && (
          <p className="text-sm italic text-right mb-2">
            /{flashcard.pronunciacion}/
          </p>
        )}

        <hr className="w-[90%] border-t-2 border-[var(--color-accent)] mx-auto mt-2 mb-4" />

        <p className="text-lg font-bold text-left mb-4">
          {flashcard.traduccion}
        </p>

        {flashcard.fraseEjemplo && (
          <p className="text-sm italic text-left mb-2">
            {flashcard.fraseEjemplo}
          </p>
        )}

        {flashcard.notas && (
          <p className="text-sm text-left mt-2">
            <span className="font-semibold">Notas:</span> {flashcard.notas}
          </p>
        )}
      </div>

      {/* Botones */}
      <div className="absolute bottom-3 right-4 flex gap-3">
        <AudioButton
          textToSpeak={flashcard.palabra}
          exampleToSpeak={flashcard.fraseEjemplo}
          language={language}
        />
        <HeartButton flashcardId={flashcard.id} />
        <EditFlashcardButton
          flashcard={{
            ...flashcard,
            fraseEjemplo: flashcard.fraseEjemplo ?? null,
            categoriaGramatical: flashcard.categoriaGramatical ?? null,
            notas: flashcard.notas ?? null,
            pronunciacion: flashcard.pronunciacion ?? null,
            image: flashcard.image ?? null,
          }}
        />
        <DeleteFlashcardButton id={flashcard.id} />
      </div>
    </div>
  );
};
