import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("About");
  const title = t("title");
  const description = t("description");
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-lg text-center max-w-xl">{description}</p>
    </div>
  );
}
