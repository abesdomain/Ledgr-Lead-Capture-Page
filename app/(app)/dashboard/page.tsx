'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@/lib/auth/UserContext';

const STATS = [
  { value: '78',              label: 'Clarity Score',  sublabel: 'Internal precision',   mono: true },
  { value: '45',              label: 'Signal Score',   sublabel: 'Expressed strength',   mono: true },
  { value: '33',              label: 'Gap',            sublabel: 'Clarity minus signal',  mono: true },
  { value: 'Chronic DA',      label: 'Pattern Label',  sublabel: 'Primary pattern type', mono: false },
];

type Pattern = 'Aligned' | 'Deferred' | 'Selective' | 'Situational';

const PATTERN_STYLES: Record<Pattern, string> = {
  Aligned:     'bg-secondary/20 text-secondary',
  Deferred:    'bg-muted/20 text-muted',
  Selective:   'bg-accent/20 text-accent',
  Situational: 'bg-border/60 text-muted',
};

const SESSIONS: { id: string; participant: string; focusArea: string; score: string; pattern: Pattern; date: string }[] = [
  { id: 'SES-0041', participant: 'A. Okafor',     focusArea: 'Leadership visibility',    score: '62', pattern: 'Deferred',    date: 'Jun 1, 2026'  },
  { id: 'SES-0040', participant: 'M. Torres',     focusArea: 'Peer authority dynamics',  score: '74', pattern: 'Selective',   date: 'May 28, 2026' },
  { id: 'SES-0039', participant: 'R. Mensah',     focusArea: 'Boardroom signal timing',  score: '81', pattern: 'Aligned',     date: 'May 22, 2026' },
  { id: 'SES-0038', participant: 'J. Whitfield',  focusArea: 'Cross-team influence',     score: '55', pattern: 'Situational', date: 'May 15, 2026' },
  { id: 'SES-0037', participant: 'A. Okafor',     focusArea: 'Client-facing authority',  score: '68', pattern: 'Deferred',    date: 'May 10, 2026' },
];

const SHIMMER = 'bg-border/50 animate-pulse rounded-lg';

export default function DashboardPage() {
  const { user } = useUser();
  const displayName = user?.email?.split('@')[0] ?? 'there';
  const [statsReady, setStatsReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStatsReady(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="page-fade-in max-w-6xl mx-auto px-6 py-8">
      {/* Greeting */}
      <div>
        <h1 className="font-sans text-2xl font-bold text-text">
          Good morning, {displayName}
        </h1>
        <p className="font-sans text-muted mt-1">
          Here&apos;s your signal snapshot
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {STATS.map(({ value, label, sublabel, mono }) => (
          <div key={label} className="bg-card rounded-xl p-6 border border-border">
            {!statsReady ? (
              <>
                <div className={`h-9 w-24 mb-2 ${SHIMMER}`} />
                <div className={`h-4 w-28 mb-1 ${SHIMMER}`} />
                <div className={`h-3 w-20 ${SHIMMER}`} />
              </>
            ) : (
              <>
                <p className={`text-3xl font-bold text-accent ${mono ? 'font-mono' : 'font-sans'}`}>{value}</p>
                <p className="font-sans text-text text-sm mt-1">{label}</p>
                <p className="font-sans text-muted text-xs mt-0.5">{sublabel}</p>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Recent audit sessions */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-sans font-semibold text-xl text-text">Recent Audit Sessions</h2>
          <Link href="/invoices" className="font-sans text-accent text-sm hover:underline">
            View all
          </Link>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {['Session', 'Participant', 'Score', 'Pattern', 'Date'].map(col => (
                  <th key={col} className="text-left px-6 py-3 font-sans text-muted text-xs uppercase tracking-wide font-medium">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SESSIONS.map(({ id, participant, score, pattern, date }) => (
                <tr key={id} className="border-t border-border/50 hover:bg-border/20 transition-colors">
                  <td className="px-6 py-4 font-sans text-sm font-medium text-text font-mono">{id}</td>
                  <td className="px-6 py-4 font-sans text-sm text-muted">{participant}</td>
                  <td className="px-6 py-4 font-mono text-sm font-medium text-accent">{score}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium font-sans ${PATTERN_STYLES[pattern]}`}>
                      {pattern}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-sans text-sm text-muted">{date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile card list */}
        <div className="md:hidden flex flex-col gap-3">
          {SESSIONS.map(({ id, participant, score, pattern, date }) => (
            <div key={id} className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-sm font-semibold text-text">{id}</p>
                  <p className="font-sans text-sm text-muted mt-0.5">{participant}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm font-semibold text-accent">{score}</p>
                  <span className={`inline-block mt-1 rounded-full px-3 py-0.5 text-xs font-medium font-sans ${PATTERN_STYLES[pattern]}`}>
                    {pattern}
                  </span>
                </div>
              </div>
              <p className="font-sans text-muted text-xs mt-2">{date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-8 flex gap-4 flex-wrap">
        <Link
          href="/invoices"
          className="bg-accent text-bg rounded-lg px-6 py-3 font-sans font-semibold hover:bg-accent/90 transition-colors"
        >
          New Session
        </Link>
        <Link
          href="/expenses"
          className="bg-card text-text border border-border rounded-lg px-6 py-3 font-sans font-semibold hover:bg-border/40 transition-colors"
        >
          Log Pattern
        </Link>
      </div>
    </div>
  );
}
