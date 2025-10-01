import { useState, useEffect, useCallback, useMemo } from "react";
import type {
  LanguageOption,
  LanguageState,
  ThemeState,
  FormState,
} from "../types";
import { translations, languageOptions } from "../data/translations";

// Theme Hook
export function useTheme(): ThemeState {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem("portfolio-theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const shouldUseDark = savedTheme
      ? savedTheme === "dark"
      : systemPrefersDark;
    setIsDark(shouldUseDark);

    // Apply theme to document
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  const toggle = useCallback(() => {
    setIsDark((prev) => {
      const newTheme = !prev;
      localStorage.setItem("portfolio-theme", newTheme ? "dark" : "light");
      document.documentElement.classList.toggle("dark", newTheme);
      return newTheme;
    });
  }, []);

  return { isDark, toggle };
}

// Language Hook
export function useLanguage(): LanguageState {
  const [currentLanguage, setCurrentLanguage] =
    useState<LanguageOption["code"]>("es");

  useEffect(() => {
    // Check for saved language preference or default to Spanish
    const savedLanguage = localStorage.getItem(
      "portfolio-language",
    ) as LanguageOption["code"];
    const browserLanguage = navigator.language.startsWith("es") ? "es" : "en";

    const initialLanguage = savedLanguage || browserLanguage;
    setCurrentLanguage(initialLanguage);

    // Set document language
    document.documentElement.lang = initialLanguage;
  }, []);

  const setLanguage = useCallback((lang: LanguageOption["code"]) => {
    setCurrentLanguage(lang);
    localStorage.setItem("portfolio-language", lang);
    document.documentElement.lang = lang;
  }, []);

  const t = useCallback(
    (key: string): string => {
      const translation = translations[key];
      return translation ? translation[currentLanguage] : key;
    },
    [currentLanguage],
  );

  return { currentLanguage, setLanguage, t };
}

// Form State Hook
export function useFormState(initialState?: Partial<FormState>): FormState & {
  setIsSubmitting: (isSubmitting: boolean) => void;
  setIsSuccess: (isSuccess: boolean) => void;
  setError: (error?: string) => void;
  reset: () => void;
} {
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    error: undefined,
    ...initialState,
  });

  const setIsSubmitting = useCallback((isSubmitting: boolean) => {
    setFormState((prev) => ({ ...prev, isSubmitting, error: undefined }));
  }, []);

  const setIsSuccess = useCallback((isSuccess: boolean) => {
    setFormState((prev) => ({
      ...prev,
      isSuccess,
      isSubmitting: false,
      error: undefined,
    }));
  }, []);

  const setError = useCallback((error?: string) => {
    setFormState((prev) => ({
      ...prev,
      error,
      isSubmitting: false,
      isSuccess: false,
    }));
  }, []);

  const reset = useCallback(() => {
    setFormState({
      isSubmitting: false,
      isSuccess: false,
      error: undefined,
    });
  }, []);

  return {
    ...formState,
    setIsSubmitting,
    setIsSuccess,
    setError,
    reset,
  };
}

// Local Storage Hook
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue],
  );

  return [storedValue, setValue];
}

// Intersection Observer Hook for animations
export function useIntersectionObserver(
  ref: React.RefObject<HTMLElement | null>,
  options: IntersectionObserverInit = {},
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, options, hasIntersected]);

  return { isIntersecting, hasIntersected };
}

// Media Query Hook
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

// Scroll Direction Hook
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";

      if (
        direction !== scrollDirection &&
        Math.abs(scrollY - lastScrollY) > 10
      ) {
        setScrollDirection(direction);
      }
      setLastScrollY(scrollY > 0 ? scrollY : 0);
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, [scrollDirection, lastScrollY]);

  return scrollDirection;
}

// Debounce Hook
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Available Languages Hook
export function useLanguages() {
  return useMemo(() => languageOptions, []);
}

// Keyboard Navigation Hook
export function useKeyboardNavigation(callback: (key: string) => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Handle escape key for modals
      if (event.key === "Escape") {
        callback("Escape");
      }
      // Handle arrow keys for navigation
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
      ) {
        callback(event.key);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [callback]);
}

// Copy to Clipboard Hook
export function useCopyToClipboard() {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      return true;
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      return false;
    }
  }, []);

  return { isCopied, copyToClipboard };
}
