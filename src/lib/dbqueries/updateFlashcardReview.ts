import { db } from "../db";
import { flashcards } from "../schema";
import { eq } from "drizzle-orm";
import { calculateNextReviewDate } from "@/utils/calculateNextReviewDate";

export async function updateFlashcardReview(
  flashcardId: number,
  currentFrequency: number,
  difficulty: "easy" | "hard" | "forgot"
) {
  let newFrequency = currentFrequency;

  if (difficulty === "easy") newFrequency += 2;
  else if (difficulty === "hard") newFrequency += 1;
  else newFrequency = 0;

  const nextReviewAt = calculateNextReviewDate(newFrequency);
  const lastReviewedAt = new Date();

  await db
    .update(flashcards)
    .set({
      reviewFrequency: newFrequency,
      nextReviewAt,
      lastReviewedAt,
    })
    .where(eq(flashcards.id, flashcardId));
}
