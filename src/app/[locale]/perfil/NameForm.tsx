"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateUserName } from "@/lib/dbqueries/stats/updateName";
import { useTranslations } from "next-intl";

export function EditNameForm({ initialName }: { initialName: string }) {
  const t = useTranslations("Profile");
  const [name, setName] = useState(initialName);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await updateUserName(name);
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label
        htmlFor="name"
        className="block text-sm text-gray-700 dark:text-gray-300"
      >
        {t("name")}
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="block w-full py-2 px-4 rounded border dark:bg-gray-800 dark:text-white"
        placeholder={t("name")}
      />
      <button
        type="submit"
        className="bg-accent text-white px-6 py-3 rounded cursor-pointer hover:bg-accent/90 transition"
        disabled={isPending}
      >
        {isPending ? t("saving") : t("saveChanges")}
      </button>
    </form>
  );
}
