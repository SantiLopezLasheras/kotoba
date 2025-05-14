import { db } from "../db";
import { flashcards } from "../schema";
import { eq } from "drizzle-orm";

export async function getAllFlashcardsByListId(
  listaId: number,
  offset: number = 0,
  limit: number = 12
) {
  const flashcardsList = await db
    .select()
    .from(flashcards)
    .where(eq(flashcards.listaId, listaId))
    .orderBy(flashcards.createdAt)
    .offset(offset)
    .limit(limit);

  return flashcardsList;
}
