import { db } from "../db";
import { listas } from "../schema";
import { eq } from "drizzle-orm";

export async function getListaById(id: number) {
  const lista = await db.select().from(listas).where(eq(listas.id, id));
  return lista[0];
}
