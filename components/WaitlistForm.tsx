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
    <section id="waitlist" className="bg-bg py-24 px-6 border-t border-border">
      <div className="max-w-lg mx-auto text-center">
        <h2 className="font-sans font-bold text-3xl text-text">{t('waitlist.heading')}</h2>
        <p className="font-sans text-muted text-base mt-4 leading-relaxed">{t('waitlist.subheading')}</p>

        {formState === 'success' ? (
          <div className="mt-10 flex flex-col items-center">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <circle cx="24" cy="24" r="22" stroke="#C9913D" strokeWidth="2.5" />
              <path d="M14 24l8 8 12-14" stroke="#C9913D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-text text-xl font-semibold mt-4">{t('waitlist.success')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-10 flex flex-col gap-4 text-left">
            <div>
              <label className="block text-muted text-sm mb-1 font-sans" htmlFor="wl-firstname">
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
                className="w-full bg-card border border-border rounded-lg px-4 py-3 text-text placeholder:text-muted/50 focus:outline-none focus:border-accent font-sans"
              />
              {touched.firstName && errors.firstName && (
                <p className="text-urgent text-sm mt-1">{t('form.firstName.error')}</p>
              )}
            </div>

            <div>
              <label className="block text-muted text-sm mb-1 font-sans" htmlFor="wl-email">
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
                className="w-full bg-card border border-border rounded-lg px-4 py-3 text-text placeholder:text-muted/50 focus:outline-none focus:border-accent font-sans"
              />
              {touched.email && errors.email && (
                <p className="text-urgent text-sm mt-1">{t('form.email.error')}</p>
              )}
            </div>

            <fieldset>
              <legend className="text-muted text-sm mb-2 font-sans">{t('form.language.label')}</legend>
              <div className="flex gap-6">
                {(['en', 'es'] as const).map(code => (
                  <label
                    key={code}
                    className={`flex items-center gap-2 cursor-pointer font-sans text-sm ${
                      selectedLang === code ? 'text-accent font-semibold' : 'text-muted'
                    }`}
                  >
                    <input
                      type="radio"
                      name="language"
                      value={code}
                      checked={selectedLang === code}
                      onChange={() => setSelectedLang(code)}
                      className="accent-accent"
                    />
                    {code === 'en' ? 'English' : 'Español'}
                  </label>
                ))}
              </div>
            </fieldset>

            <button
              type="submit"
              disabled={formState === 'submitting'}
              className={`w-full bg-accent text-bg font-sans font-semibold rounded-lg py-4 mt-2 hover:bg-accent/90 transition-colors ${
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
                    <circle cx="10" cy="10" r="8" stroke="#0D0F1A" strokeWidth="2" strokeOpacity="0.3" />
                    <path d="M10 2a8 8 0 0 1 8 8" stroke="#0D0F1A" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              ) : (
                t('waitlist.cta')
              )}
            </button>

            {formState === 'error' && (
              <p className="text-urgent text-sm">{t('waitlist.error')}</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
