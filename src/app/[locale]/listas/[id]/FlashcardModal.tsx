"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface FlashcardModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  id?: number;
  listaId: number;
  defaultValues?: {
    palabra: string;
    traduccion: string;
    fraseEjemplo: string;
    categoriaGramatical: string;
    notas: string;
    pronunciacion: string;
    image: string;
  };
}

const FlashcardModal = ({
  isOpen,
  onClose,
  mode,
  id,
  listaId,
  defaultValues,
}: FlashcardModalProps) => {
  const [palabra, setPalabra] = useState("");
  const [traduccion, setTraduccion] = useState("");
  const [fraseEjemplo, setFraseEjemplo] = useState("");
  const [categoriaGramatical, setCategoriaGramatical] = useState("");
  const [notas, setNotas] = useState("");
  const [pronunciacion, setPronunciacion] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Se cargan los datos para el modo "edit"
  useEffect(() => {
    if (mode === "edit" && defaultValues) {
      setPalabra(defaultValues.palabra);
      setTraduccion(defaultValues.traduccion);
      setFraseEjemplo(defaultValues.fraseEjemplo || "");
      setCategoriaGramatical(defaultValues.categoriaGramatical || "");
      setNotas(defaultValues.notas || "");
      setPronunciacion(defaultValues.pronunciacion || "");
      setImage(defaultValues.image || "");
    }
  }, [mode, defaultValues]);

  // Se limpia el formulario al cerrar el modal
  useEffect(() => {
    if (!isOpen) {
      setPalabra("");
      setTraduccion("");
      setFraseEjemplo("");
      setCategoriaGramatical("");
      setNotas("");
      setPronunciacion("");
      setImage("");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Preparar los datos para enviar
    const data = {
      id,
      listaId,
      palabra,
      traduccion,
      fraseEjemplo,
      categoriaGramatical,
      notas,
      pronunciacion,
      image,
    };

    const url =
      mode === "edit" ? `/api/flashcards?id=${id}` : `/api/flashcards`;

    try {
      const res = await fetch(url, {
        method: mode === "edit" ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        onClose();
        toast.success(
          mode === "edit"
            ? "Tarjeta actualizada con éxito"
            : "Tarjeta creada con éxito"
        );
        router.refresh();
      } else {
        toast.error(
          mode === "edit"
            ? "Error al actualizar la tarjeta"
            : "Error al crear la tarjeta"
        );
      }
    } catch (error) {
      void error;
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-[var(--color-bgPrimary)] text-[var(--color-textPrimary)] p-6 rounded shadow-xl w-full max-w-3xl bg-gradient-to-br from-[var(--color-bgSecondary)] via-[var(--color-blue)]/20 to-[var(--color-pink)]/30">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            {mode === "edit" ? "Editar tarjeta" : "Crear nueva tarjeta"}
          </h3>
          <button
            onClick={onClose}
            className="text-[var(--color-inactive)] hover:text-[var(--color-accent)]"
          >
            <X />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Palabra */}
          <div className="mb-4">
            <label htmlFor="palabra" className="block mb-1 font-medium">
              Palabra
            </label>
            <input
              type="text"
              id="palabra"
              value={palabra}
              onChange={(e) => setPalabra(e.target.value)}
              className="w-full p-2 rounded border border-[var(--color-inactive)] bg-[var(--color-bgSecondary)]"
              required
            />
          </div>

          {/* Traducción */}
          <div className="mb-4">
            <label htmlFor="traduccion" className="block mb-1 font-medium">
              Traducción
            </label>
            <input
              type="text"
              id="traduccion"
              value={traduccion}
              onChange={(e) => setTraduccion(e.target.value)}
              className="w-full p-2 rounded border border-[var(--color-inactive)] bg-[var(--color-bgSecondary)]"
              required
            />
          </div>

          {/* Categoria Gramatical */}
          <div className="mb-4">
            <label
              htmlFor="categoriaGramatical"
              className="block mb-1 font-medium"
            >
              Categoría gramatical
            </label>
            <input
              type="text"
              id="categoriaGramatical"
              value={categoriaGramatical || ""}
              onChange={(e) => setCategoriaGramatical(e.target.value)}
              className="w-full p-2 rounded border border-[var(--color-inactive)] bg-[var(--color-bgSecondary)]"
            />
          </div>

          {/* Pronunciación */}
          <div className="mb-4">
            <label htmlFor="pronunciacion" className="block mb-1 font-medium">
              Pronunciación (opcional)
            </label>
            <input
              type="text"
              id="pronunciacion"
              value={pronunciacion || ""}
              onChange={(e) => setPronunciacion(e.target.value)}
              className="w-full p-2 rounded border border-[var(--color-inactive)] bg-[var(--color-bgSecondary)]"
            />
          </div>

          {/* Frase de ejemplo (Single column) */}
          <div className="mb-4 col-span-2">
            <label htmlFor="fraseEjemplo" className="block mb-1 font-medium">
              Frase de ejemplo (opcional)
            </label>
            <input
              type="text"
              id="fraseEjemplo"
              value={fraseEjemplo}
              onChange={(e) => setFraseEjemplo(e.target.value)}
              className="w-full p-2 rounded border border-[var(--color-inactive)] bg-[var(--color-bgSecondary)]"
            />
          </div>

          {/* Notas (Single column) */}
          <div className="mb-4 col-span-2">
            <label htmlFor="notas" className="block mb-1 font-medium">
              Notas (opcional)
            </label>
            <input
              type="text"
              id="notas"
              value={notas || ""}
              onChange={(e) => setNotas(e.target.value)}
              className="w-full p-2 rounded border border-[var(--color-inactive)] bg-[var(--color-bgSecondary)]"
            />
          </div>

          {/* Image (Single column) */}
          <div className="mb-4 col-span-2">
            <label htmlFor="image" className="block mb-1 font-medium">
              Image (opcional)
            </label>
            <input
              type="text"
              id="image"
              value={image || ""}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-2 rounded border border-[var(--color-inactive)] bg-[var(--color-bgSecondary)]"
            />
          </div>

          <div className="flex justify-end gap-2 col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded cursor-pointer bg-[var(--color-bgSecondary)] border border-[var(--color-inactive)]"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded cursor-pointer bg-[var(--color-accent)] text-white"
              disabled={loading}
            >
              {loading
                ? mode === "edit"
                  ? "Guardando..."
                  : "Creando..."
                : mode === "edit"
                ? "Guardar cambios"
                : "Crear tarjeta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FlashcardModal;
