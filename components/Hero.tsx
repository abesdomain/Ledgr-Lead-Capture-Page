'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-brand-navy min-h-screen flex flex-col justify-center py-20 md:py-32">
      {/* SVG dot-grid background decoration */}
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
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" opacity="0.05" />
      </svg>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div
          role="banner"
          className="fade-in flex flex-col items-center text-center md:items-start md:text-left"
        >
          <h1 className="font-display font-bold text-white text-4xl md:text-6xl max-w-3xl leading-tight">
            {t('hero.headline')}
          </h1>

          <p className="font-body text-white/70 text-lg md:text-xl max-w-xl mt-6 leading-relaxed">
            {t('hero.subheadline')}
          </p>

          <a
            href="#waitlist"
            className="mt-10 inline-block bg-brand-teal text-white font-semibold font-body rounded-full px-8 py-4 hover:scale-105 transition-transform"
          >
            {t('hero.cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
