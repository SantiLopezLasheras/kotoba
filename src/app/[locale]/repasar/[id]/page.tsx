import { getFlashcardsByListId } from "@/lib/dbqueries/getFlashcards";
import { notFound } from "next/navigation";
import { FlashcardReview } from "./FlashcardReview";
import Link from "next/link";
import Image from "next/image";

interface RepasarMazoProps {
  params: { id: string };
}

export default async function RepasarMazo({ params }: RepasarMazoProps) {
  const { id } = params;

  const listaId = parseInt(id, 10);

  const flashcards = await getFlashcardsByListId(listaId);

  if (!flashcards) {
    return notFound();
  }

  const isEmpty = flashcards.length === 0;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto p-4 mb-6">
        <div className="px-8 py-5">
          <h1 className="text-center text-3xl text-[var(--color-textPrimary)] dark:text-white">
            Repasar Mazo {id}
          </h1>
        </div>

        {isEmpty ? (
          <div className="text-center mt-10">
            <Image
              src="/images/empty.svg"
              alt="Lista vacía"
              width={300}
              height={300}
              className="mx-auto mb-6"
            />
            <p className="text-xl text-gray-500 mb-4">
              La lista está vacía. Añade tarjetas para comenzar.
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <Link
                href={`/listas/${id}`}
                className="bg-[var(--color-blue)] text-white py-2 px-4 rounded hover:bg-[var(--color-blue)]/80 transition"
              >
                Ir a la lista
              </Link>
            </div>
          </div>
        ) : (
          <FlashcardReview flashcards={flashcards} listaId={listaId} />
        )}
      </main>
    </div>
  );
}
