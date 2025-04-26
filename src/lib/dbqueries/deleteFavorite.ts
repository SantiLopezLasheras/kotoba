import { db } from "../db";
import { userFavorites } from "../schema";
import { and, eq } from "drizzle-orm";

export async function deleteFavorite(userId: string, flashcardId: number) {
  try {
    const result = await db
      .delete(userFavorites)
      .where(
        and(
          eq(userFavorites.userId, userId),
          eq(userFavorites.flashcardId, flashcardId)
        )
      )
      .returning();

    if (result.length === 0) {
      throw new Error("No se ha encontrado el favorito en la lista.");
    }

    return result[0];
  } catch (error) {
    console.error("Error al eliminar de favoritos:", error);
    throw new Error("Error al eliminar de favoritos.");
  }
}
