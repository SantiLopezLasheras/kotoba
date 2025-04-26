import { db } from "../db";
import { userFavorites } from "../schema";
import { InferInsertModel } from "drizzle-orm";

type NewFavorite = InferInsertModel<typeof userFavorites>;

export async function addFavorite(data: NewFavorite) {
  try {
    const inserted = await db.insert(userFavorites).values(data).returning();
    return inserted[0];
  } catch (error) {
    console.error("Error al añadir a favoritos:", error);
    throw new Error("Error al añadir a favoritos.");
  }
}
