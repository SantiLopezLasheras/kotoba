import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <div className="bg-[var(--background-primary)]">
      <h1>Welcome to KOTOBA</h1>
      <h2>{t("title")}</h2>
      <Link href="/about">{t("about")}</Link>
    </div>
  );
}
