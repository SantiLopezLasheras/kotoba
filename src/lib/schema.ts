import {
  pgTable,
  serial,
  varchar,
  timestamp,
  text,
  integer,
  primaryKey,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  email: varchar("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  role: varchar("role").default("user"),
  name: varchar("name").default(""),
});

export const listas = pgTable("listas", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  nombre: varchar("nombre").notNull(),
  idioma: varchar("idioma").notNull(),
  nivel: varchar("nivel").notNull(),
  public: boolean("public").default(false).notNull(),
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
  lastReviewedAt: timestamp("last_reviewed_at"),
  nextReviewAt: timestamp("next_review_at"),
  reviewFrequency: integer("review_frequency").notNull().default(0),
});

export const userFavorites = pgTable(
  "user_favorites",
  {
    userId: varchar("user_id")
      .notNull()
      .references(() => users.id),
    flashcardId: integer("flashcard_id")
      .notNull()
      .references(() => flashcards.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    primaryKey: primaryKey(table.userId, table.flashcardId),
  })
);

// Relaciones entre tablas
export const usersRelations = relations(users, ({ many }) => ({
  listas: many(listas),
  favorites: many(userFavorites),
}));

export const listasRelations = relations(listas, ({ one, many }) => ({
  user: one(users, {
    fields: [listas.userId],
    references: [users.id],
  }),
  flashcards: many(flashcards),
}));

export const flashcardsRelations = relations(flashcards, ({ one }) => ({
  lista: one(listas, {
    fields: [flashcards.listaId],
    references: [listas.id],
  }),
}));

export const userFavoritesRelations = relations(userFavorites, ({ one }) => ({
  user: one(users, {
    fields: [userFavorites.userId],
    references: [users.id],
  }),
  flashcard: one(flashcards, {
    fields: [userFavorites.flashcardId],
    references: [flashcards.id],
  }),
}));

export const schema = {
  users: users,
  listas: listas,
  flashcards: flashcards,
  userFavorites: userFavorites,
};
