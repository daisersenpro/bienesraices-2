"use client";

import { setLanguage } from "../actions/language";
import { localeOptions, type Locale } from "../i18n/config";

export function LanguageSelector({ locale, label }: { locale: Locale; label: string }) {
  const selected = localeOptions.find((option) => option.code === locale) ?? localeOptions[0];

  return (
    <form action={setLanguage} className="flex items-center gap-1.5 rounded-lg border border-nordic/10 bg-white/70 px-2 py-1.5">
      <span aria-hidden="true" className="text-base">{selected.flag}</span>
      <label htmlFor="language-select" className="sr-only">{label}</label>
      <select id="language-select" name="locale" defaultValue={locale} onChange={(event) => event.currentTarget.form?.requestSubmit()} className="max-w-[92px] cursor-pointer border-0 bg-transparent p-0 pr-5 text-xs font-medium text-nordic outline-none focus:ring-0" aria-label={label}>
        {localeOptions.map((option) => <option key={option.code} value={option.code}>{option.flag} {option.label}</option>)}
      </select>
    </form>
  );
}
