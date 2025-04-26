import { db } from "../db";
import { userFavorites } from "../schema";
import { and, eq } from "drizzle-orm";

export async function comprobarFavoritos(userId: string, flashcardId: number) {
  try {
    const result = await db
      .select()
      .from(userFavorites)
      .where(
        and(
          eq(userFavorites.userId, userId),
          eq(userFavorites.flashcardId, flashcardId)
        )
      )
      .limit(1);

    if (result.length > 0) {
      return true; // La tarjeta está marcada como favorita
    }
    return false;
  } catch (error) {
    console.error("Error al comprobar los favoritos:", error);
    throw new Error("Error al comprobar los favoritos.");
  }
}
