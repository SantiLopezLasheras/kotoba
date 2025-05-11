import { db } from "@/lib/db";
import { flashcards } from "@/lib/schema";
import { sql } from "drizzle-orm";

export async function getTotalFlashcards() {
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(flashcards);

  return result[0]?.count ?? 0;
}
