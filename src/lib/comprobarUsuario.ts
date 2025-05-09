import { db } from "./db";
import { users } from "./schema";
import { eq } from "drizzle-orm";

export async function comprobarUsuarioEnBD(user: {
  id: string;
  email?: string;
}) {
  if (!user || !user.id) return;

  const usuarioExiste = await db.query.users.findFirst({
    where: eq(users.id, user.id),
  });

  if (!usuarioExiste) {
    await db.insert(users).values({
      id: user.id,
      email: user.email ?? "",
    });
  }
}
