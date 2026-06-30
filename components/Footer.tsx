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
    <footer className="bg-card border-t border-border py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="md:grid md:grid-cols-3 md:gap-12">
          {/* Brand */}
          <div>
            <span className="font-serif font-bold text-xl text-text">
              Deferred Authority
            </span>
            <p className="font-sans text-muted text-sm mt-2">{t('footer.tagline')}</p>
          </div>

          {/* Social + contact */}
          <div className="mt-8 md:mt-0">
            <p className="font-sans text-muted text-xs uppercase tracking-widest mb-4">Connect</p>
            <div className="flex gap-4 mb-3">
              {/* Instagram */}
              <a href="https://www.instagram.com/deferredauthority" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted hover:text-accent transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/deferred-authority/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted hover:text-accent transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://youtube.com/@deferredauthority" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-muted hover:text-accent transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
            <a
              href="mailto:hello@deferredauthority.com"
              className="font-sans text-muted text-sm hover:text-accent transition-colors"
            >
              hello@deferredauthority.com
            </a>
          </div>

          {/* Links + lang */}
          <div className="mt-8 md:mt-0 flex flex-col gap-3 items-start">
            <a href="#" className="font-sans text-muted text-sm hover:text-text transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-sans text-muted text-sm hover:text-text transition-colors">
              Terms
            </a>
            <div className="flex rounded-full border border-border overflow-hidden mt-2">
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
        </div>

        <div className="mt-10 pt-8 border-t border-border flex items-center justify-between">
          <span className="font-sans text-muted/50 text-xs">{t('footer.copyright')}</span>
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-sans text-muted/50 text-xs hover:text-muted transition-colors"
          >
            ↑ Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
