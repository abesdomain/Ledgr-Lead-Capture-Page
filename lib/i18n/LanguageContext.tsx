'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { translations, type Language } from './strings';

const STORAGE_KEY = 'ledgr-lang';

function detectInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
  if (stored === 'en' || stored === 'es') return stored;
  if (navigator.language.startsWith('es')) return 'es';
  return 'en';
}

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    setLanguageState(detectInitialLanguage());
  }, []);

  function setLanguage(lang: Language) {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }

  function t(key: string): string {
    return translations[language][key] ?? key;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used inside <LanguageProvider>');
  }
  return ctx;
}
