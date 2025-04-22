import { db } from "../db";
import { listas } from "../schema";
import { eq } from "drizzle-orm";

export async function deleteLista(id: number) {
  try {
    const resultado = await db.delete(listas).where(eq(listas.id, id));
    return resultado;
  } catch (error) {
    console.error("Error al borrar la lista:", error);
    throw new Error("No se ha podido borrar la lista.");
  }
}
