import Image from "next/image";
import Link from "next/link";
import { getListas } from "@/lib/dbqueries/getListas";
import { GameFilterBar } from "../GameFilterBar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function DragDropPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  const visibility =
    (searchParams.visibility as "all" | "mine" | "public") ?? "all";

  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  const listas = await getListas({ visibility, userId: user?.id });

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-10">
      <h1 className="text-4xl font-bold mb-10 text-center">Drag & Drop</h1>

      {/* Filtro de visibilidad (placeholder por ahora) */}
      <GameFilterBar current={visibility as "all" | "mine" | "public"} />

      <div className="flex w-full max-w-screen-lg">
        {/* Imagen a la izquierda */}
        <div className="w-1/4 flex justify-center items-start">
          <Image
            src="/images/playinggames.svg"
            alt="Playing Games"
            width={300}
            height={300}
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Selección de listas a la derecha */}
        <div className="w-3/4 p-6 flex flex-col justify-start items-center">
          <h2 className="text-xl font-semibold mb-4">
            Select a list to practice:
          </h2>

          <div className="w-full flex flex-col items-center space-y-4">
            {listas.map((list) => (
              <Link
                key={list.id}
                href={`/juegos/dragdrop/${list.id}`}
                className="w-2/3 text-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
              >
                {list.nombre || "Unnamed List"}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
