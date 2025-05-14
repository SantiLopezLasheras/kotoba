import { db } from "@/lib/db";
import { listas } from "@/lib/schema";
import { sql } from "drizzle-orm";

export async function getListsPerLanguage() {
  const result = await db
    .select({
      idioma: listas.idioma,
      count: sql<number>`count(*)`,
    })
    .from(listas)
    .groupBy(listas.idioma);

  return result;
}
