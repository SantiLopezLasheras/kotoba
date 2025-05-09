"use client";

import { Speaker } from "lucide-react";

interface Props {
  textToSpeak?: string | null;
  exampleToSpeak?: string | null;
  language?: string;
}

export const AudioButton = ({
  textToSpeak,
  exampleToSpeak,
  language,
}: Props) => {
  const handleAudioClick = () => {
    const languageMap: Record<string, string> = {
      chino: "zh-CN",
      inglés: "en-US",
      japonés: "ja-JP",
      español: "es-ES",
      alemán: "de-DE",
      francés: "fr-FR",
      italiano: "it-IT",
      coreano: "ko-KR",
      portugués: "pt-BR",
      cantonés: "zh-HK",
    };

    const resolvedLang = languageMap[language || ""] || language || "en-US";

    // const speak = (text: string) => {
    //   const utterance = new SpeechSynthesisUtterance(text);
    //   utterance.lang = resolvedLang;
    //   utterance.pitch = 1;
    //   utterance.rate = 1;
    //   window.speechSynthesis.speak(utterance);
    // };

    const speak = (text: string) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = resolvedLang;

      // Ajustes para modificar el tono y velocidad según idioma
      switch (resolvedLang) {
        case "zh-CN":
          utterance.pitch = 1.1;
          utterance.rate = 1;
          break;
        case "ja-JP":
          utterance.pitch = 1.2;
          utterance.rate = 0.9;
          break;
        case "de-DE":
          utterance.pitch = 0.9;
          utterance.rate = 1;
          break;
        case "ko-KR":
          utterance.pitch = 1.1;
          utterance.rate = 1;
          break;
        default:
          utterance.pitch = 1;
          utterance.rate = 1;
      }

      window.speechSynthesis.speak(utterance);
    };

    if (textToSpeak) speak(textToSpeak);
    if (exampleToSpeak) speak(exampleToSpeak);
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
