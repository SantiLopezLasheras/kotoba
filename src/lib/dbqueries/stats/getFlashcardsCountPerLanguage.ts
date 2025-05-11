import { db } from "@/lib/db";
import { listas, flashcards } from "@/lib/schema";
import { eq, count } from "drizzle-orm";

export async function getFlashcardCountPerLanguage(userId: string) {
  const result = await db
    .select({
      idioma: listas.idioma,
      count: count(flashcards.id),
    })
    .from(flashcards)
    .innerJoin(listas, eq(flashcards.listaId, listas.id))
    .where(eq(listas.userId, userId))
    .groupBy(listas.idioma);

  return result;
}
