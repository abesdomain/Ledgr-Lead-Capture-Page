'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/lib/auth/UserContext';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import type { Language } from '@/lib/i18n/strings';

const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/invoices', label: 'Invoices' },
  { href: '/expenses', label: 'Expenses' },
  { href: '/settings', label: 'Settings' },
];

const LANGS: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
];

export default function AppNav() {
  const { user, logout } = useUser();
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  function handleLogout() {
    logout();
    router.push('/login');
  }

  const initial = user?.email?.[0]?.toUpperCase() ?? '?';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm h-16">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Left: wordmark */}
          <Link href="/dashboard" className="font-display font-bold text-xl text-brand-navy select-none">
            Ledgr
            <span className="inline-block w-1.5 h-1.5 rounded-sm bg-brand-teal ml-0.5 mb-1 align-middle" aria-hidden="true" />
          </Link>

          {/* Centre: desktop nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm transition-colors ${
                  pathname === href
                    ? 'text-brand-teal font-semibold'
                    : 'text-gray-500 hover:text-brand-navy'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            {/* Language toggle — desktop only */}
            <div className="hidden md:flex rounded-full border border-brand-navy/20 overflow-hidden">
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

            {/* Avatar + dropdown — desktop only */}
            <div className="hidden md:block relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(prev => !prev)}
                className="w-9 h-9 rounded-full bg-brand-teal text-white text-sm font-semibold flex items-center justify-center focus:outline-none hover:bg-teal-400 transition-colors"
                aria-label="User menu"
              >
                {initial}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-navy transition-colors"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden text-brand-navy"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 bg-white z-[60] flex flex-col p-8 md:hidden">
          {/* Drawer header */}
          <div className="flex items-center justify-between mb-10">
            <span className="font-display font-bold text-xl text-brand-navy select-none">
              Ledgr
              <span className="inline-block w-1.5 h-1.5 rounded-sm bg-brand-teal ml-0.5 mb-1 align-middle" aria-hidden="true" />
            </span>
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
              className="text-brand-navy"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </button>
          </div>

          {/* Drawer nav links */}
          <nav className="flex flex-col flex-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setDrawerOpen(false)}
                className={`font-display font-semibold text-2xl py-4 border-b border-gray-100 transition-colors ${
                  pathname === href ? 'text-brand-teal' : 'text-brand-navy'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Language toggle in drawer */}
          <div className="flex rounded-full border border-brand-navy/20 overflow-hidden self-start mb-6 mt-8">
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

          {/* Log out */}
          <button
            onClick={handleLogout}
            className="w-full bg-brand-navy text-white rounded-full px-8 py-3 font-semibold hover:bg-brand-navy/90 transition-colors"
          >
            Log out
          </button>
        </div>
      )}
    </>
  );
}
