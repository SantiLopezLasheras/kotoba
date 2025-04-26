"use client";

import { Heart, HeartOff } from "lucide-react";
import { useState, useEffect } from "react";

interface Props {
  flashcardId: string | number;
}

export const HeartButton = ({ flashcardId }: Props) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    const fetchLikedStatus = async () => {
      try {
        const response = await fetch(
          `/api/favorites?flashcardId=${flashcardId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al comprobar los favoritos");
        }

        const data = await response.json();
        setIsLiked(data.liked);
      } catch (error) {
        console.error("Error al comprobar los favoritos:", error);
      }
    };

    fetchLikedStatus();
  }, [flashcardId]);

  const handleHeartClick = async () => {
    try {
      const method = isLiked ? "DELETE" : "POST";
      const url = isLiked
        ? `/api/favorites?flashcardId=${flashcardId}`
        : `/api/favorites`;

      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      // POST still needs a body, DELETE does not
      if (!isLiked) {
        options.body = JSON.stringify({ flashcardId });
      }

      const response = await fetch(url, options);

      if (response.ok) {
        setIsLiked(!isLiked);
      } else {
        console.error("Error al guardar los cambios:", await response.text());
      }
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  return (
    <button
      onClick={handleHeartClick}
      className="p-2 rounded-full cursor-pointer bg-orange-400 hover:bg-orange-500 transition duration-300"
      title={isLiked ? "Quitar de favoritos" : "Guardar en favoritos"}
    >
      {isLiked ? (
        <Heart className="w-6 h-6 text-white" />
      ) : (
        <HeartOff className="w-6 h-6 text-gray-500" />
      )}
    </button>
  );
};
