import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { translations } from "../data/translations";
import type { Language, LanguageState } from "../types";

interface LanguageContextType extends LanguageState {
  children?: ReactNode;
}

const LanguageContext = createContext<LanguageState | undefined>(undefined);

// Custom hook for language management that works across islands
export function useLanguageStorage() {
  const [currentLanguage, setCurrentLanguageState] =
    useState<Language["code"]>("es");

  useEffect(() => {
    // Check for saved language preference or default to Spanish
    const savedLanguage = localStorage.getItem(
      "portfolio-language"
    ) as Language["code"];
    const browserLanguage = navigator.language.startsWith("es") ? "es" : "en";
    const initialLanguage = savedLanguage || browserLanguage;

    setCurrentLanguageState(initialLanguage);
    document.documentElement.lang = initialLanguage;

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "portfolio-language" && e.newValue) {
        setCurrentLanguageState(e.newValue as Language["code"]);
        document.documentElement.lang = e.newValue;
      }
    };

    // Listen for custom language change events
    const handleLanguageChange = (e: CustomEvent<Language["code"]>) => {
      setCurrentLanguageState(e.detail);
      document.documentElement.lang = e.detail;
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(
      "languageChange",
      handleLanguageChange as EventListener
    );

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "languageChange",
        handleLanguageChange as EventListener
      );
    };
  }, []);

  const setLanguage = useCallback((lang: Language["code"]) => {
    setCurrentLanguageState(lang);
    localStorage.setItem("portfolio-language", lang);
    document.documentElement.lang = lang;

    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent("languageChange", { detail: lang }));
  }, []);

  const t = useCallback(
    (key: string): string => {
      const translation = translations[key];
      return translation ? translation[currentLanguage] : key;
    },
    [currentLanguage]
  );

  return {
    currentLanguage,
    setLanguage,
    t,
  };
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const languageState = useLanguageStorage();

  return (
    <LanguageContext.Provider value={languageState}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageState {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    // Fallback to storage-based hook when not within provider
    return useLanguageStorage();
  }
  return context;
}
