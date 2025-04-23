import { db } from "../db";
import { flashcards } from "../schema";
import { eq } from "drizzle-orm";

export async function updateFlashcard(
  id: number,
  data: Partial<{
    palabra: string;
    traduccion: string;
    fraseEjemplo: string;
    categoriaGramatical: string;
    notas: string;
    pronunciacion: string;
    audio: string;
    image: string;
    listaId: number;
  }>
) {
  const updated = await db
    .update(flashcards)
    .set(data)
    .where(eq(flashcards.id, id))
    .returning();

  console.log("Flashcard actualizada:", updated[0]);
  return updated[0];
}
