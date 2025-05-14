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

type FlashcardData = {
  idioma: string;
  count: number;
};

type Props = {
  data: FlashcardData[];
};

export default function UserFlashcardsPerLanguageChart({ data }: Props) {
  const chartData = {
    labels: data.map((item) => item.idioma),
    datasets: [
      {
        label: "Flashcards",
        data: data.map((item) => item.count),
        backgroundColor: "#3b82f6",
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y" as const,
    plugins: {
      legend: { display: false },
      title: {
        display: false,
        text: "Flashcards per Language",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  };

  return (
    <div className="w-full max-w-2xl mx-auto h-96">
      <Bar options={options} data={chartData} />
    </div>
  );
}
