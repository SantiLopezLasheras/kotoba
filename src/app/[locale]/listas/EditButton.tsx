"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import ListaModal from "./ListaModal";
import { useTranslations } from "next-intl";

type Props = {
  id: number;
  nombre: string;
  idioma: string;
  nivel: string;
};

export const EditButton = ({ id, nombre, idioma, nivel }: Props) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Listas");

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex justify-between items-center bg-yellow-500 hover:bg-yellow-600 text-white p-2 my-2 rounded cursor-pointer"
      >
        <span>{t("edit")}</span>
        <Pencil />
      </button>

      <ListaModal
        isOpen={open}
        onClose={() => setOpen(false)}
        mode="edit"
        id={id}
        defaultValues={{ nombre, idioma, nivel }}
      />
    </>
  );
};
