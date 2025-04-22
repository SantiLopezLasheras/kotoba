export type User = {
  id: string;
  email: string;
  createdAt: string;
  role: string;
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
  fraseEjemplo?: string;
  categoriaGramatical?: string;
  notas?: string;
  pronunciacion?: string;
  createdAt: string;
  updatedAt: string;
  listaId: number;
  audio?: string;
  image?: string;
};
