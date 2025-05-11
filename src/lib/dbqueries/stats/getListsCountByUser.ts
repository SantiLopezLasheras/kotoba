import { db } from "@/lib/db";
import { listas } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function getListCountByUser(userId: string) {
  const count = await db.select().from(listas).where(eq(listas.userId, userId));

  return count.length;
}
