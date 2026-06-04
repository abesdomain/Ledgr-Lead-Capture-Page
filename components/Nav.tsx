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
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-gray-200/60 bg-white/80">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <span className="font-display font-bold text-xl text-brand-navy select-none">
          Ledgr
          <span className="inline-block w-1.5 h-1.5 rounded-sm bg-brand-teal ml-0.5 mb-1 align-middle" aria-hidden="true" />
        </span>

        {/* Language toggle */}
        <div className="flex rounded-full border border-brand-navy/20 overflow-hidden">
          {LANGS.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => setLanguage(code)}
              aria-pressed={code === language}
              className={`px-4 py-1.5 text-xs font-semibold tracking-wide transition-colors ${
                code === language
                  ? 'bg-brand-teal text-white'
                  : 'bg-transparent text-brand-navy hover:bg-brand-navy/5'
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
