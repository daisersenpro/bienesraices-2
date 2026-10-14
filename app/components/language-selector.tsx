"use client";

import { setLanguage } from "../actions/language";
import { localeOptions, type Locale } from "../i18n/config";
import { useState } from "react";

export function LanguageSelector({ locale, label }: { locale: Locale; label: string }) {
  const selected = localeOptions.find((option) => option.code === locale) ?? localeOptions[0];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <form action={setLanguage} className="relative">
      <input type="hidden" name="locale" value={locale} />
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-nordic/10 bg-white/70 px-2.5 py-1.5 text-xs font-medium text-nordic transition-colors hover:border-mosque/50 hover:bg-white"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <FlagIcon code={selected.code} />
        <span>{selected.label}</span>
        <span className="text-[10px] text-muted">▼</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full z-[70] mt-2 min-w-[150px] overflow-hidden rounded-xl border border-nordic/10 bg-white p-1 shadow-soft" role="listbox" aria-label={label}>
          {localeOptions.map((option) => (
            <button
              key={option.code}
              type="button"
              role="option"
              aria-selected={option.code === locale}
              onClick={(event) => {
                const form = event.currentTarget.form;
                const input = form?.querySelector<HTMLInputElement>('input[name="locale"]');
                if (input && form) {
                  input.value = option.code;
                  setIsOpen(false);
                  form.requestSubmit();
                }
              }}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-nordic transition-colors hover:bg-hint ${option.code === locale ? "bg-[#e7f2fb] font-semibold" : ""}`}
            >
              <FlagIcon code={option.code} />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </form>
  );
}

function FlagIcon({ code }: { code: Locale }) {
  const countryCode = code === "es" ? "cl" : code === "en" ? "us" : code === "pt" ? "br" : code === "fr" ? "fr" : code === "zh" ? "cn" : "kr";

  return (
    <span
      aria-hidden="true"
      className="inline-block h-3.5 w-5 shrink-0 rounded-sm bg-cover bg-center shadow-sm"
      style={{ backgroundImage: `url(https://flagcdn.com/w40/${countryCode}.png)` }}
    />
  );
}
