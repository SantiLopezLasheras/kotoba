import { db } from "../db";
import { flashcards, userFavorites } from "../schema";
import { eq } from "drizzle-orm";

export async function getFavoriteFlashcardsByUserId(userId: string) {
  const results = await db
    .select({
      id: flashcards.id,
      palabra: flashcards.palabra,
      traduccion: flashcards.traduccion,
      fraseEjemplo: flashcards.fraseEjemplo,
      categoriaGramatical: flashcards.categoriaGramatical,
      notas: flashcards.notas,
      pronunciacion: flashcards.pronunciacion,
      createdAt: flashcards.createdAt,
      updatedAt: flashcards.updatedAt,
      listaId: flashcards.listaId,
      image: flashcards.image,
      reviewFrequency: flashcards.reviewFrequency,
      lastReviewedAt: flashcards.lastReviewedAt,
      nextReviewAt: flashcards.nextReviewAt,
    })
    .from(userFavorites)
    .innerJoin(flashcards, eq(userFavorites.flashcardId, flashcards.id))
    .where(eq(userFavorites.userId, userId));

  return results;
}
