import { db } from "@/lib/db";
import { listas, flashcards } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";

export async function getFlashcardsPerLanguage() {
  const result = await db
    .select({
      idioma: listas.idioma,
      count: sql<number>`count(*)`,
    })
    .from(flashcards)
    .leftJoin(listas, eq(flashcards.listaId, listas.id))
    .groupBy(listas.idioma);

  return result;
}
