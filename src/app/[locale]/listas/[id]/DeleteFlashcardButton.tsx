"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface Props {
  id: number;
}

export const DeleteFlashcardButton = ({ id }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Eliminar esta tarjeta?");
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/flashcards?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Flashcard eliminada ✅");
        router.refresh();
      } else {
        toast.error("Error al eliminar la flashcard");
      }
    } catch (error) {
      console.error("Error al borrar la flashcard:", error);
      toast.error("No se ha podido eliminar la flashcard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-white disabled:opacity-50 cursor-pointer p-2 rounded-full bg-red-400 hover:bg-red-500 transition duration-300"
      title="Eliminar"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
};
