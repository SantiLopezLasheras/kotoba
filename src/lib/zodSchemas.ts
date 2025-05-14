import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  createdAt: z.string(),
  role: z.string().default("user"),
  name: z.string().default(""),
});

export type UserInput = z.infer<typeof userSchema>;

export const listaSchema = z.object({
  id: z.number(),
  userId: z.string(),
  nombre: z.string(),
  idioma: z.string(),
  nivel: z.string(),
  public: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const newListaSchema = listaSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export type Lista = z.infer<typeof listaSchema>;

export type NewListaInput = z.infer<typeof newListaSchema>;

export const updateListaSchema = z.object({
  id: z.number().min(1, "ID es requerido y debe ser un número válido"),
  nombre: z.string().optional(),
  idioma: z.string().optional(),
  nivel: z.string().optional(),
});

export const flashcardSchema = z.object({
  id: z.number(),
  palabra: z.string(),
  traduccion: z.string(),
  fraseEjemplo: z.string().nullable().optional(),
  categoriaGramatical: z.string().nullable().optional(),
  notas: z.string().nullable().optional(),
  pronunciacion: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  listaId: z.number(),
  image: z.string().nullable().optional(),
  lastReviewedAt: z.coerce.date().nullable().optional(),
  nextReviewAt: z.coerce.date().nullable().optional(),
  reviewFrequency: z.number().default(0),
});

export type FlashcardInput = z.infer<typeof flashcardSchema>;
