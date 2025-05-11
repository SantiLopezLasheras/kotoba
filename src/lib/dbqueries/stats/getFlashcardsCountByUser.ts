import { db } from "@/lib/db";
import { listas, flashcards } from "@/lib/schema";
import { eq, inArray } from "drizzle-orm";

export async function getFlashcardCountByUser(userId: string) {
  const userListIds = await db
    .select({ id: listas.id })
    .from(listas)
    .where(eq(listas.userId, userId));

  if (userListIds.length === 0) return 0;

  const count = await db
    .select()
    .from(flashcards)
    .where(
      inArray(
        flashcards.listaId,
        userListIds.map((l) => l.id)
      )
    );

  return count.length;
}
