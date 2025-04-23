import { db } from "../db";
import { flashcards } from "../schema";
import { eq } from "drizzle-orm";

export async function getFlashcardById(id: number) {
  const flashcard = await db
    .select()
    .from(flashcards)
    .where(eq(flashcards.id, id));

  return flashcard[0];
}
