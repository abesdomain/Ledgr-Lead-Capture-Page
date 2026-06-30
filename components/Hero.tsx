'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-bg min-h-screen flex flex-col justify-center py-20 md:py-32">
      {/* Subtle dot-grid background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dot-grid"
            x="0"
            y="0"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.5" cy="1.5" r="1" fill="#C9913D" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" opacity="0.06" />
      </svg>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">
        <div
          role="banner"
          className="fade-in flex flex-col items-start text-left max-w-3xl"
        >
          <h1 className="font-serif font-bold text-text text-4xl md:text-6xl leading-tight">
            {t('hero.headline')}
          </h1>

          <p className="font-sans text-muted text-lg md:text-xl max-w-2xl mt-8 leading-relaxed">
            {t('hero.subheadline')}
          </p>

          <a
            href="#waitlist"
            className="mt-12 inline-block bg-accent text-bg font-sans font-semibold rounded-lg px-8 py-4 hover:bg-accent/90 transition-colors"
          >
            {t('hero.cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
