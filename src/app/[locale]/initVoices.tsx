"use client";

import { useEffect } from "react";

export const InitVoices = () => {
  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  return null; // el componente sólo carga las voces, no devuelveve nada
};
