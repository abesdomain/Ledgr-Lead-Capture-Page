import AppNav from '@/components/AppNav';
import ProtectedRoute from '@/components/ProtectedRoute';
import type { ReactNode } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <AppNav />
      <main className="pt-16 lg:pt-0 lg:ml-64 min-h-screen bg-bg">
        {children}
      </main>
    </ProtectedRoute>
  );
}
