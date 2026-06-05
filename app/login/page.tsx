'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/auth/UserContext';

export default function LoginPage() {
  const { user, login } = useUser();
  const router = useRouter();

  const [email, setEmail] = useState('demo@ledgr.app');
  const [password, setPassword] = useState('demo1234');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) router.replace('/dashboard');
  }, [user, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || password.length < 6) {
      setError('Please enter your email and password.');
      return;
    }
    setError('');
    setLoading(true);
    await new Promise(res => setTimeout(res, 800));
    login(email, email);
    router.push('/dashboard');
  }

  return (
    <div className="min-h-screen bg-brand-navy flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10">
        {/* Wordmark */}
        <div className="mb-8">
          <span className="font-display font-bold text-xl text-brand-navy select-none">
            Ledgr
            <span
              className="inline-block w-1.5 h-1.5 rounded-sm bg-brand-teal ml-0.5 mb-1 align-middle"
              aria-hidden="true"
            />
          </span>
        </div>

        <h1 className="font-display text-2xl font-bold text-brand-navy">Welcome back</h1>
        <p className="text-gray-500 text-sm mt-1">Sign in to your Ledgr account</p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-navy mb-1" htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-brand-navy focus:outline-none focus:border-brand-teal"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-navy mb-1" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-brand-navy focus:outline-none focus:border-brand-teal"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`bg-brand-teal text-white rounded-full w-full py-3 font-semibold mt-2 hover:bg-teal-400 transition-colors ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
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
              'Log in'
            )}
          </button>

          <p className="text-gray-400 text-xs text-center mt-4">
            Use demo@ledgr.app / demo1234 to sign in
          </p>
        </form>
      </div>
    </div>
  );
}
