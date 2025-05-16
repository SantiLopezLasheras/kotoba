import Link from "next/link";
import { Eye, BookOpenCheck } from "lucide-react";
import { getListas } from "@/lib/dbqueries/getListas";
import { DeleteButton } from "./DeleteButton";
import { CreateButton } from "./CreateButton";
import { EditButton } from "./EditButton";
import { FilterBar } from "./FilterBar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Listas(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  const visibility =
    (searchParams.visibility as "all" | "mine" | "public") ?? "all";

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const listas = await getListas({
    userId: user?.id,
    visibility,
  });

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center px-4 sm:px-8 py-5">
        <h1 className="text-3xl text-[var(--color-textPrimary)] dark:text-white text-center md:text-left mb-4 md:mb-0">
          Listas
        </h1>

        <div className="flex justify-center md:justify-end items-center gap-4">
          <CreateButton />
          <FilterBar current={visibility} />
        </div>
      </div>

      <div
        id="card-list"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-8"
      >
        {listas.map((lista) => (
          <div
            key={lista.id}
            className="w-full max-w-sm bg-[var(--color-bgSecondary)] dark:bg-[var(--color-bgPrimary)] rounded border border-[var(--color-blue)]/20 shadow-md p-4 hover:shadow-lg transition duration-300 bg-gradient-to-br from-[var(--color-bgSecondary)] via-[var(--color-blue)]/20 to-[var(--color-pink)]/30"
          >
            <div className="flex flex-col justify-center items-center text-[var(--color-textPrimary)] dark:text-white">
              <h3 className="text-2xl font-bold mb-2 text-center text-[var(--color-accent)] dark:text-[var(--color-accent)]">
                {lista.nombre}
              </h3>
              <p className="text-lg font-semibold text-center dark:text-gray-300">
                Idioma: {lista.idioma}
              </p>
              <p className="text-lg font-semibold text-center dark:text-gray-300">
                Nivel: {lista.nivel}
              </p>

              <div className="text-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 mt-4">
                {/* Ver contenido de la lista */}
                <Link
                  href={`/listas/${lista.id}`}
                  className="flex justify-between items-center bg-[var(--color-blue)] hover:bg-[var(--color-blue)]/80 text-white p-2 my-2 rounded"
                  aria-label={`Ver contenido de la lista ${lista.nombre}`}
                >
                  <span>Ir a la lista</span>
                  <Eye />
                </Link>
                {/* Repasar lista */}
                <Link
                  href={`/juegos/repasar/${lista.id}`}
                  className="flex justify-between items-center bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/80 text-white p-2 my-2 rounded"
                  aria-label={`Repasar lista ${lista.nombre}`}
                >
                  <span>Repasar</span>
                  <BookOpenCheck />
                </Link>
                {/* Editar detalles de la lista */}
                <EditButton
                  id={lista.id}
                  nombre={lista.nombre}
                  idioma={lista.idioma}
                  nivel={lista.nivel}
                />
                {/* Borrar lista */}
                <DeleteButton id={lista.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
