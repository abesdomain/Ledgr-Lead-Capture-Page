'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

const TEAL = '#00D8A4';

function InvoicingIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
      stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <rect x="7" y="4" width="26" height="32" rx="3" />
      <line x1="13" y1="14" x2="27" y2="14" />
      <line x1="13" y1="21" x2="27" y2="21" />
      <line x1="13" y1="28" x2="21" y2="28" />
    </svg>
  );
}

function ExpensesIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
      stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <rect x="4"  y="26" width="8" height="10" rx="1" />
      <rect x="16" y="18" width="8" height="18" rx="1" />
      <rect x="28" y="10" width="8" height="26" rx="1" />
      <line x1="2" y1="37" x2="38" y2="37" />
    </svg>
  );
}

function PaymentsIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
      stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M24 3L11 22h10L15 37 29 18H19L24 3z" />
    </svg>
  );
}

const CARDS = [
  { Icon: InvoicingIcon, titleKey: 'features.invoicing.title', bodyKey: 'features.invoicing.body' },
  { Icon: ExpensesIcon,  titleKey: 'features.expenses.title',  bodyKey: 'features.expenses.body'  },
  { Icon: PaymentsIcon,  titleKey: 'features.payments.title',  bodyKey: 'features.payments.body'  },
];

export default function Features() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display font-bold text-brand-navy text-3xl md:text-4xl text-center">
          {t('features.heading')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {CARDS.map(({ Icon, titleKey, bodyKey }) => (
            <div
              key={titleKey}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:-translate-y-1 hover:shadow-md transition-all duration-200"
            >
              <Icon />
              <h3 className="font-display font-semibold text-xl text-brand-navy mt-4">
                {t(titleKey)}
              </h3>
              <p className="font-body text-gray-500 text-base mt-2 leading-relaxed">
                {t(bodyKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
