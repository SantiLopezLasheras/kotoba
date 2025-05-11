"use client";

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
  lastUserJoined: string; // ISO string of last user joined date
};

export default function AdminDashboardStats({
  totalUsers,
  totalLists,
  totalLanguages,
  totalFlashcards,
  lastUserJoined,
}: Props) {
  // Data for Admin Dashboard (Total Users, Lists, Languages, Flashcards)
  const data = {
    labels: ["Users", "Lists", "Languages", "Flashcards"],
    datasets: [
      {
        label: "Count",
        data: [totalUsers, totalLists, totalLanguages, totalFlashcards],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
        barThickness: 50,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: false,
        text: "Admin Dashboard Stats",
      },
    },
  };

  // Pie Chart for Languages Distribution
  const languageData = {
    labels: ["English", "Spanish", "French"], // This should be dynamic based on languages in the DB
    datasets: [
      {
        label: "Languages",
        data: [5, 12, 8], // Example data, replace with dynamic data
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56"],
      },
    ],
  };

  // Format Last User Joined Date
  const formattedLastUserJoined = new Date(lastUserJoined).toLocaleDateString();

  return (
    <div className="charts-container space-y-10">
      {/* Total Stats Bar Chart */}
      <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-200">
        Admin Dashboard Stats
      </h3>
      <div style={{ height: "300px" }}>
        <Bar options={options} data={data} />
      </div>

      {/* Total Idiomas */}
      <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-200">
        Languages Distribution
      </h3>
      <div style={{ height: "300px" }}>
        <Pie data={languageData} />
      </div>

      {/* Fecha de último registro */}
      <h3 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-200">
        Last User Joined
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        {formattedLastUserJoined}
      </p>
    </div>
  );
}
