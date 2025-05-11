import { getTranslations } from "next-intl/server";
import GameCard from "./Gamecard";
import { checkPremiumRole } from "@/lib/auth/checkPremium";

export default async function Juegos() {
  const t = await getTranslations("Games");
  const isPremium = await checkPremiumRole();

  return (
    <div className="min-h-screen bg-gradient-to-r from-[var(--color-blue)] to-[var(--color-accent)]">
      <h1 className="text-center text-4xl font-extrabold text-white p-10">
        {t("heading")}
      </h1>

      <div className="flex flex-wrap justify-center gap-10 p-5">
        <GameCard
          title={t("memory.title")}
          description={t("memory.desc")}
          image="/images/memorygame.png"
          href="/juegos/memorygame"
          label={t("play")}
        />

        {isPremium ? (
          <GameCard
            title={t("dragdrop.title")}
            description={t("dragdrop.desc")}
            image="/images/dragdrop.png"
            href="/juegos/dragdrop"
            label={t("play")}
          />
        ) : (
          <GameCard
            title={t("dragdrop.title")}
            description={t("dragdrop.desc")}
            image="/images/dragdrop.png"
            href="/planes"
            label={t("subscribe")}
          />
        )}

        <GameCard
          title={t("review.title")}
          description={t("review.desc")}
          image="/images/review.png"
          href="/juegos/repasar"
          label={t("review.label")}
        />
      </div>
    </div>
  );
}
