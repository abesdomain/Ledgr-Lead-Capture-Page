'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

function AuditIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
      stroke="#C9913D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <rect x="7" y="4" width="26" height="32" rx="3" />
      <line x1="13" y1="14" x2="27" y2="14" />
      <line x1="13" y1="21" x2="27" y2="21" />
      <line x1="13" y1="28" x2="21" y2="28" />
    </svg>
  );
}

function GapIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
      stroke="#C9913D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <rect x="4"  y="26" width="8" height="10" rx="1" />
      <rect x="16" y="16" width="8" height="20" rx="1" />
      <rect x="28" y="8"  width="8" height="28" rx="1" />
      <line x1="2" y1="37" x2="38" y2="37" />
    </svg>
  );
}

function SignalIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
      stroke="#C9913D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M20 32V20" />
      <path d="M13 28a10 10 0 0 1 14 0" />
      <path d="M7 34a18 18 0 0 1 26 0" />
      <circle cx="20" cy="16" r="2" fill="#C9913D" stroke="none" />
    </svg>
  );
}

const CARDS = [
  { Icon: AuditIcon, titleKey: 'features.invoicing.title', bodyKey: 'features.invoicing.body' },
  { Icon: GapIcon,   titleKey: 'features.expenses.title',  bodyKey: 'features.expenses.body'  },
  { Icon: SignalIcon, titleKey: 'features.payments.title', bodyKey: 'features.payments.body'  },
];

export default function Features() {
  const { t } = useLanguage();

  return (
    <section className="bg-card py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-sans font-bold text-text text-3xl md:text-4xl text-center">
          {t('features.heading')}
        </h2>
        <p className="font-sans text-muted text-base md:text-lg text-center mt-4 max-w-2xl mx-auto leading-relaxed">
          {t('features.subheading')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {CARDS.map(({ Icon, titleKey, bodyKey }) => (
            <div
              key={titleKey}
              className="bg-bg rounded-xl border border-border p-8 hover:-translate-y-0.5 hover:border-accent/40 transition-all duration-200"
            >
              <Icon />
              <h3 className="font-sans font-semibold text-lg text-text mt-5">
                {t(titleKey)}
              </h3>
              <p className="font-sans text-muted text-sm mt-2 leading-relaxed">
                {t(bodyKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
