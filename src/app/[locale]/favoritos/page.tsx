import { getFavoriteFlashcardsByUserId } from "@/lib/dbqueries/getFavoriteByFlashcardId";
import { getUserByEmail } from "@/lib/dbqueries/getUser";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { FlashcardFavoritesClient } from "./FlashcardFavoritesClient";
import { checkPremiumRole } from "@/lib/auth/checkPremium";

export default async function FavoritosPage() {
  const { getUser } = getKindeServerSession();
  const t = await getTranslations("Favorites");
  const user = await getUser();

  if (!user?.email) return notFound();
  const dbUser = await getUserByEmail(user.email);
  if (!dbUser) return notFound();

  const flashcards = await getFavoriteFlashcardsByUserId(dbUser.id);
  if (!flashcards || flashcards.length === 0) return notFound();

  const isPremium = await checkPremiumRole();

  return (
    <>
      <div className="flex justify-between items-center px-8 py-5">
        <h1 className="text-3xl font-bold">{t("myfavorites")}</h1>
      </div>

      <FlashcardFavoritesClient
        flashcards={flashcards}
        userId={dbUser.id}
        isPremium={isPremium}
      />
    </>
  );
}
