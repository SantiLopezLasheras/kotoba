"use server";

import { deleteFavorite } from "@/lib/dbqueries/deleteFavorite";

export async function unfavoriteCard(userId: string, flashcardId: number) {
  await deleteFavorite(userId, flashcardId);
}
