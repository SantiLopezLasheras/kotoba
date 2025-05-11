import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { sql } from "drizzle-orm";

export async function getLastUserJoined() {
  const result = await db
    .select({ lastJoined: sql<Date>`max(${users.createdAt})` })
    .from(users);

  return result[0]?.lastJoined ?? null;
}
