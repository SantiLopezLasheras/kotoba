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
    <div className="min-h-screen flex flex-col items-center justify-start py-10 bg-gradient-to-r from-[var(--color-blue)] to-[var(--color-accent)]">
      <div className="max-w-screen-xl mx-auto w-full space-y-10 px-6">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0 px-6">
          <h1 className="text-4xl font-bold text-center lg:text-left">
            Drag & Drop
          </h1>
          <GameFilterBar current={visibility as "all" | "mine" | "public"} />
        </div>

        <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-20 px-6">
          <div className="hidden lg:flex justify-start items-start w-full lg:w-1/2">
            <Image
              src="/images/playinggames.svg"
              alt="Drag and Drop Game"
              width={400}
              height={400}
              className="rounded shadow-lg"
            />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-end items-center">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Choose a list to test your memory:
            </h2>

            <div className="w-full flex flex-col items-center space-y-4">
              {listas.map((list) => (
                <Link
                  key={list.id}
                  href={`/juegos/dragdrop/${list.id}`}
                  className="w-full max-w-md text-center px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-500/80 transition-all shadow-md"
                >
                  {list.nombre || "Unnamed List"}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
