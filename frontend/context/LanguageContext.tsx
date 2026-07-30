"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import tr from "@/locales/tr.json";
import en from "@/locales/en.json";

type Locale = "tr" | "en";

const translations = { tr, en };

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("tr");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Detect language on client mount to avoid SSR hydration mismatch
    const savedLocale = localStorage.getItem("locale") as Locale;
    if (savedLocale === "tr" || savedLocale === "en") {
      setLocaleState(savedLocale);
      document.documentElement.lang = savedLocale;
    } else {
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "en") {
        setLocaleState("en");
        document.documentElement.lang = "en";
      } else {
        setLocaleState("tr");
        document.documentElement.lang = "tr";
      }
    }
    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
    document.documentElement.lang = newLocale;
  };

  const t = (key: string, variables?: Record<string, string | number>): string => {
    const keys = key.split(".");
    
    // During SSR or before mounting, always fallback to Turkish to avoid hydration mismatches
    const currentLocale = mounted ? locale : "tr";
    let value: any = translations[currentLocale];
    
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Fallback to Turkish if key is missing in English
        let fallbackValue: any = translations["tr"];
        for (const fk of keys) {
          if (fallbackValue && typeof fallbackValue === "object" && fk in fallbackValue) {
            fallbackValue = fallbackValue[fk];
          } else {
            fallbackValue = undefined;
            break;
          }
        }
        return typeof fallbackValue === "string" ? fallbackValue : key;
      }
    }

    if (typeof value !== "string") {
      // If it's an array (like highlights, stats, process), return key or let caller handle it.
      // But we can support joining or index fetching. Let's return the key for now.
      return key;
    }

    if (variables) {
      return Object.entries(variables).reduce((acc, [k, v]) => {
        return acc.replace(new RegExp(`{${k}}`, "g"), String(v));
      }, value);
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}
