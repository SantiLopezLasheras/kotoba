import { getTotalUsers } from "@/lib/dbqueries/stats/admin/getTotalUsers";
import { getTotalFlashcards } from "@/lib/dbqueries/stats/admin/getTotalFlashcards";
import { getTotalLists } from "@/lib/dbqueries/stats/admin/getTotalLists";
import { getTotalLanguages } from "@/lib/dbqueries/stats/admin/getTotalLanguages";
import { getLastUserJoined } from "@/lib/dbqueries/stats/admin/getLastRegisterDate";
import { getListsPerLanguage } from "@/lib/dbqueries/stats/admin/getListsPerLanguage";
import { getFlashcardsPerLanguage } from "@/lib/dbqueries/stats/admin/getFlashcardsPerLanguage";
import { getTranslations } from "next-intl/server";
import AdminDashboardStats from "@/app/components/AdminDashboardStats";

export default async function Dashboard() {
  const t = await getTranslations("Dashboard");

  const totalUsers = await getTotalUsers();
  const totalLists = await getTotalLists();
  const totalLanguages = await getTotalLanguages();
  const totalFlashcards = await getTotalFlashcards();
  const lastUserJoined = await getLastUserJoined();
  const listsPerLanguage = await getListsPerLanguage();
  const flashcardsPerLanguage = await getFlashcardsPerLanguage();

  // Formateo de los datos
  const formattedListsPerLanguage = listsPerLanguage.map((item) => ({
    language: item.idioma,
    count: item.count,
  }));

  const formattedFlashcardsPerLanguage = flashcardsPerLanguage
    .filter((item) => item.idioma !== null)
    .map((item) => ({
      language: item.idioma!,
      count: item.count,
    }));

  const formattedLastUserJoined = new Date(lastUserJoined).toLocaleDateString();

  return (
    <main className="flex min-h-screen flex-col p-8 bg-bgPrimary">
      <section className="mb-8 text-center lg:text-left">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          {t("dashboardWelcome")}
        </h1>
      </section>

      <div className="mb-12">
        <AdminDashboardStats
          totalUsers={totalUsers}
          totalLists={totalLists}
          totalFlashcards={totalFlashcards}
          totalLanguages={totalLanguages}
          lastUserJoined={formattedLastUserJoined}
          listsPerLanguage={formattedListsPerLanguage}
          flashcardsPerLanguage={formattedFlashcardsPerLanguage}
        />
      </div>
    </main>
  );
}
