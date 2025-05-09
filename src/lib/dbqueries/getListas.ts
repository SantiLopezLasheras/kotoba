import { db } from "../db";
import { listas } from "../schema";
import { eq, or } from "drizzle-orm";

export async function getListas(userId: string | undefined) {
  const listaRecords = await db
    .select()
    .from(listas)
    .where(
      or(
        eq(listas.public, true),
        userId ? eq(listas.userId, userId) : eq(listas.public, true)
      )
    );

  return listaRecords;
}

// Versión sin filtrar, devuelve todas las listas
// import { db } from "../db";
// import { listas } from "../schema";

// export async function getListas() {
//   const listaRecords = await db.select().from(listas);
//   return listaRecords;
// }
