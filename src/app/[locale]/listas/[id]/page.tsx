import { getFlashcardsByListId } from "@/lib/dbqueries/getFlashcards";
import { getListaById } from "@/lib/dbqueries/getListaById";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CreateFlashcardButton } from "./CreateFlashcardButton";
import { FlashcardDetail } from "./FlashcardDetail";
import { ArrowLeft } from "lucide-react";

interface TarjetasProps {
  params: Promise<{ id: string }>;
}

export default async function Tarjetas({ params }: TarjetasProps) {
  const { id } = await params;

  const listaId = parseInt(id, 10);

  const flashcards = await getFlashcardsByListId(listaId);

  if (!flashcards || flashcards.length === 0) {
    return notFound();
  }

  const listaData = await getListaById(listaId);

  const listaNombre = listaData?.nombre || `Lista nº ${listaId}`;

  return (
    <>
      <div className="flex justify-between items-center px-8 py-5">
        <h1 className="text-center text-3xl text-[var(--color-textPrimary)] dark:text-white">
          Tarjetas
        </h1>
        <div className="flex gap-4 items-center">
          <Link
            href={`/listas`}
            className="bg-[var(--color-blue)] text-white py-2 px-6 rounded hover:bg-[var(--color-blue)]/80 transition duration-300 flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver
          </Link>
          <CreateFlashcardButton listaId={listaId} />
        </div>
      </div>

      <h2 className="text-center text-xl text-[var(--color-textPrimary)] dark:text-gray-300 mb-4">
        {listaNombre || "Cargando nombre del mazo..."}
      </h2>

      <div
        id="card-list"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-8"
      >
        {flashcards.length > 0 ? (
          flashcards.map((tarjeta) => (
            <div key={tarjeta.id}>
              {/* TarjetaDetail now handles each individual flashcard display */}
              <FlashcardDetail flashcard={tarjeta} />

              {/* Edit Button */}
              <div className="flex justify-between gap-2 mt-4"></div>
            </div>
          ))
        ) : (
          <p>No flashcards available.</p>
        )}
      </div>
    </>
  );
}
