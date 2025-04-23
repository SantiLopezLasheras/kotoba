import {
  pgTable,
  serial,
  varchar,
  timestamp,
  text,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  email: varchar("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  role: varchar("role").default("user"),
});

export const listas = pgTable("listas", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  nombre: varchar("nombre").notNull(),
  idioma: varchar("idioma").notNull(),
  nivel: varchar("nivel").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const flashcards = pgTable("flashcards", {
  id: serial("id").primaryKey(),
  palabra: varchar("palabra").notNull(),
  traduccion: varchar("traduccion").notNull(),
  fraseEjemplo: text("frase_ejemplo"),
  categoriaGramatical: varchar("categoria_gramatical"),
  notas: text("notas"),
  pronunciacion: varchar("pronunciacion"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  listaId: integer("lista_id")
    .notNull()
    .references(() => listas.id),
  image: varchar("image"),
});

// Relaciones entre tablas
export const usersRelations = relations(users, ({ many }) => ({
  listas: many(listas), // un usuario puede tener muchas listas
}));

export const listasRelations = relations(listas, ({ one, many }) => ({
  user: one(users, {
    fields: [listas.userId],
    references: [users.id], // una lista pertenece a un usuario
  }),
  flashcards: many(flashcards), // una lista puede tener muchas tarjetas
}));

export const flashcardsRelations = relations(flashcards, ({ one }) => ({
  lista: one(listas, {
    fields: [flashcards.listaId],
    references: [listas.id], // una tarjeta pertenece a una lista
  }),
}));

export const schema = {
  users: users,
  listas: listas,
  flashcards: flashcards,
};
