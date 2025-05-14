"use client";

import { useTranslations } from "next-intl";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  totalUsers: number;
  totalLists: number;
  totalLanguages: number;
  totalFlashcards: number;
  lastUserJoined: string;
  listsPerLanguage: { language: string; count: number }[];
  flashcardsPerLanguage: { language: string; count: number }[];
};

export default function AdminDashboardStats({
  totalUsers,
  totalLists,
  totalLanguages,
  totalFlashcards,
  lastUserJoined,
  listsPerLanguage,
  flashcardsPerLanguage,
}: Props) {
  const data = {
    labels: ["Users", "Lists", "Languages", "Flashcards"],
    datasets: [
      {
        label: "Count",
        data: [totalUsers, totalLists, totalLanguages, totalFlashcards],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
      },
    ],
  };

  const t = useTranslations("Dashboard");

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
  };

  const listsPerLanguageData = {
    labels: listsPerLanguage.map((item) => item.language),
    datasets: [
      {
        label: "Lists per Language",
        data: listsPerLanguage.map((item) => item.count),
        backgroundColor: listsPerLanguage.map(
          (_, index) => `hsl(${(index * 60) % 360}, 70%, 60%)`
        ),
      },
    ],
  };

  const flashcardsPerLanguageData = {
    labels: flashcardsPerLanguage.map((item) => item.language),
    datasets: [
      {
        label: "Flashcards per Language",
        data: flashcardsPerLanguage.map((item) => item.count),
        backgroundColor: flashcardsPerLanguage.map(
          (_, index) => `hsl(${(index * 120) % 360}, 70%, 60%)`
        ),
      },
    ],
  };

  const formattedLastUserJoined = new Date(lastUserJoined).toLocaleDateString();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className=" bg-white dark:bg-gray-800 rounded shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          {t("lastUserJoined")}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {formattedLastUserJoined}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          {t("generalStats")}
        </h3>
        <div className="aspect-square">
          <Pie data={data} options={options} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          {t("listsPerLanguage")}
        </h3>
        <div className="h-[300px]">
          <Bar
            options={{
              responsive: true,
              indexAxis: "y",
              plugins: { legend: { display: false } },
            }}
            data={listsPerLanguageData}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          {t("flashcardsPerLanguage")}
        </h3>
        <div className="h-[300px]">
          <Bar
            options={{
              responsive: true,
              indexAxis: "y",
              plugins: { legend: { display: false } },
            }}
            data={flashcardsPerLanguageData}
          />
        </div>
      </div>
    </div>
  );
}
