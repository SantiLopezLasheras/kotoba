import { db } from "../db";
import { flashcards } from "../schema";
import { eq } from "drizzle-orm";

export async function deleteFlashcard(id: number) {
  try {
    const result = await db.delete(flashcards).where(eq(flashcards.id, id));
    return result;
  } catch (error) {
    console.error("Error al borrar la flashcard:", error);
    throw new Error("No se ha podido borrar la flashcard.");
  }
}
