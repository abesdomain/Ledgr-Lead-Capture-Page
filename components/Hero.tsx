'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

function PulseRings() {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full h-full max-w-md"
    >
      {/* Center point */}
      <circle cx="200" cy="200" r="5" fill="#C9913D" opacity="0.45" />

      {/* Concentric rings — alternating gold / sage, fading outward */}
      <circle cx="200" cy="200" r="28"  stroke="#C9913D" strokeWidth="1.2" opacity="0.38" />
      <circle cx="200" cy="200" r="55"  stroke="#4A6B5E" strokeWidth="1"   opacity="0.30" />
      <circle cx="200" cy="200" r="84"  stroke="#C9913D" strokeWidth="1"   opacity="0.22" />
      <circle cx="200" cy="200" r="114" stroke="#4A6B5E" strokeWidth="0.8" opacity="0.16" />
      <circle cx="200" cy="200" r="146" stroke="#C9913D" strokeWidth="0.8" opacity="0.12" />
      <circle cx="200" cy="200" r="180" stroke="#4A6B5E" strokeWidth="0.6" opacity="0.09" />
      <circle cx="200" cy="200" r="216" stroke="#C9913D" strokeWidth="0.6" opacity="0.06" />
    </svg>
  );
}

export default function Hero() {
  const { t, language } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-bg min-h-screen flex flex-col justify-center py-20 lg:py-32">
      {/* Dot-grid background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dot-grid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1" fill="#C9913D" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" opacity="0.06" />
      </svg>

      {/* Two-column content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="fade-in lg:grid lg:grid-cols-[3fr_2fr] lg:gap-16 items-center">

          {/* Left column — text */}
          <div role="banner" className="flex flex-col items-start text-left">

            {/* Eyebrow */}
            <p className="font-mono text-muted text-xs tracking-widest uppercase mb-6">
              A Signal Diagnostic for People Who Are Accurate but Overlooked
            </p>

            {/* Headline */}
            <h1 className="font-serif font-bold text-text text-4xl md:text-5xl lg:text-6xl leading-tight">
              {language === 'es' ? (
                <>No tienes un problema de confianza. Tienes un problema de{' '}
                  <span className="text-accent">timing</span>.</>
              ) : (
                <>You don&apos;t have a confidence problem. You have a{' '}
                  <span className="text-accent">timing</span> problem.</>
              )}
            </h1>

            {/* Subheadline */}
            <p className="font-sans text-muted text-lg md:text-xl mt-8 leading-relaxed">
              {t('hero.subheadline')}
            </p>

            {/* CTA */}
            <a
              href="#waitlist"
              className="mt-10 inline-block bg-accent text-bg font-sans font-semibold rounded-lg px-8 py-4 hover:bg-accent/90 transition-colors"
            >
              {t('hero.cta')}
            </a>

            {/* Proof / process line */}
            <p className="font-mono text-muted/60 text-xs mt-5 tracking-wide">
              Take the audit&nbsp;&middot;&nbsp;Get your gap diagnosis&nbsp;&middot;&nbsp;Apply for the founding cohort
            </p>

          </div>

          {/* Right column — pulse rings visual, desktop only */}
          <div className="hidden lg:flex items-center justify-center opacity-80">
            <PulseRings />
          </div>

        </div>
      </div>
    </section>
  );
}
