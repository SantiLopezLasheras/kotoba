"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

type ListData = {
  idioma: string;
  count: number;
};

type Props = {
  data: ListData[];
};

export default function UserListsPerLanguageChart({ data }: Props) {
  const chartData = {
    labels: data.map((item) => item.idioma),
    datasets: [
      {
        label: "Lists",
        data: data.map((item) => item.count),
        backgroundColor: [
          "#10b981",
          "#3b82f6",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
          "#ec4899",
          "#14b8a6",
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "right" as const },
      title: {
        display: false,
        text: "Lists per Language",
      },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto h-80">
      <Pie data={chartData} options={options} />
    </div>
  );
}
