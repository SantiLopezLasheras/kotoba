import { db } from "@/lib/db";
import { listas } from "@/lib/schema";
import { eq, count } from "drizzle-orm";

export async function getListCountPerLanguage(userId: string) {
  const result = await db
    .select({
      idioma: listas.idioma,
      count: count(listas.id),
    })
    .from(listas)
    .where(eq(listas.userId, userId))
    .groupBy(listas.idioma);

  return result;
}
