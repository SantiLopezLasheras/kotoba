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
      <h1 className="text-center text-3xl p-5 text-[var(--color-textPrimary)] dark:text-white">
        Listas
      </h1>

      <div className="flex justify-end items-center mb-4 px-8 gap-2">
        <CreateButton />
        <FilterBar current={visibility} />
      </div>

      <div
        id="card-list"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-8"
      >
        {listas.map((lista) => (
          <div
            key={lista.id}
            className="w-full max-w-sm bg-[var(--color-bgSecondary)] dark:bg-[var(--color-bgPrimary)] rounded-xs border border-[var(--color-accent)] shadow-md p-4"
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
                  href={`/repasar/${lista.id}`}
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
