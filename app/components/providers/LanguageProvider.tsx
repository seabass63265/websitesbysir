"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Lang = "en" | "es";

// Same key LanguageToast has always saved the visitor's choice under.
const STORAGE_KEY = "sir_lang";
const CHANGE_EVENT = "sir:lang-change";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
});

function readStored(): Lang | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "es" || value === "en" ? value : null;
  } catch {
    return null;
  }
}

/**
 * Site-wide language switch. Everything renders in English on the server
 * (and on first paint) — once mounted, this picks up a previously-saved
 * `sir_lang` choice from localStorage, and LanguageToast calls `setLang`
 * directly the moment someone picks Español, so the whole page updates
 * instantly without a reload. No routing/URL changes, matching the
 * client-only prompt this was built around.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = readStored();
    if (stored) setLangState(stored);

    // Keep every mounted instance of the provider tree in sync (there's only
    // ever one in practice, but this also covers other tabs via `storage`).
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      if (event.newValue === "es" || event.newValue === "en") {
        setLangState(event.newValue);
      }
    };
    const onCustom = (event: Event) => {
      const detail = (event as CustomEvent<Lang>).detail;
      if (detail === "es" || detail === "en") setLangState(detail);
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener(CHANGE_EVENT, onCustom as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(CHANGE_EVENT, onCustom as EventListener);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage blocked (private mode etc.) — the choice just won't persist.
    }
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: next }));
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

/**
 * `const t = useT(); t("English copy", "Copia en español")` — inline
 * bilingual text for any client component under LanguageProvider. Returns
 * the English string until a saved/chosen language says otherwise.
 */
export function useT() {
  const { lang } = useLanguage();
  return useCallback(
    (en: string, es: string) => (lang === "es" ? es : en),
    [lang]
  );
}
