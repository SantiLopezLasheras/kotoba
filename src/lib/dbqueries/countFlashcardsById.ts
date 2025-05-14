import { sql } from "drizzle-orm";
import { db } from "../db";
import { flashcards } from "../schema";
import { eq } from "drizzle-orm";

export async function countFlashcardsByListId(listaId: number) {
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(flashcards)
    .where(eq(flashcards.listaId, listaId));

  return result[0]?.count || 0;
}
