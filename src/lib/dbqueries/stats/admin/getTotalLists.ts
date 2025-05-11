import { db } from "@/lib/db";
import { listas } from "@/lib/schema";
import { sql } from "drizzle-orm";

export async function getTotalLists() {
  const result = await db.select({ count: sql<number>`count(*)` }).from(listas);

  return result[0]?.count ?? 0;
}
