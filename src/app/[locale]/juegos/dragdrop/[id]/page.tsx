import { getListaById } from "@/lib/dbqueries/getListaById";
import ClientDragDrop from "./ClientDragDrop";
import { getAllFlashcardsByListId } from "@/lib/dbqueries/getAllFlashcardsByListId";

const isCharacterBased = (language: string): boolean => {
  const langs = ["chino", "japonés", "coreano", "cantonés"];
  return langs.includes(language.toLowerCase());
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const flashcards = await getAllFlashcardsByListId(Number(id));
  const lista = await getListaById(Number(id));

  const idioma = lista.idioma.toLowerCase();
  const isCharBased = isCharacterBased(idioma);

  const frases = await Promise.all(
    flashcards.map(async (card, index) => {
      const sentence = card.fraseEjemplo || "No hay frase de ejemplo";
      const words = isCharBased ? sentence.split("") : sentence.split(" ");
      const meaning = "Traducción no disponible para este idioma";

      return {
        id: index,
        words,
        meaning,
      };
    })
  );

  return <ClientDragDrop flashcards={frases} />;
}
