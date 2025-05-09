"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function FilterBar({ current }: { current: "all" | "mine" | "public" }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const optionsStyles =
    "text-[var(--color-textPrimary)]  dark:text-white bg-[var(--color-bgSecondary)] hover:bg-[var(--color-accent)]";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set("visibility", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="p-4">
      <select
        className="p-2 border-2 dark:border-blue rounded cursor-pointer"
        value={current}
        onChange={handleChange}
      >
        <option className={optionsStyles} value="all">
          Todas
        </option>
        <option className={optionsStyles} value="mine">
          Mis listas
        </option>
        <option className={optionsStyles} value="public">
          Públicas
        </option>
      </select>
    </div>
  );
}
