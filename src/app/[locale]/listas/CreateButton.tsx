"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import ListaModal from "./ListaModal";

export const CreateButton = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Listas");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="bg-[var(--color-accent)] text-white p-2 rounded-lg flex items-center gap-2 hover:bg-[var(--color-accent)]/90 cursor-pointer"
      >
        <Plus />
        <span>{t("create")}</span>
      </button>

      <ListaModal isOpen={open} onClose={handleClose} mode="create" />
    </>
  );
};
