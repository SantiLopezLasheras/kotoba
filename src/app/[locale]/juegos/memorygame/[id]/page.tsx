import { getListaById } from "@/lib/dbqueries/getListaById";
import { getAllFlashcardsByListId } from "@/lib/dbqueries/getAllFlashcardsByListId";
import ClientMemoryGame from "./ClientMemoryGame";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const flashcards = await getAllFlashcardsByListId(Number(id));
  const lista = await getListaById(Number(id));

  // creación de parejas para el juego
  const parejas = flashcards.map((card, index) => ({
    id: index,
    word: card.palabra || `Palabra ${index + 1}`,
    translation: card.traduccion || `Traducción ${index + 1}`,
  }));

  return (
    <ClientMemoryGame pairs={parejas} title={lista.nombre || "Memory Game"} />
  );
}
