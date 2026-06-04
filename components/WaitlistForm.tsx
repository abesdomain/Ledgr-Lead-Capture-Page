'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import type { Language } from '@/lib/i18n/strings';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistForm() {
  const { t, language } = useLanguage();

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedLang, setSelectedLang] = useState<Language>(language);
  const [formState, setFormState] = useState<FormState>('idle');
  const [touched, setTouched] = useState({ firstName: false, email: false });
  const [errors, setErrors] = useState({ firstName: false, email: false });

  useEffect(() => {
    setSelectedLang(language);
  }, [language]);

  function validateField(field: 'firstName' | 'email', value: string): boolean {
    if (field === 'firstName') return value.trim() === '';
    return !EMAIL_RE.test(value.trim());
  }

  function handleBlur(field: 'firstName' | 'email', value: string) {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
  }

  function handleChange(field: 'firstName' | 'email', value: string) {
    if (field === 'firstName') setFirstName(value);
    else setEmail(value);
    if (touched[field]) {
      setErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fnErr = validateField('firstName', firstName);
    const emErr = validateField('email', email);
    setTouched({ firstName: true, email: true });
    setErrors({ firstName: fnErr, email: emErr });
    if (fnErr || emErr) return;

    setFormState('submitting');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: firstName.trim(), email: email.trim(), language: selectedLang }),
      });
      const data = await res.json();
      if (data.ok) {
        setFormState('success');
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  }

  return (
    <section id="waitlist" className="bg-brand-navy py-20 px-6">
      <div className="max-w-lg mx-auto text-center">
        <h2 className="font-display text-3xl font-bold text-white">{t('waitlist.heading')}</h2>
        <p className="font-body text-white/70 text-lg mt-4">{t('waitlist.subheading')}</p>

        {formState === 'success' ? (
          <div className="mt-10 flex flex-col items-center">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <circle cx="24" cy="24" r="22" stroke="#00D8A4" strokeWidth="2.5" />
              <path d="M14 24l8 8 12-14" stroke="#00D8A4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-white text-xl font-semibold mt-4">{t('waitlist.success')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-10 flex flex-col gap-4 text-left">
            <div>
              <label className="block text-white/70 text-sm mb-1" htmlFor="wl-firstname">
                {t('form.firstName.label')}
              </label>
              <input
                id="wl-firstname"
                type="text"
                required
                value={firstName}
                onChange={e => handleChange('firstName', e.target.value)}
                onBlur={e => handleBlur('firstName', e.target.value)}
                placeholder={t('form.firstName.placeholder')}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-teal"
              />
              {touched.firstName && errors.firstName && (
                <p className="text-red-400 text-sm mt-1">{t('form.firstName.error')}</p>
              )}
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-1" htmlFor="wl-email">
                {t('form.email.label')}
              </label>
              <input
                id="wl-email"
                type="email"
                required
                value={email}
                onChange={e => handleChange('email', e.target.value)}
                onBlur={e => handleBlur('email', e.target.value)}
                placeholder={t('form.email.placeholder')}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-teal"
              />
              {touched.email && errors.email && (
                <p className="text-red-400 text-sm mt-1">{t('form.email.error')}</p>
              )}
            </div>

            <fieldset>
              <legend className="text-white/70 text-sm mb-2">{t('form.language.label')}</legend>
              <div className="flex gap-6">
                {(['en', 'es'] as const).map(code => (
                  <label
                    key={code}
                    className={`flex items-center gap-2 cursor-pointer ${
                      selectedLang === code ? 'text-brand-teal font-semibold' : 'text-white/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="language"
                      value={code}
                      checked={selectedLang === code}
                      onChange={() => setSelectedLang(code)}
                      className="accent-brand-teal"
                    />
                    {code === 'en' ? 'English' : 'Español'}
                  </label>
                ))}
              </div>
            </fieldset>

            <button
              type="submit"
              disabled={formState === 'submitting'}
              className={`w-full bg-brand-teal text-white font-semibold rounded-full py-4 mt-2 hover:bg-teal-400 transition-colors ${
                formState === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {formState === 'submitting' ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2" strokeOpacity="0.3" />
                    <path d="M10 2a8 8 0 0 1 8 8" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              ) : (
                t('waitlist.cta')
              )}
            </button>

            {formState === 'error' && (
              <p className="text-red-400 text-sm">{t('waitlist.error')}</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
