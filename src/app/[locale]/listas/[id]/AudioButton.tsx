"use client";

import { Speaker } from "lucide-react";

interface Props {
  textToSpeak: string;
  exampleToSpeak?: string | null;
  language?: string;
}

export const AudioButton = ({
  textToSpeak,
  exampleToSpeak,
  language,
}: Props) => {
  const handleAudioClick = () => {
    if (language) {
      if (language === "chino") {
        language = "zh-CN";
      }
      if (language === "inglés") {
        language = "en-US";
      }
      if (language === "japonés") {
        language = "ja-JP";
      }
      if (language === "español") {
        language = "es-ES";
      }
    }

    let utterance: SpeechSynthesisUtterance;
    if (exampleToSpeak) {
      utterance = new SpeechSynthesisUtterance(
        `${textToSpeak}. "". ${exampleToSpeak}`
      );
    } else {
      utterance = new SpeechSynthesisUtterance(textToSpeak);
    }

    utterance.lang = language || "en-US";
    utterance.pitch = 1;
    utterance.rate = 1;

    window.speechSynthesis.speak(utterance);
    // speakWithVoice(utterance);
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
