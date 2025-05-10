import { db } from "../db";
import { flashcards } from "../schema";
import { eq } from "drizzle-orm";

export async function getAllFlashcardsByListId(listaId: number) {
  const flashcardsList = await db
    .select()
    .from(flashcards)
    .where(eq(flashcards.listaId, listaId))
    .orderBy(flashcards.createdAt);

  return flashcardsList;
}
