import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // lista de locales disponibles
  locales: ["en", "es"],

  // el locale por defecto
  defaultLocale: "es",
});
