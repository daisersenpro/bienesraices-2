"use server";

import { cookies } from "next/headers";
import { isLocale } from "../i18n/config";

export async function setLanguage(formData: FormData) {
  const value = String(formData.get("locale") ?? "");
  if (!isLocale(value)) throw new Error("Idioma no válido");

  const cookieStore = await cookies();
  cookieStore.set("casas-senpro-locale", value, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });
}
