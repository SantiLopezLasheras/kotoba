import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getRandomAvatar } from "@/utils/getRandomAvatar";
import { getUserByEmail } from "@/lib/dbqueries/getUser";
import { getFlashcardCountByUser } from "@/lib/dbqueries/stats/getFlashcardsCountByUser";
import { getListCountByUser } from "@/lib/dbqueries/stats/getListsCountByUser";
import { getLanguagesCountByUser } from "@/lib/dbqueries/stats/getLanguagesCountByUser";
import { getFlashcardCountPerLanguage } from "@/lib/dbqueries/stats/getFlashcardsCountPerLanguage";
import { getListCountPerLanguage } from "@/lib/dbqueries/stats/getListsCountPerLanguage";
import UserStatsChart from "@/app/components/UserStats";
import UserFlashcardsPerLanguageChart from "@/app/components/UserFlashcardsPerLanguageStats";
import UserListsPerLanguageChart from "@/app/components/UserListsPerLanguageStats";
import Image from "next/image";
import { EditNameForm } from "./NameForm";

export default async function ProfilePage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect("/");

  const t = await getTranslations("Profile");

  const avatarUrl = getRandomAvatar();
  const dbUser = await getUserByEmail(user.email ?? "");
  const name = dbUser?.name ?? "";

  const [
    numLanguages,
    numLists,
    numFlashcards,
    flashcardsPerLang,
    listsPerLang,
  ] = await Promise.all([
    getLanguagesCountByUser(user.id),
    getListCountByUser(user.id),
    getFlashcardCountByUser(user.id),
    getFlashcardCountPerLanguage(user.id),
    getListCountPerLanguage(user.id),
  ]);

  return (
    <main className="min-h-screen w-full bg-bgPrimary">
      <div className="bg-white dark:bg-gray-600 shadow-lg rounded p-8">
        <section className="flex flex-col lg:flex-row gap-10 mb-12">
          {/* Información del Usuario */}
          <div className="flex-1 text-center lg:text-left">
            <div className="w-32 h-32 mx-auto lg:mx-0 mb-6 relative rounded-full overflow-hidden border-4 border-accent">
              <Image
                src={avatarUrl}
                alt="Profile picture"
                fill
                className="object-cover"
                sizes="128px"
                priority
              />
            </div>

            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
              {t("welcome")} {name ?? ""}
            </h1>

            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {t("email")}: <span className="font-medium">{user.email}</span>
            </p>
          </div>

          {/* Formulario */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
              {t("editProfile")}
            </h3>
            <EditNameForm initialName={name} />
          </div>
        </section>

        {/* Línea horizontal para crear una separación visual */}
        <div className="border-t-2 border-accent mb-8 w-full"></div>

        {/* Estadísticas */}
        <section className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-10">
          <div className="mb-8 p-8 rounded bg-gradient-to-br from-[var(--color-bgSecondary)] via-[var(--color-blue)]/20 to-[var(--color-pink)]/30">
            <h3 className="text-lg font-medium mb-8 text-gray-700 dark:text-gray-200">
              {t("yourLearningStats")}
            </h3>
            <div className="w-full mx-auto">
              <UserStatsChart
                flashcards={numFlashcards ?? 0}
                languages={numLanguages ?? 0}
                lists={numLists ?? 0}
              />
            </div>
          </div>

          <div className="mb-8 p-8 rounded bg-gradient-to-br from-[var(--color-bgSecondary)] via-[var(--color-blue)]/20 to-[var(--color-pink)]/30">
            <h3 className="text-lg font-medium mb-8 text-gray-700 dark:text-gray-200">
              {t("listsPerLanguage")}
            </h3>
            <UserListsPerLanguageChart data={listsPerLang ?? []} />
          </div>

          <div className="mb-8 p-8 rounded bg-gradient-to-br from-[var(--color-bgSecondary)] via-[var(--color-blue)]/20 to-[var(--color-pink)]/30">
            <h3 className="text-lg font-medium mb-8 text-gray-700 dark:text-gray-200">
              {t("flashcardsPerLanguage")}
            </h3>
            <UserFlashcardsPerLanguageChart data={flashcardsPerLang ?? []} />
          </div>
        </section>
      </div>
    </main>
  );
}
