"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  id?: number;
  defaultValues?: {
    nombre: string;
    idioma: string;
    nivel: string;
  };
}

export default function ListaModal({
  isOpen,
  onClose,
  mode,
  id,
  defaultValues,
}: Props) {
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const t = useTranslations("Listas");
  const router = useRouter();

  // referencia al div del modal
  const modalRef = useRef<HTMLDivElement>(null);

  // cerrar el modal si el usuario hace click fuera del modal
  useEffect(() => {
    if (isOpen) {
      const handleOutsideClick = (event: MouseEvent) => {
        if (
          modalRef.current &&
          !modalRef.current.contains(event.target as Node)
        ) {
          onClose();
        }
      };

      // añade un event listener para detectar cuando el usuario hace click fuera
      document.addEventListener("mousedown", handleOutsideClick);

      // Quitar el event listener cuando se cierre el modal o se destruya el component
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }
  }, [isOpen, onClose]);

  // rellena los datos del formulario para poder editar
  useEffect(() => {
    if (defaultValues) {
      setName(defaultValues.nombre);
      setLanguage(defaultValues.idioma);
      setLevel(defaultValues.nivel);
    }
  }, [defaultValues]);

  // resetea los valores del formulario
  useEffect(() => {
    if (!isOpen) {
      setName("");
      setLanguage("");
      setLevel("");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Log the data you're sending to the server
    console.log("Submitting data:", {
      id,
      nombre: name,
      idioma: language,
      nivel: level,
    });

    try {
      const res = await fetch("/api/listas", {
        method: mode === "edit" ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          nombre: name,
          idioma: language,
          nivel: level,
        }),
      });

      if (res.ok) {
        onClose();
        router.refresh();
        toast.success(
          mode === "edit"
            ? "Lista actualizada correctamente"
            : "Lista creada correctamente"
        );
      } else {
        alert(
          mode === "edit"
            ? "Error al actualizar la lista"
            : "Error al crear la lista"
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ha ocurrido un error.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-[var(--color-bgPrimary)] text-[var(--color-textPrimary)] p-6 rounded-lg shadow-xl w-96"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            {mode === "edit" ? t("editlist") : t("createlist")}
          </h3>
          <button
            onClick={onClose}
            className="text-[var(--color-inactive)] hover:text-[var(--color-accent)] cursor-pointer"
          >
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 font-medium">
              {t("listname")}
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded border border-[var(--color-inactive)] bg-[var(--color-bgSecondary)]"
              required
            />
          </div>

          {/* Idioma */}
          <div className="mb-4">
            <label htmlFor="language" className="block mb-1 font-medium">
              {t("language")}
            </label>
            <input
              type="text"
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 rounded border border-[var(--color-inactive)] bg-[var(--color-bgSecondary)]"
              required
            />
          </div>

          {/* Nivel */}
          <div className="mb-4">
            <label htmlFor="level" className="block mb-1 font-medium">
              {t("level")}
            </label>
            <input
              type="text"
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full p-2 rounded border border-[var(--color-inactive)] bg-[var(--color-bgSecondary)]"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 cursor-pointer rounded bg-[var(--color-bgSecondary)] border border-[var(--color-inactive)]"
            >
              {t("cancel")}
            </button>

            <button
              type="submit"
              className="px-4 py-2 cursor-pointer rounded bg-[var(--color-accent)] text-white"
              disabled={loading}
            >
              {loading
                ? mode === "edit"
                  ? t("saving")
                  : t("creating")
                : mode === "edit"
                ? t("savechanges")
                : t("createlist")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
