"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

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

const ListaModal = ({ isOpen, onClose, mode, id, defaultValues }: Props) => {
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (defaultValues) {
      setName(defaultValues.nombre);
      setLanguage(defaultValues.idioma);
      setLevel(defaultValues.nivel);
    }
  }, [defaultValues]);

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
      <div className="bg-[var(--color-bgPrimary)] text-[var(--color-textPrimary)] p-6 rounded-lg shadow-xl w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            {mode === "edit" ? "Editar lista" : "Crear nueva lista"}
          </h3>
          <button
            onClick={onClose}
            className="text-[var(--color-inactive)] hover:text-[var(--color-accent)]"
          >
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 font-medium">
              Nombre de la lista
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
              Idioma
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
              Nivel
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
              className="px-4 py-2 rounded bg-[var(--color-bgSecondary)] border border-[var(--color-inactive)]"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded bg-[var(--color-accent)] text-white"
              disabled={loading}
            >
              {loading
                ? mode === "edit"
                  ? "Guardando..."
                  : "Creando..."
                : mode === "edit"
                ? "Guardar cambios"
                : "Crear lista"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListaModal;
