'use client';

import { useState, useEffect } from 'react';

type Pattern = 'Aligned' | 'Deferred' | 'Selective' | 'Situational';
type Filter = 'All' | Pattern;

const PATTERN_STYLES: Record<Pattern, string> = {
  Aligned:     'bg-secondary/20 text-secondary',
  Deferred:    'bg-muted/20 text-muted',
  Selective:   'bg-accent/20 text-accent',
  Situational: 'bg-border/60 text-muted',
};

const SESSIONS: { id: string; participant: string; focusArea: string; score: string; pattern: Pattern; date: string }[] = [
  { id: 'SES-0041', participant: 'A. Okafor',     focusArea: 'Leadership visibility',      score: '62', pattern: 'Deferred',    date: 'Jun 1'  },
  { id: 'SES-0040', participant: 'M. Torres',     focusArea: 'Peer authority dynamics',    score: '74', pattern: 'Selective',   date: 'Jun 7'  },
  { id: 'SES-0039', participant: 'R. Mensah',     focusArea: 'Boardroom signal timing',    score: '81', pattern: 'Aligned',     date: 'May 22' },
  { id: 'SES-0038', participant: 'J. Whitfield',  focusArea: 'Cross-team influence',       score: '55', pattern: 'Situational', date: 'May 15' },
  { id: 'SES-0037', participant: 'A. Okafor',     focusArea: 'Client-facing authority',    score: '68', pattern: 'Deferred',    date: 'May 10' },
  { id: 'SES-0036', participant: 'M. Torres',     focusArea: 'Negotiation clarity',        score: '79', pattern: 'Aligned',     date: 'May 5'  },
  { id: 'SES-0035', participant: 'P. Adeyemi',    focusArea: 'Stakeholder visibility',     score: '58', pattern: 'Deferred',    date: 'Jun 12' },
  { id: 'SES-0034', participant: 'R. Mensah',     focusArea: 'Spiritual authority gaps',   score: '83', pattern: 'Aligned',     date: 'Apr 30' },
  { id: 'SES-0033', participant: 'J. Whitfield',  focusArea: 'Signal timing — meetings',   score: '61', pattern: 'Selective',   date: 'Apr 22' },
  { id: 'SES-0032', participant: 'P. Adeyemi',    focusArea: 'Executive presence gaps',    score: '47', pattern: 'Situational', date: 'Apr 15' },
];

const FILTERS: Filter[] = ['All', 'Aligned', 'Deferred', 'Selective', 'Situational'];

const INPUT_CLS = 'w-full border border-border bg-bg rounded-lg px-4 py-3 text-text focus:outline-none focus:border-accent font-sans';

function EmptyState({ label }: { label: Filter }) {
  const text = label === 'All' ? 'sessions' : `${label.toLowerCase()} sessions`;
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true" className="text-border mb-4">
        <rect x="8" y="6" width="32" height="36" rx="4" stroke="currentColor" strokeWidth="2" />
        <line x1="14" y1="16" x2="34" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="22" x2="34" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="28" x2="26" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <p className="font-sans text-muted text-sm">No {text}</p>
    </div>
  );
}

export default function AuditSessionsPage() {
  const [filter, setFilter] = useState<Filter>('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(false);

  const [participant, setParticipant] = useState('');
  const [focusArea, setFocusArea] = useState('');
  const [score, setScore] = useState('');
  const [sessionDate, setSessionDate] = useState('');

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const visible = filter === 'All' ? SESSIONS : SESSIONS.filter(s => s.pattern === filter);

  function handleSave() {
    setModalOpen(false);
    setParticipant(''); setFocusArea(''); setScore(''); setSessionDate('');
    setToast(true);
  }

  return (
    <div className="page-fade-in max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="font-sans text-2xl font-bold text-text">Audit Sessions</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-accent text-bg rounded-lg px-5 py-2.5 font-sans font-semibold hover:bg-accent/90 transition-colors"
        >
          New Session
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mt-6 flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-sans font-medium cursor-pointer transition-colors ${
              filter === f ? 'bg-accent text-bg' : 'text-muted hover:text-text'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block mt-6 bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {['Session', 'Participant', 'Focus Area', 'Score', 'Pattern', 'Date'].map(col => (
                <th key={col} className="text-left px-6 py-3 font-sans text-muted text-xs uppercase tracking-wide font-medium">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map(({ id, participant, focusArea, score, pattern, date }) => (
              <tr key={id} className="border-t border-border/50 hover:bg-border/20 transition-colors">
                <td className="px-6 py-4 font-mono text-sm font-medium text-text">{id}</td>
                <td className="px-6 py-4 font-sans text-sm text-muted">{participant}</td>
                <td className="px-6 py-4 font-sans text-sm text-muted">{focusArea}</td>
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
        {visible.length === 0 && <EmptyState label={filter} />}
      </div>

      {/* Mobile card list */}
      <div className="md:hidden mt-6">
        {visible.length === 0 ? (
          <EmptyState label={filter} />
        ) : (
          <div className="flex flex-col gap-3">
            {visible.map(({ id, participant, score, pattern, date }) => (
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
        )}
      </div>

      {/* New Session modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-card rounded-2xl border border-border p-8 max-w-md w-full mx-4 relative">
            <button
              onClick={() => setModalOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 text-muted hover:text-text transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </svg>
            </button>

            <h2 className="font-sans font-bold text-xl text-text">New Session</h2>

            <div className="mt-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-muted mb-1 font-sans">Participant name</label>
                <input type="text" value={participant} onChange={e => setParticipant(e.target.value)} className={INPUT_CLS} />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-1 font-sans">Focus area</label>
                <input type="text" value={focusArea} onChange={e => setFocusArea(e.target.value)} className={INPUT_CLS} />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-1 font-sans">Score</label>
                <input type="number" min="0" max="100" value={score} onChange={e => setScore(e.target.value)} className={`${INPUT_CLS} font-mono`} />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-1 font-sans">Session date</label>
                <input type="date" value={sessionDate} onChange={e => setSessionDate(e.target.value)} className={INPUT_CLS} />
              </div>
            </div>

            <button
              onClick={handleSave}
              className="mt-6 w-full bg-accent text-bg rounded-lg py-3 font-sans font-semibold hover:bg-accent/90 transition-colors"
            >
              Save Session
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-3 w-full font-sans text-muted text-sm text-center hover:text-text transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-card border border-border text-text px-6 py-3 rounded-lg shadow-lg font-sans text-sm font-medium z-50">
          Session saved.
        </div>
      )}
    </div>
  );
}
