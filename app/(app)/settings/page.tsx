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
  'w-full border border-border bg-bg rounded-lg px-4 py-3 text-text focus:outline-none focus:border-accent font-sans';

export default function SettingsPage() {
  const { user } = useUser();
  const { t, language, setLanguage } = useLanguage();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(user?.email ?? '');
  const [organization, setOrganization] = useState('');
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
      <h1 className="font-sans text-2xl font-bold text-text">{t('app.settings.heading')}</h1>

      {/* Profile section */}
      <div className="bg-card rounded-xl p-8 border border-border mt-6">
        <h2 className="font-sans font-semibold text-lg text-text mb-6">{t('app.settings.profile')}</h2>

        <div className="flex flex-col md:flex-row md:items-start gap-8">
          {/* Avatar */}
          <div className="flex justify-center md:justify-start flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-accent/20 text-accent text-2xl font-bold flex items-center justify-center font-mono">
              {initial}
            </div>
          </div>

          {/* Form */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted mb-1 font-sans">{t('app.settings.firstName')}</label>
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className={INPUT_CLS} />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-1 font-sans">{t('app.settings.lastName')}</label>
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className={INPUT_CLS} />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-1 font-sans">{t('app.settings.email')}</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={INPUT_CLS} />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-1 font-sans">{t('app.settings.businessName')}</label>
                <input type="text" value={organization} onChange={e => setOrganization(e.target.value)} className={INPUT_CLS} />
              </div>
            </div>

            <button
              onClick={() => setToast(true)}
              className="mt-6 bg-accent text-bg rounded-lg px-8 py-3 font-sans font-semibold hover:bg-accent/90 transition-colors"
            >
              {t('app.settings.saveChanges')}
            </button>
          </div>
        </div>
      </div>

      {/* Preferences section */}
      <div className="bg-card rounded-xl p-8 border border-border mt-6">
        <h2 className="font-sans font-semibold text-lg text-text mb-6">{t('app.settings.preferences')}</h2>

        {/* Language row */}
        <div className="flex justify-between items-center py-4 border-b border-border">
          <div>
            <p className="font-sans text-sm font-medium text-text">{t('app.settings.language')}</p>
            <p className="font-sans text-xs text-muted mt-0.5">{t('app.settings.languageDesc')}</p>
          </div>
          <div className="flex rounded-full border border-border overflow-hidden">
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

        {/* Currency row */}
        <div className="flex justify-between items-center py-4 border-b border-border">
          <div>
            <p className="font-sans text-sm font-medium text-text">{t('app.settings.currency')}</p>
            <p className="font-sans text-xs text-muted mt-0.5">{t('app.settings.currencyDesc')}</p>
          </div>
          <select
            value={currency}
            onChange={e => setCurrency(e.target.value)}
            className="border border-border bg-bg rounded-lg px-3 py-2 font-sans text-sm text-text focus:outline-none focus:border-accent"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>

        {/* Notifications row */}
        <div className="flex justify-between items-center py-4">
          <div>
            <p className="font-sans text-sm font-medium text-text">{t('app.settings.notifications')}</p>
            <p className="font-sans text-xs text-muted mt-0.5">{t('app.settings.notificationsDesc')}</p>
          </div>
          <button
            role="switch"
            aria-checked={notificationsOn}
            onClick={() => setNotificationsOn(prev => !prev)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
              notificationsOn ? 'bg-accent' : 'bg-border'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-bg shadow transition-transform duration-200 ${
                notificationsOn ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-card border border-border text-text px-6 py-3 rounded-lg shadow-lg font-sans text-sm font-medium z-50">
          {t('app.settings.toast')}
        </div>
      )}
    </div>
  );
}
