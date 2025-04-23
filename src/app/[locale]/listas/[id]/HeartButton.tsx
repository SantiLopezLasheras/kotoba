"use client";

import { Heart, HeartOff } from "lucide-react";
import { useState } from "react";

interface Props {
  // Optional: You can pass a `liked` prop if you're storing the like status in your state
  liked?: boolean;
}

export const HeartButton = ({ liked = false }: Props) => {
  const [isLiked, setIsLiked] = useState(liked);

  const handleHeartClick = () => {
    setIsLiked(!isLiked);
    // Later, you can send the updated liked state to your backend if needed
  };

  return (
    <button
      onClick={handleHeartClick}
      className="p-2 rounded-full cursor-pointer bg-orange-400 hover:bg-orange-500 transition duration-300"
      title={isLiked ? "Desmarcar" : "Marcar como favorito"}
    >
      {isLiked ? (
        <Heart className="w-6 h-6 text-white" />
      ) : (
        <HeartOff className="w-6 h-6 text-gray-500" />
      )}
    </button>
  );
};
