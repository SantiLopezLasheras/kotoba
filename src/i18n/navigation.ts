import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// lightweight wrapper around next-intl's navigation
// APIs que tienen en consideración la conguración de rutas
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
