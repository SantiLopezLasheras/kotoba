"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function GameFilterBar({
  current,
}: {
  current: "all" | "mine" | "public";
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (value: "all" | "mine" | "public") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("visibility", value);
    router.push(`?${params.toString()}`);
  };

  const getButtonClasses = (isActive: boolean) => {
    const base =
      "px-4 py-2 rounded transition font-medium border border-gray-300 cursor-pointer";
    const active = "bg-blue-500 text-white";
    const inactive =
      "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700";

    return `${base} ${isActive ? active : inactive}`;
  };

  return (
    <div className="mb-8 flex space-x-4">
      {(["all", "mine", "public"] as const).map((option) => (
        <button
          key={option}
          className={getButtonClasses(current === option)}
          onClick={() => handleClick(option)}
        >
          {option === "all" ? "All" : option === "mine" ? "Mine" : "Public"}
        </button>
      ))}
    </div>
  );
}
