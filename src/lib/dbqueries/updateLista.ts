import { db } from "../db";
import { listas } from "../schema";
import { eq } from "drizzle-orm";

export async function updateLista(
  id: number,
  data: Partial<{
    nombre: string;
    idioma: string;
    nivel: string;
  }>
) {
  const updated = await db
    .update(listas)
    .set(data)
    .where(eq(listas.id, id))
    .returning();

  console.log("Lista actualizada:", updated[0]);
  return updated[0];
}
