'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import type { Language } from '@/lib/i18n/strings';

const LANGS: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
];

export default function Nav() {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-border bg-bg/90">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <span className="font-serif font-bold text-xl text-text select-none">
          Deferred Authority
        </span>

        {/* Language toggle */}
        <div className="flex rounded-full border border-border overflow-hidden">
          {LANGS.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => setLanguage(code)}
              aria-pressed={code === language}
              className={`px-4 py-1.5 text-xs font-semibold tracking-wide transition-colors ${
                code === language
                  ? 'bg-accent text-bg'
                  : 'bg-transparent text-muted hover:text-text'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
