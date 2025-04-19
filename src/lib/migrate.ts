import { db } from "./db";
import { migrate } from "drizzle-orm/neon-http/migrator";

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: "src/lib/migrations" });
    console.log("Las migraciones se ejecutaron correctamente.");
  } catch (error) {
    console.error("Error durante la migración: ", error);
    process.exit(1);
  }
};

main();
