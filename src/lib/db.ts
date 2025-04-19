import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { schema } from "./schema";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

// logger
const db = drizzle(sql, {
  schema,
  logger: process.env.NODE_ENV !== "production",
});
// const db = drizzle(sql);

export { db };
