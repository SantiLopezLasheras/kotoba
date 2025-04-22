import { db } from "../db";
import { flashcards } from "../schema";
import { eq } from "drizzle-orm";

export async function getFlashcardsByListId(listaId: number) {
  const flashcardsList = await db
    .select()
    .from(flashcards)
    .where(eq(flashcards.listaId, listaId));
  return flashcardsList;
}
