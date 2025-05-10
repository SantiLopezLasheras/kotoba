import { db } from "../db";
import { flashcards } from "../schema";
import { eq, lte, isNull, or, and } from "drizzle-orm";

export async function getFlashcardsByListId(listaId: number) {
  const now = new Date();

  const flashcardsList = await db
    .select()
    .from(flashcards)
    .where(
      and(
        eq(flashcards.listaId, listaId),
        or(isNull(flashcards.nextReviewAt), lte(flashcards.nextReviewAt, now))
      )
    )
    .orderBy(flashcards.nextReviewAt); // prioriza las tarjetas que deben ser revisadas primero

  return flashcardsList.map((flashcard) => ({
    ...flashcard,
    reviewFrequency: flashcard.reviewFrequency ?? 0,
  }));
}
