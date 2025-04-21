import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <main className="bg-[var(--color-bgPrimary)] text-[var(--color-textPrimary)]">
      {/* Landing Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between py-16 px-8 max-w-screen-xl mx-auto">
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <Image
            src="/images/landing.jpg"
            alt="App Landing Image"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full lg:w-1/2 lg:pl-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-[var(--color-blue)]">
            {t("welcome")}
          </h1>
          <p className="text-lg text-[var(--color-textPrimary)] mb-6">
            {t("description")}
          </p>
          <Link
            href="/register"
            className="bg-[var(--color-accent)] text-white px-6 py-3 rounded-lg text-lg hover:opacity-90"
          >
            {t("cta")}
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-[var(--color-blue)] mb-10">
          {t("discover")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12">
          {/* Feature */}
          {[
            { key: "feature1", imageAlt: "Games Collection" },
            { key: "feature2", imageAlt: "Custom Lists" },
            { key: "feature3", imageAlt: "Learning Diary" },
            { key: "feature4", imageAlt: "Flashcards" },
          ].map((feature, index) => (
            <div
              key={feature.key}
              className={`flex flex-col ${
                index % 2 === 1 ? "sm:flex-row-reverse" : "sm:flex-row"
              } items-center`}
            >
              <div className="w-full sm:w-1/2 mb-4 sm:mb-0 sm:px-4">
                <Image
                  src="/images/landing.jpg"
                  alt={feature.imageAlt}
                  width={400}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-4">
                  {t(`${feature.key}.title`)}
                </h3>
                <p className="text-[var(--color-textPrimary)]">
                  {t(`${feature.key}.desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
