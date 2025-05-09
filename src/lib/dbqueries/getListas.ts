import { db } from "../db";
import { listas } from "../schema";
import { eq, or } from "drizzle-orm";

type FilterOptions = {
  userId?: string;
  visibility: "all" | "mine" | "public";
};

export async function getListas({ userId, visibility }: FilterOptions) {
  if (visibility === "mine" && userId) {
    return db.select().from(listas).where(eq(listas.userId, userId));
  }

  if (visibility === "public") {
    return db.select().from(listas).where(eq(listas.public, true));
  }

  if (visibility === "all" && userId) {
    return db
      .select()
      .from(listas)
      .where(or(eq(listas.public, true), eq(listas.userId, userId)));
  }

  // fallback
  return db.select().from(listas).where(eq(listas.public, true));
}

// Versión sin filtrar, devuelve todas las listas
// import { db } from "../db";
// import { listas } from "../schema";

// export async function getListas() {
//   const listaRecords = await db.select().from(listas);
//   return listaRecords;
// }
