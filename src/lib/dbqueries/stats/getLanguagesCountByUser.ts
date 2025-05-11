import { db } from "@/lib/db";
import { listas } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function getLanguagesCountByUser(userId: string) {
  const idiomas = await db
    .selectDistinct({ idioma: listas.idioma })
    .from(listas)
    .where(eq(listas.userId, userId));

  return idiomas.length;
}
