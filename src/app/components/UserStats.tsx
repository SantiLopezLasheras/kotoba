"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  flashcards: number;
  lists: number;
  languages: number;
};

export default function UserStatsChart({
  flashcards,
  lists,
  languages,
}: Props) {
  const data = {
    labels: ["Flashcards", "Lists", "Languages"],
    datasets: [
      {
        label: "Count",
        data: [flashcards, lists, languages],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
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
        text: "Your Learning Stats",
      },
    },
  };

  return <Bar options={options} data={data} />;
}
