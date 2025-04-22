import { getFlashcardsByListId } from "@/lib/dbqueries/getFlashcards";
import { getListaById } from "@/lib/dbqueries/getListaById";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

interface TarjetasProps {
  params: Promise<{ id: string }>;
}

export default async function Tarjetas({ params }: TarjetasProps) {
  const { id } = await params;

  const listaId = parseInt(id, 10);

  // Fetch the flashcards for the list
  const flashcards = await getFlashcardsByListId(listaId);

  if (!flashcards || flashcards.length === 0) {
    // If no flashcards were found, handle the error (404)
    return notFound();
  }

  // Fetch the list name (you can adjust this part based on your setup)
  const listaData = await getListaById(listaId);

  const listaNombre = listaData?.nombre || `Lista nº ${listaId}`;

  return (
    <>
      <h1 className="text-center text-3xl p-5 text-[var(--color-textPrimary)] dark:text-white">
        Tarjetas
      </h1>
      <h2 className="text-center text-xl text-[var(--color-textPrimary)] dark:text-gray-300">
        {listaNombre || "Cargando nombre del mazo..."}
      </h2>

      <div
        id="card-list"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-8"
      >
        {flashcards.length > 0 ? (
          flashcards.map((tarjeta) => (
            <div
              key={tarjeta.id}
              className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-md p-4"
            >
              <div className="flex flex-col justify-center items-center text-[var(--color-textPrimary)] dark:text-white">
                <h3 className="text-2xl font-bold mb-2 text-center text-[var(--color-accent)] dark:text-[var(--color-accent)]">
                  {tarjeta.palabra}
                </h3>
                <p className="text-lg font-semibold text-center">
                  Traducción: {tarjeta.traduccion}
                </p>
                <p className="text-sm text-center mt-2">
                  {tarjeta.fraseEjemplo || "No hay ejemplo disponible"}
                </p>

                {/* Action Buttons */}
                <div className="flex justify-between gap-2 mt-4">
                  {/* Edit Button */}
                  <Link
                    href={`/flashcards/edit/${tarjeta.id}`}
                    className="flex items-center bg-[var(--color-blue)] text-white py-2 px-4 rounded hover:bg-[var(--color-blue)]/80 transition duration-300"
                  >
                    <Pencil className="mr-2" />
                    Editar
                  </Link>

                  {/* Delete Button */}
                  <button className="flex items-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300">
                    <Trash2 className="mr-2" />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No flashcards available.</p>
        )}
      </div>

      {/* Link back to the list */}
      <div className="flex justify-center mt-6">
        <Link
          href={`/listas`}
          className="bg-[var(--color-accent)] text-white py-2 px-6 rounded hover:bg-[var(--color-accent)]/80 transition duration-300"
        >
          Volver a las listas
        </Link>
      </div>
    </>
  );
}
