'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/auth/UserContext';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
    if (!user) router.replace('/login');
  }, [user, router]);

  if (!checked || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-navy">
        <svg
          className="animate-spin"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          aria-label="Loading"
        >
          <circle cx="24" cy="24" r="20" stroke="#00D8A4" strokeWidth="3" strokeOpacity="0.25" />
          <path d="M24 4a20 20 0 0 1 20 20" stroke="#00D8A4" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  return <>{children}</>;
}
