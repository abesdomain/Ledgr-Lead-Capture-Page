'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/lib/auth/UserContext';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import type { Language } from '@/lib/i18n/strings';

const NAV_LINKS = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/audit',     label: 'Signal Audit' },
  { href: '/invoices',  label: 'Audit Sessions' },
  { href: '/expenses',  label: 'Pattern Log' },
  { href: '/settings',  label: 'Settings' },
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

  const [drawerOpen, setDrawerOpen] = useState(false);

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
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border z-40">
        {/* Wordmark */}
        <div className="px-6 py-8 border-b border-border">
          <Link href="/dashboard" className="font-serif font-bold text-lg text-text select-none leading-tight">
            Deferred<br />Authority
          </Link>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-sans transition-colors ${
                pathname === href
                  ? 'bg-accent/15 text-accent font-semibold'
                  : 'text-muted hover:text-text hover:bg-border/60'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* User + language area */}
        <div className="px-4 py-5 border-t border-border space-y-4">
          {/* Language toggle */}
          <div className="flex rounded-full border border-border overflow-hidden self-start">
            {LANGS.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => setLanguage(code)}
                aria-pressed={code === language}
                className={`px-4 py-1 text-xs font-semibold tracking-wide transition-colors ${
                  code === language
                    ? 'bg-accent text-bg'
                    : 'bg-transparent text-muted hover:text-text'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* User row */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/20 text-accent text-sm font-semibold flex items-center justify-center flex-shrink-0">
              {initial}
            </div>
            <span className="text-muted text-xs truncate flex-1">{user?.email}</span>
          </div>

          <button
            onClick={handleLogout}
            className="text-muted text-sm hover:text-text transition-colors"
          >
            Log out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-card border-b border-border h-16 flex items-center justify-between px-5">
        <Link href="/dashboard" className="font-serif font-bold text-lg text-text select-none">
          DA
        </Link>
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          className="text-muted hover:text-text transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </header>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 bg-bg z-[60] flex flex-col p-8 lg:hidden">
          {/* Drawer header */}
          <div className="flex items-center justify-between mb-10">
            <span className="font-serif font-bold text-xl text-text select-none">DA</span>
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
              className="text-muted hover:text-text transition-colors"
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
                className={`font-sans font-semibold text-2xl py-4 border-b border-border transition-colors ${
                  pathname === href ? 'text-accent' : 'text-text'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Language toggle in drawer */}
          <div className="flex rounded-full border border-border overflow-hidden self-start mb-6 mt-8">
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

          {/* Log out */}
          <button
            onClick={handleLogout}
            className="w-full border border-border text-text rounded-lg px-8 py-3 font-semibold hover:bg-card transition-colors"
          >
            Log out
          </button>
        </div>
      )}
    </>
  );
}
