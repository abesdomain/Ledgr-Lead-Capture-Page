'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import type { Language } from '@/lib/i18n/strings';

const LANGS: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
];

export default function Footer() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <footer className="bg-brand-navy border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:justify-between md:items-start">
          <div>
            <span className="font-display text-white font-bold text-xl">
              Ledgr
              <span
                className="inline-block w-1.5 h-1.5 rounded-sm bg-brand-teal ml-0.5 mb-1 align-middle"
                aria-hidden="true"
              />
            </span>
            <p className="text-white/50 text-sm mt-1">{t('footer.tagline')}</p>
          </div>

          <div className="flex gap-6 items-center mt-6 md:mt-0">
            <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">
              Terms
            </a>

            <div className="flex rounded-full border border-white/30 overflow-hidden">
              {LANGS.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => setLanguage(code)}
                  aria-pressed={code === language}
                  className={`px-4 py-1.5 text-xs font-semibold tracking-wide transition-colors ${
                    code === language
                      ? 'bg-brand-teal text-white'
                      : 'bg-transparent text-white/50 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <span className="text-white/30 text-xs">{t('footer.copyright')}</span>
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-white/30 text-xs ml-6 hover:text-white/60 transition-colors"
          >
            ↑ Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
