import Image from "next/image";
import Link from "next/link";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("Home");

  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = (await isAuthenticated()) ?? false;

  return (
    <main className="bg-[var(--color-bgPrimary)]  text-[var(--color-textPrimary)]">
      <section className="flex flex-col lg:flex-row items-center justify-between py-16 px-8 max-w-screen-xl mx-auto">
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <Image
            src="/images/landing.webp"
            alt="App Landing Image"
            width={500}
            height={500}
            className="rounded shadow-lg"
          />
        </div>
        <div className="w-full lg:w-1/2 lg:pl-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-[var(--color-blue)]">
            {t("welcome")}
          </h1>
          <p className="text-lg text-[var(--color-textPrimary)] mb-6">
            {t("description")}
          </p>

          {isUserAuthenticated ? (
            <Link
              href="/listas"
              className="bg-[var(--color-accent)] text-white px-6 py-3 rounded text-lg hover:opacity-90"
            >
              {t("cta")}
            </Link>
          ) : (
            <LoginLink className="bg-[var(--color-accent)] text-white px-6 py-3 rounded text-lg hover:opacity-90">
              {t("cta")}
            </LoginLink>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-[var(--color-blue)] mb-10">
          {t("discover")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12">
          {[
            {
              key: "feature1",
              imageSrc: "/images/gamescollection.png",
              imageAlt: "Games Collection",
            },
            {
              key: "feature2",
              imageSrc: "/images/customlists.png",
              imageAlt: "Custom Lists",
            },
            {
              key: "feature3",
              imageSrc: "/images/learningdiary.png",
              imageAlt: "Learning Diary",
            },
            {
              key: "feature4",
              imageSrc: "/images/flashcards.png",
              imageAlt: "Flashcards",
            },
          ].map((feature, index) => (
            <div
              key={feature.key}
              className={`flex flex-col ${
                index % 2 === 1 ? "sm:flex-row-reverse" : "sm:flex-row"
              } items-center text-center sm:text-left`}
            >
              <div className="w-3/4 sm:w-1/2 mb-4 sm:mb-0 sm:px-4 mx-auto">
                <Image
                  src={feature.imageSrc}
                  alt={feature.imageAlt}
                  width={400}
                  height={300}
                  className="rounded shadow-lg w-full h-auto"
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
