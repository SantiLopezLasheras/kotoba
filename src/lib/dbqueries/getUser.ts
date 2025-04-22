import { db } from "../db";
import { users } from "../schema";
import { eq } from "drizzle-orm";

export async function getUserByEmail(email: string) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
    .execute();

  return user[0];
}
