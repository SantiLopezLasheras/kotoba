import { Flashcard } from "@/lib/definitions";
import Image from "next/image";
import { motion } from "framer-motion";
import { AudioButton } from "../../../components/AudioButton";

interface FlashcardBackProps {
  flashcard: Flashcard;
  mostrar: boolean;
  idioma: string;
}

export function FlashcardBack({
  flashcard,
  mostrar,
  idioma,
}: FlashcardBackProps) {
  return (
    <div className="w-full sm:w-[500px] h-72 bg-white text-gray-800 rounded-lg shadow-lg relative overflow-hidden">
      <motion.div
        key={mostrar ? "back" : "front"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 p-6 flex flex-col items-center justify-center"
      >
        {mostrar ? (
          <>
            <h2 className="text-center text-2xl sm:text-3xl font-bold mb-3">
              {flashcard.traduccion}
            </h2>
            <p className="font-semibold text-sm italic text-right w-full">
              {flashcard.categoriaGramatical}
            </p>
            {flashcard.pronunciacion && (
              <p className="text-right text-sm italic w-full">
                /{flashcard.pronunciacion}/
              </p>
            )}
            <hr className="my-4 border-gray-300 w-full" />
            {flashcard.fraseEjemplo && (
              <div className="flex items-center justify-center gap-2 mt-2">
                <AudioButton
                  exampleToSpeak={flashcard.fraseEjemplo}
                  language={idioma}
                />
                <p className="italic text-center">{flashcard.fraseEjemplo}</p>
              </div>
            )}
          </>
        ) : (
          <Image
            width={200}
            height={200}
            src="/images/interrogation.webp"
            alt="interrogantes"
            className="rounded-md"
          />
        )}
      </motion.div>
    </div>
  );
}
