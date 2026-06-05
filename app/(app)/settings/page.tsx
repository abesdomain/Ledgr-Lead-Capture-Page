'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/lib/auth/UserContext';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import type { Language } from '@/lib/i18n/strings';

const LANGS: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
];

const INPUT_CLS =
  'w-full border border-gray-200 rounded-xl px-4 py-3 text-brand-navy focus:outline-none focus:border-brand-teal';

export default function SettingsPage() {
  const { user } = useUser();
  const { t, language, setLanguage } = useLanguage();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(user?.email ?? '');
  const [businessName, setBusinessName] = useState('Independent Contractor');
  const [currency, setCurrency] = useState('USD');
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(false), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const initial = user?.email?.[0]?.toUpperCase() ?? '?';

  return (
    <div className="page-fade-in max-w-6xl mx-auto px-6 py-8">
      <h1 className="font-display text-2xl font-bold text-brand-navy">{t('app.settings.heading')}</h1>

      {/* Profile section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mt-6">
        <h2 className="font-display font-semibold text-lg text-brand-navy mb-6">{t('app.settings.profile')}</h2>

        <div className="flex flex-col md:flex-row md:items-start gap-8">
          {/* Avatar */}
          <div className="flex justify-center md:justify-start flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-brand-teal text-white text-2xl font-bold flex items-center justify-center">
              {initial}
            </div>
          </div>

          {/* Form */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-1">{t('app.settings.firstName')}</label>
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className={INPUT_CLS} />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-1">{t('app.settings.lastName')}</label>
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className={INPUT_CLS} />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-1">{t('app.settings.email')}</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={INPUT_CLS} />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-1">{t('app.settings.businessName')}</label>
                <input type="text" value={businessName} onChange={e => setBusinessName(e.target.value)} className={INPUT_CLS} />
              </div>
            </div>

            <button
              onClick={() => setToast(true)}
              className="mt-6 bg-brand-teal text-white rounded-full px-8 py-3 font-semibold hover:bg-teal-400 transition-colors"
            >
              {t('app.settings.saveChanges')}
            </button>
          </div>
        </div>
      </div>

      {/* Preferences section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mt-6">
        <h2 className="font-display font-semibold text-lg text-brand-navy mb-6">{t('app.settings.preferences')}</h2>

        {/* Language row */}
        <div className="flex justify-between items-center py-4 border-b border-gray-100">
          <div>
            <p className="text-sm font-medium text-brand-navy">{t('app.settings.language')}</p>
            <p className="text-xs text-gray-400 mt-0.5">{t('app.settings.languageDesc')}</p>
          </div>
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

        {/* Currency row */}
        <div className="flex justify-between items-center py-4 border-b border-gray-100">
          <div>
            <p className="text-sm font-medium text-brand-navy">{t('app.settings.currency')}</p>
            <p className="text-xs text-gray-400 mt-0.5">{t('app.settings.currencyDesc')}</p>
          </div>
          <select
            value={currency}
            onChange={e => setCurrency(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-brand-navy focus:outline-none focus:border-brand-teal"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>

        {/* Notifications row */}
        <div className="flex justify-between items-center py-4">
          <div>
            <p className="text-sm font-medium text-brand-navy">{t('app.settings.notifications')}</p>
            <p className="text-xs text-gray-400 mt-0.5">{t('app.settings.notificationsDesc')}</p>
          </div>
          <button
            role="switch"
            aria-checked={notificationsOn}
            onClick={() => setNotificationsOn(prev => !prev)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
              notificationsOn ? 'bg-brand-teal' : 'bg-gray-200'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                notificationsOn ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-brand-navy text-white px-6 py-3 rounded-full shadow-lg text-sm font-medium z-50">
          {t('app.settings.toast')}
        </div>
      )}
    </div>
  );
}
