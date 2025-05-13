import { getFavoriteFlashcardsByUserId } from "@/lib/dbqueries/getFavoriteByFlashcardId";
import { getUserByEmail } from "@/lib/dbqueries/getUser";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";

import { FlashcardFavoritesClient } from "./FlashcardFavoritesClient";

export default async function FavoritosPage() {
  const { getUser } = getKindeServerSession();
  const t = useTranslations("Favorites");
  const user = await getUser();

  if (!user?.email) return notFound();
  const dbUser = await getUserByEmail(user.email);
  if (!dbUser) return notFound();

  const flashcards = await getFavoriteFlashcardsByUserId(dbUser.id);
  if (!flashcards || flashcards.length === 0) return notFound();

  return (
    <>
      <div className="flex justify-between items-center px-8 py-5">
        <h1 className="text-3xl font-bold">t("myfavorites")</h1>
      </div>

      <FlashcardFavoritesClient flashcards={flashcards} userId={dbUser.id} />
    </>
  );
}
