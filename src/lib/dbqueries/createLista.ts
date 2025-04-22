import { db } from "../db";
import { listas } from "../schema";
import { InferInsertModel } from "drizzle-orm";

type NewLista = InferInsertModel<typeof listas>;

export async function createLista(data: NewLista) {
  const inserted = await db.insert(listas).values(data).returning();
  console.log("Inserted lista:", inserted[0]);
  return inserted[0];
}
