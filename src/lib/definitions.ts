export type User = {
  id: string;
  email: string;
  createdAt: string;
  role: string;
  name?: string | null;
};

export type Lista = {
  id: number;
  userId: string;
  nombre: string;
  idioma: string;
  nivel: string;
  createdAt: string;
  updatedAt: string;
};

export type Flashcard = {
  id: number;
  palabra: string;
  traduccion: string;
  fraseEjemplo?: string | null;
  categoriaGramatical?: string | null;
  notas?: string | null;
  pronunciacion?: string | null;
  createdAt: Date;
  updatedAt: Date;
  listaId: number;
  image?: string | null;
  lastReviewedAt?: Date | null;
  nextReviewAt?: Date | null;
  reviewFrequency: number;
};
