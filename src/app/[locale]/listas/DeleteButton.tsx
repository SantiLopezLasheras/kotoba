"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface Props {
  id: number;
}

export const DeleteButton = ({ id }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "¿Seguro que quieres eliminar esta lista?"
    );

    if (confirmDelete) {
      setLoading(true);
      try {
        const res = await fetch(`/api/listas?id=${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          // window.location.reload();
          router.refresh();
          toast.success("Lista eliminada correctamente");
        } else {
          alert("Error al borrar la lista");
          toast.error("Error al borrar la lista");
        }
      } catch (error) {
        console.error("Error al borrar la lista:", error);
        alert("Ha ocurrido un error al borrar la lista.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className={`flex justify-between items-center bg-red-500 hover:bg-red-600 text-white p-2 my-2 cursor-pointer rounded ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={loading}
    >
      <span>{loading ? "Borrando..." : "Eliminar"}</span>
      <Trash2 />
    </button>
  );
};
