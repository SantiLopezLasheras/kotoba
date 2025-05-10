import { useTranslations } from "next-intl";
import GameCard from "./Gamecard";

export default function Juegos() {
  const t = useTranslations("Games");

  return (
    <div className="min-h-screen bg-gradient-to-r from-[var(--color-blue)] to-[var(--color-accent)]">
      <h1 className="text-center text-4xl font-extrabold text-white p-10">
        {t("heading")}
      </h1>

      <div className="flex flex-wrap justify-center gap-10 p-5">
        <GameCard
          title={t("memory.title")}
          description={t("memory.desc")}
          image="/images/memory-game.jpg"
          href="/juegos/memorygame"
          label={t("play")}
        />

        <GameCard
          title={t("dragdrop.title")}
          description={t("dragdrop.desc")}
          image="/images/drag-drop.jpg"
          href="/juegos/dragdrop"
          label={t("play")}
        />

        <GameCard
          title={t("review.title")}
          description={t("review.desc")}
          image="/images/repasar.webp"
          href="/juegos/repasar"
          label={t("review.label")}
        />
      </div>
    </div>
  );
}
