import { db } from "../db";
import { flashcards } from "../schema";
import { InferInsertModel } from "drizzle-orm";

type NewFlashcard = InferInsertModel<typeof flashcards>;

export async function createFlashcard(data: NewFlashcard) {
  const inserted = await db.insert(flashcards).values(data).returning();
  console.log("Flashcard añadida:", inserted[0]);
  return inserted[0];
}
