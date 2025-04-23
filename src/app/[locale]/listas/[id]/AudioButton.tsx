"use client";

import { Speaker } from "lucide-react";

interface Props {
  textToSpeak: string;
}

export const AudioButton = ({ textToSpeak }: Props) => {
  const handleAudioClick = () => {
    // Create a new SpeechSynthesisUtterance instance with the text
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Set the language to English (United States)
    utterance.lang = "en-US"; // English (United States)
    utterance.pitch = 1;
    utterance.rate = 1;

    // Speak the text
    window.speechSynthesis.speak(utterance);
  };
  return (
    <button
      onClick={handleAudioClick}
      className="p-2 cursor-pointer rounded-full bg-yellow-400 hover:bg-yellow-500 transition duration-300"
      title="Reproducir pronunciación"
    >
      <Speaker className="w-6 h-6 text-white" />
    </button>
  );
};
