'use client';

import { Fragment, useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const STEPS = [
  { num: '1', titleKey: 'hiw.1.title', bodyKey: 'hiw.1.body' },
  { num: '2', titleKey: 'hiw.2.title', bodyKey: 'hiw.2.body' },
  { num: '3', titleKey: 'hiw.3.title', bodyKey: 'hiw.3.body', scarcityKey: 'hiw.3.scarcity' },
];

export default function HowItWorks() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    el.style.opacity = '0';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '';
          el.classList.add('animate-fadeIn');
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-bg py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-sans font-bold text-text text-3xl md:text-4xl text-center">
          {t('hiw.heading')}
        </h2>

        <div className="flex flex-col md:flex-row items-start gap-8 mt-14">
          {STEPS.map((step, i) => (
            <Fragment key={step.num}>
              <div className="flex-1 relative">
                <span
                  className="absolute top-0 left-0 font-mono font-bold text-6xl text-accent opacity-20 leading-none select-none"
                  aria-hidden="true"
                >
                  {step.num}
                </span>
                <h3 className="font-sans font-semibold text-lg text-text pt-10">
                  {t(step.titleKey)}
                </h3>
                <p className="font-sans text-muted text-sm mt-2 leading-relaxed">
                  {t(step.bodyKey)}
                </p>
                {step.scarcityKey && (
                  <p className="font-mono text-urgent text-xs mt-3">
                    {t(step.scarcityKey)}
                  </p>
                )}
              </div>

              {i < STEPS.length - 1 && (
                <div className="hidden md:block bg-border h-px flex-1 self-center" />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
