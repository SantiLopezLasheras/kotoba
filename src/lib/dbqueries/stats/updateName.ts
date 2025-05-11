"use server";

import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function updateUserName(name: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.email) {
    throw new Error("Usuario no autenticado");
  }

  await db.update(users).set({ name }).where(eq(users.email, user.email));
}
