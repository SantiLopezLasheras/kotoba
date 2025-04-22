import { db } from "../db";
import { listas } from "../schema";

export async function getListas() {
  const listaRecords = await db.select().from(listas);
  return listaRecords;
}
