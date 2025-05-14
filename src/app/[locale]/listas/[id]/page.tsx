import { getAllFlashcardsByListId } from "@/lib/dbqueries/getAllFlashcardsByListId";
import { getListaById } from "@/lib/dbqueries/getListaById";
import { countFlashcardsByListId } from "@/lib/dbqueries/countFlashcardsById";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CreateFlashcardButton } from "./CreateFlashcardButton";
import { FlashcardDetail } from "./FlashcardDetail";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

interface TarjetasProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function Tarjetas({
  params,
  searchParams,
}: TarjetasProps) {
  const { id } = await params;
  const listaId = parseInt(id, 10);

  // espera a recuperar los params y si no el default es 1
  const { page = "1" } = await searchParams;
  const currentPage = Math.max(parseInt(page, 10), 1);
  const perPage = 12;
  const offset = (currentPage - 1) * perPage;

  try {
    const flashcards = await getAllFlashcardsByListId(listaId, offset, perPage);
    const totalCount = await countFlashcardsByListId(listaId);
    const totalPages = Math.ceil(totalCount / perPage);

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
              Volver a listas
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
                <FlashcardDetail
                  flashcard={tarjeta}
                  language={listaData.idioma}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              <p className="text-xl mb-4">
                La lista está vacía. Añade tarjetas para empezar.
              </p>
              <div className="mt-4 flex justify-center">
                <CreateFlashcardButton listaId={listaId} />
              </div>
              <div className="flex justify-center mb-6">
                <Image
                  src="/images/addnew.svg"
                  alt="Añadir nuevas tarjetas"
                  width={300}
                  height={300}
                />
              </div>
            </div>
          )}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center gap-4 my-6">
            <Link
              href={`?page=${Math.max(currentPage - 1, 1)}`}
              className={`px-4 py-2 rounded transition ${
                currentPage === 1
                  ? "bg-[var(--color-inactive)] text-white cursor-not-allowed"
                  : "bg-[var(--color-blue)] text-white hover:bg-[var(--color-blue)]/80"
              }`}
            >
              Anterior
            </Link>
            <span className="px-4 py-2 font-medium text-[var(--color-textPrimary)] dark:text-[var(--color-textPrimary)]">
              Página {page} de {totalPages}
            </span>
            <Link
              href={`?page=${Math.min(currentPage + 1, totalPages)}`}
              className={`px-4 py-2 rounded transition ${
                currentPage === totalPages
                  ? "bg-[var(--color-inactive)] text-white cursor-not-allowed"
                  : "bg-[var(--color-blue)] text-white hover:bg-[var(--color-blue)]/80"
              }`}
            >
              Siguiente
            </Link>
          </div>
        )}
      </>
    );
  } catch (error) {
    console.error("Error al recuperar las tarjetas", error);
    return notFound();
  }
}
