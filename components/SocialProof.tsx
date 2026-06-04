'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const STAT_KEYS = [
  { valueKey: 'proof.stat1.value', labelKey: 'proof.stat1.label' },
  { valueKey: 'proof.stat2.value', labelKey: 'proof.stat2.label' },
  { valueKey: 'proof.stat3.value', labelKey: 'proof.stat3.label' },
];

const TESTIMONIALS = [
  { quoteKey: 'proof.testimonial1.quote', authorKey: 'proof.testimonial1.author' },
  { quoteKey: 'proof.testimonial2.quote', authorKey: 'proof.testimonial2.author' },
];

const PRESS = ['Forbes', 'TechCrunch', 'Univision', 'Product Hunt'];

/** Extract a numeric value + surrounding prefix/suffix from a display string.
 *  "94%" → { prefix: "", num: 94, suffix: "%" }
 *  "2 min" → { prefix: "", num: 2, suffix: " min" }
 *  "$0"    → { prefix: "$", num: 0, suffix: "" }
 */
function parseStatValue(raw: string): { prefix: string; num: number; suffix: string } {
  const m = raw.match(/^([^0-9]*)([0-9]+(?:[.,][0-9]+)?)(.*)$/);
  if (!m) return { prefix: '', num: 0, suffix: raw };
  return { prefix: m[1], num: parseFloat(m[2].replace(',', '.')), suffix: m[3] };
}

export default function SocialProof() {
  const { t, language } = useLanguage();
  const statsRef   = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  // displayValues drives what's shown; initialized to current translations
  const [displayValues, setDisplayValues] = useState<string[]>(() =>
    STAT_KEYS.map(s => t(s.valueKey)),
  );

  // Keep display values in sync with language changes.
  // t is intentionally omitted: we depend on language (not the function reference).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setDisplayValues(STAT_KEYS.map(s => t(s.valueKey)));
  }, [language]);

  // Counter animation on scroll
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      animatedRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animatedRef.current) return;
        animatedRef.current = true;
        observer.disconnect();

        STAT_KEYS.forEach(({ valueKey }, index) => {
          const rawValue = t(valueKey);
          const { prefix, num, suffix } = parseStatValue(rawValue);
          if (num === 0) return; // nothing to animate

          const DURATION = 1500;
          const startTime = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / DURATION, 1);
            const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const current  = num * eased;
            const formatted = Number.isInteger(num)
              ? String(Math.round(current))
              : current.toFixed(1);

            setDisplayValues(prev => {
              const next = [...prev];
              next[index] = progress < 1 ? `${prefix}${formatted}${suffix}` : rawValue;
              return next;
            });

            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally runs once: captures t at first intersection; language sync is handled above

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {STAT_KEYS.map(({ labelKey }, i) => (
            <div key={labelKey}>
              <div className="font-display text-5xl font-bold text-brand-navy">
                {displayValues[i]}
              </div>
              <div className="font-body text-gray-500 text-sm uppercase tracking-wide mt-1">
                {t(labelKey)}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {TESTIMONIALS.map(({ quoteKey, authorKey }) => (
            <div
              key={quoteKey}
              className="bg-brand-surface rounded-2xl p-8 border-l-4 border-brand-teal"
            >
              <p className="font-body text-lg italic text-brand-navy">
                {t(quoteKey)}
              </p>
              <p className="font-body text-sm text-gray-500 mt-4 not-italic">
                {t(authorKey)}
              </p>
            </div>
          ))}
        </div>

        {/* As Seen In */}
        <div className="mt-16 text-center">
          <p className="text-gray-300 uppercase tracking-widest text-xs mb-6">
            AS SEEN IN
          </p>
          <div className="flex flex-wrap justify-center items-center">
            {PRESS.map(name => (
              <span
                key={name}
                className="font-display font-semibold text-xl text-gray-300 mx-6 my-2"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
