import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { sql } from "drizzle-orm";

export async function getTotalUsers() {
  const result = await db.select({ count: sql<number>`count(*)` }).from(users);

  return result[0]?.count ?? 0;
}
