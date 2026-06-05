'use client';

import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import { UserProvider } from '@/lib/auth/UserContext';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </UserProvider>
  );
}
