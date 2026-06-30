'use client';

import { useState, useEffect } from 'react';

type PatternType = 'Clarity' | 'Signal' | 'Authority' | 'Timing' | 'Visibility' | 'Other';

const TYPE_STYLES: Record<PatternType, string> = {
  Clarity:    'bg-secondary/20 text-secondary',
  Signal:     'bg-accent/20 text-accent',
  Authority:  'bg-muted/20 text-muted',
  Timing:     'bg-border/60 text-muted',
  Visibility: 'bg-secondary/10 text-secondary',
  Other:      'bg-border/40 text-muted',
};

const PATTERNS: { date: string; observation: string; type: PatternType; gapScore: string }[] = [
  { date: 'Jun 3',  observation: 'Deferred to junior colleague in leadership review',   type: 'Authority',   gapScore: '8'  },
  { date: 'Jun 1',  observation: 'Paused before sharing insight in team call',          type: 'Timing',      gapScore: '6'  },
  { date: 'May 29', observation: 'Qualified strong position before stating it',         type: 'Clarity',     gapScore: '5'  },
  { date: 'May 27', observation: 'Spoke clearly in 1:1; stayed silent in group',        type: 'Signal',      gapScore: '7'  },
  { date: 'May 24', observation: 'Accurate diagnosis given only after being prompted',  type: 'Visibility',  gapScore: '9'  },
  { date: 'May 20', observation: 'Rewrote confident email to soften tone',              type: 'Authority',   gapScore: '7'  },
  { date: 'May 18', observation: 'Withheld strategy recommendation in board prep',      type: 'Timing',      gapScore: '8'  },
  { date: 'May 15', observation: 'Named the pattern in reflection; not in the meeting', type: 'Signal',      gapScore: '6'  },
];

const SUMMARY = [
  { label: 'Clarity Avg.',  value: '72' },
  { label: 'Signal Avg.',   value: '48' },
  { label: 'Gap Avg.',      value: '24' },
];

const PATTERN_TYPES: PatternType[] = ['Clarity', 'Signal', 'Authority', 'Timing', 'Visibility', 'Other'];

const INPUT_CLS = 'w-full border border-border bg-bg rounded-lg px-4 py-3 text-text focus:outline-none focus:border-accent font-sans';

export default function PatternLogPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(false);

  const [observation, setObservation] = useState('');
  const [type, setType] = useState<PatternType>('Clarity');
  const [gapScore, setGapScore] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  function handleSave() {
    setModalOpen(false);
    setObservation(''); setType('Clarity'); setGapScore(''); setDate('');
    setToast(true);
  }

  return (
    <div className="page-fade-in max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="font-sans text-2xl font-bold text-text">Pattern Log</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-accent text-bg rounded-lg px-5 py-2.5 font-sans font-semibold hover:bg-accent/90 transition-colors"
        >
          Log Pattern
        </button>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {SUMMARY.map(({ label, value }) => (
          <div key={label} className="bg-card rounded-xl p-5 border border-border">
            <p className="font-mono text-2xl font-bold text-accent">{value}</p>
            <p className="font-sans text-muted text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block mt-6 bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {['Date', 'Observation', 'Pattern Type', 'Gap Score'].map(col => (
                <th key={col} className="text-left px-6 py-3 font-sans text-muted text-xs uppercase tracking-wide font-medium">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PATTERNS.map(({ date, observation, type, gapScore }) => (
              <tr key={`${date}-${observation}`} className="border-t border-border/50 hover:bg-border/20 transition-colors">
                <td className="px-6 py-4 font-sans text-sm text-muted whitespace-nowrap">{date}</td>
                <td className="px-6 py-4 font-sans text-sm text-text">{observation}</td>
                <td className="px-6 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium font-sans ${TYPE_STYLES[type]}`}>
                    {type}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-sm font-medium text-accent">{gapScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden mt-6 flex flex-col gap-3">
        {PATTERNS.map(({ date, observation, type, gapScore }) => (
          <div key={`${date}-${observation}`} className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <p className="font-sans text-sm text-text">{observation}</p>
                <p className="font-sans text-muted text-xs mt-0.5">{date}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-mono text-sm font-semibold text-accent">{gapScore}</p>
                <span className={`inline-block mt-1 rounded-full px-3 py-0.5 text-xs font-medium font-sans ${TYPE_STYLES[type]}`}>
                  {type}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Log Pattern modal */}
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

            <h2 className="font-sans font-bold text-xl text-text">Log Pattern</h2>

            <div className="mt-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-muted mb-1 font-sans">Observation</label>
                <input type="text" value={observation} onChange={e => setObservation(e.target.value)} className={INPUT_CLS} />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-1 font-sans">Pattern type</label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value as PatternType)}
                  className={INPUT_CLS}
                >
                  {PATTERN_TYPES.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-1 font-sans">Gap score</label>
                <input type="number" min="0" max="10" value={gapScore} onChange={e => setGapScore(e.target.value)} className={`${INPUT_CLS} font-mono`} />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-1 font-sans">Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} className={INPUT_CLS} />
              </div>
            </div>

            <button
              onClick={handleSave}
              className="mt-6 w-full bg-accent text-bg rounded-lg py-3 font-sans font-semibold hover:bg-accent/90 transition-colors"
            >
              Save Pattern
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
          Pattern logged.
        </div>
      )}
    </div>
  );
}
