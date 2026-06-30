'use client';

import { useState, useEffect, type CSSProperties } from 'react';
import Link from 'next/link';

/* ── Config ──────────────────────────────────────── */
const WEBHOOK = 'https://hook.eu2.make.com/dv46bgvt6xbvytums55vgab9xq92lx13';

/* ── Data (preserved exactly from reference) ─────── */
const QUESTIONS = [
  {
    ctx: 'Team Meeting',
    hed: "You're in a team meeting. Something isn't working and you know it.",
  },
  {
    ctx: 'One-on-One with Your Manager',
    hed: "You're in a one-on-one with your manager. You have a read on the real dynamic.",
  },
  {
    ctx: 'A Negotiation',
    hed: "You're in a negotiation — salary, contract, terms. You know what it's worth.",
  },
  {
    ctx: 'Church or Ministry Leadership',
    hed: "You're in a church or ministry setting. You see what's needed. You hold a position.",
  },
  {
    ctx: 'A Moment of Conflict',
    hed: "You're in direct conflict with someone. You can see what's actually happening.",
  },
];

const CTX_SHORT = [
  'team meetings',
  'one-on-ones with your manager',
  'negotiations',
  'church or ministry leadership',
  'conflict',
];

// Three tiers: 0 = gap 0–2, 1 = gap 3–4, 2 = gap 5+
const INSIGHT: string[][] = [
  [ // team meeting
    "Your clarity and signal are close here. You're showing up in the room.",
    "You catch the undercurrent before anyone names it — and then you let the meeting proceed without your read in it. There's a filter running that's deciding what's safe to say.",
    "You clock the actual problem early — usually before anyone names it out loud. Then you wait. You wait for someone with more standing to say it first, or for the moment to pass on its own. Neither happens, so the meeting ends with the wrong problem being solved.</p><p>That's not modesty. The gift you saw the problem with was given to you to use, not to sit on — the parable of the talents isn't subtle about what happens to the one who buries what he was given for safekeeping. Staying quiet in that room isn't humility. It's fear, dressed up as deference to people who weren't actually waiting for your silence.",
  ],
  [ // one-on-one
    "You're reasonably direct with your manager. That's harder than it looks.",
    "You have a clearer view of the dynamic than you show. That's not professionalism — it's information asymmetry you're choosing to maintain.",
    "You read the real dynamic clearly — what's actually being asked of you, what's not being said, where the conversation is actually headed. Then, in the room, you soften it. You let your manager set the frame even when you can see it's the wrong one.</p><p>You were made to reflect and represent — to image something true into a room, not just absorb whatever's put in front of you. Holding back an accurate read out of deference isn't respect for their authority. It's deferring authority that was never theirs to hold in the first place — yours, on loan from God, not from the org chart.",
  ],
  [ // negotiation
    "Your read and your offer are roughly aligned. You're not leaving as much on the table as you think.",
    "You know the number before they make their offer. You let them anchor anyway. The gap isn't modesty — it costs you something real every time.",
    "You know what it's worth. You know what you're worth. And at the table, you let the number — or the silence — speak for you instead.</p><p>Undervaluing what you bring isn't humility either. Humility is accurate self-assessment, not self-erasure. If God entrusted you with the skill, the track record, the judgment that makes this negotiation worth having — naming its value plainly is just telling the truth about what was given to you. Underselling it isn't godliness. It's just a quieter way of getting it wrong.",
  ],
  [ // church/ministry
    "You're speaking into your ministry context with some consistency. That's not nothing.",
    "There's something particular about spiritual authority — easier to defer, harder to claim. It's worth asking whether the restraint is discernment or whether it's borrowed silence.",
    "This is the room where the gap usually runs deepest — and it makes sense. You hold a position. You see what's needed. And somewhere along the way, you absorbed the idea that authority is dangerous and visibility is prideful, so staying small got relabeled as godliness.</p><p>But Genesis doesn't say God made you small and quiet. It says you were made to image Him — to reflect something true and active into whatever you're given charge over. Burying that under the language of humility isn't humility. It's fear wearing a Bible verse. The correction isn't to get louder. It's to stop asking permission for the authority you were already given.",
  ],
  [ // conflict
    "You're naming things in conflict. That takes more than most people bring.",
    "You see what's happening mid-conflict — the real issue, the pattern. You say part of it. There's a hold on the rest that probably feels like wisdom. It may not be.",
    "You see the real thing at minute two. You say it at minute twenty — or not at all. By then you've absorbed what wasn't yours to carry, and the moment for a clean, true naming has passed.</p><p>Conflict is exactly where accurate seeing was supposed to be used, not stored. Peacekeeping that requires you to misrepresent what you actually see isn't peace — it's postponement, and somebody's still paying for it. Naming the true thing early, while it's still namable, is the more honest form of love in the room. It's also the harder one.",
  ],
];

/* ── Types ───────────────────────────────────────── */
type Screen = 'intro' | '1' | '2' | '3' | '4' | '5' | 'results' | 'email';
type Answer = { clarity: number; signal: number };

/* ── Helpers ─────────────────────────────────────── */
function sliderBg(value: number): CSSProperties {
  const pct = ((value - 1) / 9) * 100;
  return { background: `linear-gradient(to right, #C9913D ${pct}%, #2A2D40 ${pct}%)` };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ── Sub-components ──────────────────────────────── */
function ProgressDots({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-[7px] mb-12">
      {QUESTIONS.map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full flex-shrink-0 transition-all duration-300 ${
            i < current
              ? 'w-1.5 bg-accent'
              : i === current
              ? 'w-5 bg-accent'
              : 'w-1.5 bg-border'
          }`}
        />
      ))}
    </div>
  );
}

function Slider({
  id,
  value,
  label,
  sublabel,
  endLow,
  endHigh,
  onChange,
}: {
  id: string;
  value: number;
  label: string;
  sublabel: string;
  endLow: string;
  endHigh: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="mb-9">
      <div className="flex justify-between items-start gap-3 mb-1">
        <span className="font-sans text-text text-sm leading-snug flex-1">{label}</span>
        <span className="font-mono text-accent text-3xl leading-none flex-shrink-0 min-w-[26px] text-right">
          {value}
        </span>
      </div>
      <p className="font-sans text-muted text-xs italic mb-3">{sublabel}</p>
      <input
        type="range"
        id={id}
        min={1}
        max={10}
        value={value}
        className="audit-slider"
        style={sliderBg(value)}
        onChange={e => onChange(parseInt(e.target.value))}
      />
      <div className="flex justify-between mt-2">
        <span className="font-sans text-muted text-[10px] tracking-[0.04em]">{endLow}</span>
        <span className="font-sans text-muted text-[10px] tracking-[0.04em]">{endHigh}</span>
      </div>
    </div>
  );
}

/* ── Main component ──────────────────────────────── */
export default function AuditPage() {
  const [screen, setScreen] = useState<Screen>('intro');
  const [visible, setVisible] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>(
    QUESTIONS.map(() => ({ clarity: 5, signal: 5 }))
  );
  const [emailValue, setEmailValue] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [barsAnimated, setBarsAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, [screen]);

  useEffect(() => {
    setBarsAnimated(false);
    if (screen !== 'results') return;
    const t = setTimeout(() => setBarsAnimated(true), 450);
    return () => clearTimeout(t);
  }, [screen]);

  function goTo(next: Screen) {
    if (transitioning) return;
    setTransitioning(true);
    setVisible(false);
    setTimeout(() => {
      setScreen(next);
      setTransitioning(false);
      window.scrollTo(0, 0);
    }, 270);
  }

  function updateAnswer(qIndex: number, key: 'clarity' | 'signal', value: number) {
    setAnswers(prev => prev.map((a, i) => (i === qIndex ? { ...a, [key]: value } : a)));
  }

  async function submitEmail() {
    if (!emailValue.trim() || !EMAIL_RE.test(emailValue.trim())) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    const payload = {
      email: emailValue.trim(),
      submittedAt: new Date().toISOString(),
      answers: answers.map((a, i) => ({
        context: CTX_SHORT[i],
        clarity: a.clarity,
        signal: a.signal,
        gap: a.clarity - a.signal,
      })),
    };
    try {
      await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch { /* fail silently */ }
    setEmailSent(true);
  }

  /* ── Compute results (scoring logic preserved exactly) ── */
  const gaps = answers.map((a, i) => ({
    i,
    ctxFull: QUESTIONS[i].ctx,
    gap: a.clarity - a.signal,
  }));
  const maxGap = Math.max(...gaps.map(g => g.gap));
  const topEntry = maxGap > 0
    ? gaps.reduce((best, g) => (g.gap > best.gap ? g : best), gaps[0])
    : null;
  const avgGap = gaps.reduce((s, g) => s + g.gap, 0) / gaps.length;

  let patternLabel: string;
  if (avgGap >= 5)        patternLabel = 'Chronic Deferred Authority';
  else if (avgGap >= 3)   patternLabel = 'Selective Deferred Authority';
  else if (avgGap >= 1.5) patternLabel = 'Situational Signal Gap';
  else                    patternLabel = 'Aligned Signal';

  let insightHTML: string;
  if (!topEntry || topEntry.gap <= 0) {
    insightHTML =
      "<p>Your clarity and signal are closely aligned across contexts. " +
      "That's the baseline — the work from here is sustaining it under pressure.</p>";
  } else {
    const tier = topEntry.gap >= 5 ? 2 : topEntry.gap >= 3 ? 1 : 0;
    insightHTML =
      `<p>Your biggest gap is in <strong>${topEntry.ctxFull.toLowerCase()}</strong>.</p>` +
      `<p>${INSIGHT[topEntry.i][tier]}</p>`;
  }

  /* ── Question screen index ── */
  const numScreen = parseInt(screen);
  const qIndex = isNaN(numScreen) ? -1 : numScreen - 1;
  const isQuestionScreen = qIndex >= 0;
  const isLastQuestion = qIndex === 4;

  const wrapStyle: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(10px)',
    transition: 'opacity 0.35s ease, transform 0.35s ease',
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Minimal header */}
      <header className="border-b border-border px-6 py-5">
        <Link
          href="/"
          className="font-serif font-bold text-lg text-text select-none hover:text-accent transition-colors"
        >
          Deferred Authority
        </Link>
      </header>

      {/* Audit content */}
      <div className="max-w-[560px] mx-auto px-7 py-14" style={wrapStyle}>

        {/* ── INTRO ── */}
        {screen === 'intro' && (
          <div>
            <p className="font-mono text-muted text-[11px] tracking-[0.12em] uppercase mb-7">
              Deferred Authority &middot; The Signal Audit
            </p>
            <h1 className="font-serif font-normal text-text text-4xl md:text-5xl leading-[1.22] mb-6">
              You don&apos;t have a confidence problem.<br />
              You have a timing problem.<br />
              Find out where.
            </h1>
            <p className="font-sans text-muted text-[15px] leading-[1.72] mb-14 max-w-[440px]">
              For people who suspect that staying small was never actually humility.
            </p>
            <button
              onClick={() => goTo('1')}
              className="bg-accent text-bg font-sans text-xs font-semibold tracking-[0.09em] uppercase px-10 py-[15px] hover:-translate-y-px hover:bg-accent/90 active:translate-y-0 transition-all"
            >
              Start the audit
            </button>
          </div>
        )}

        {/* ── QUESTIONS ── */}
        {isQuestionScreen && (
          <div>
            <button
              onClick={() => goTo(qIndex === 0 ? 'intro' : (String(qIndex) as Screen))}
              className="font-sans text-muted text-[11px] tracking-[0.1em] uppercase mb-10 block hover:text-text transition-colors"
            >
              ← Back
            </button>
            <ProgressDots current={qIndex} />
            <p className="font-mono text-muted text-[11px] tracking-[0.12em] uppercase mb-2.5">
              {QUESTIONS[qIndex].ctx}
            </p>
            <h2 className="font-serif font-normal text-text text-2xl md:text-[28px] leading-[1.38] mb-12">
              {QUESTIONS[qIndex].hed}
            </h2>

            <Slider
              id={`clarity-${qIndex}`}
              value={answers[qIndex].clarity}
              label="How clearly do you see what's really going on?"
              sublabel="Internal clarity"
              endLow="Not at all"
              endHigh="Completely"
              onChange={v => updateAnswer(qIndex, 'clarity', v)}
            />

            <div className="border-t border-border mt-2 mb-9" />

            <Slider
              id={`signal-${qIndex}`}
              value={answers[qIndex].signal}
              label="How fully do you say it out loud?"
              sublabel="External signal"
              endLow="Not at all"
              endHigh="Fully"
              onChange={v => updateAnswer(qIndex, 'signal', v)}
            />

            <button
              onClick={() =>
                goTo(isLastQuestion ? 'results' : (String(qIndex + 2) as Screen))
              }
              className="bg-accent text-bg font-sans text-xs font-semibold tracking-[0.09em] uppercase px-10 py-[15px] hover:-translate-y-px hover:bg-accent/90 active:translate-y-0 transition-all"
            >
              {isLastQuestion ? 'See my results' : 'Next'}
            </button>
          </div>
        )}

        {/* ── RESULTS ── */}
        {screen === 'results' && (
          <div>
            <button
              onClick={() => goTo('5')}
              className="font-sans text-muted text-[11px] tracking-[0.1em] uppercase mb-10 block hover:text-text transition-colors"
            >
              ← Back
            </button>
            <p className="font-mono text-muted text-[11px] tracking-[0.12em] uppercase mb-7">
              Your Signal Audit
            </p>
            <h2 className="font-serif font-normal text-text text-3xl md:text-[34px] leading-[1.28] mb-2">
              {patternLabel}
            </h2>
            <p className="font-sans text-muted text-[13px] mb-12">
              Average gap{' '}
              <span className="font-mono">{avgGap.toFixed(1)}</span>
              {' '}&middot;{' '}clarity score minus signal score
            </p>

            {/* Gap bars */}
            <div className="mb-12">
              {gaps.map(g => {
                const isTop = topEntry && g.i === topEntry.i;
                const barW = maxGap > 0 ? Math.max(0, (g.gap / 10) * 100) : 0;
                const gStr = g.gap > 0 ? `+${g.gap}` : String(g.gap);
                return (
                  <div key={g.i} className="mb-6">
                    <div className="flex justify-between items-baseline gap-2 mb-2">
                      <span className={`font-sans text-[13px] text-text ${isTop ? 'font-semibold' : ''}`}>
                        {QUESTIONS[g.i].ctx}
                      </span>
                      <span className={`font-mono text-xl flex-shrink-0 ${isTop ? 'text-urgent' : 'text-muted'}`}>
                        {gStr}
                      </span>
                    </div>
                    <div className="h-[3px] bg-border rounded-sm overflow-hidden">
                      <div
                        className={`h-full rounded-sm ${isTop ? 'bg-urgent' : 'bg-accent'}`}
                        style={{
                          width: barsAnimated ? `${barW}%` : '0%',
                          transition: 'width 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Insight box */}
            <div
              className="bg-card border-l-[3px] border-accent px-[26px] py-[22px] mb-12 font-sans text-text text-[15px] leading-[1.75] [&_p+p]:mt-3.5 [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: insightHTML }}
            />

            <button
              onClick={() => goTo('email')}
              className="bg-accent text-bg font-sans text-xs font-semibold tracking-[0.09em] uppercase px-10 py-[15px] hover:-translate-y-px hover:bg-accent/90 active:translate-y-0 transition-all"
            >
              Get the full breakdown
            </button>
          </div>
        )}

        {/* ── EMAIL ── */}
        {screen === 'email' && (
          <div>
            <button
              onClick={() => goTo('results')}
              className="font-sans text-muted text-[11px] tracking-[0.1em] uppercase mb-10 block hover:text-text transition-colors"
            >
              ← Back
            </button>
            <p className="font-mono text-muted text-[11px] tracking-[0.12em] uppercase mb-7">
              One more step
            </p>

            {emailSent ? (
              <div className="pt-14">
                <div className="font-sans text-accent text-4xl mb-6 leading-none">✓</div>
                <h3 className="font-serif font-normal text-text text-2xl mb-3">
                  You&apos;re in.
                </h3>
                <p className="font-sans text-muted text-sm leading-[1.68]">
                  Check your inbox. The breakdown is on its way.
                </p>
              </div>
            ) : (
              <>
                <h2 className="font-serif font-normal text-text text-2xl md:text-[28px] leading-[1.38] mb-3.5">
                  Want the full breakdown of your pattern and the one correction for it?
                </h2>
                <p className="font-sans text-muted text-sm leading-[1.68] mb-9">
                  Drop your email. No sequences, no noise — just the specific insight for where
                  you&apos;re deferring and what to do about it.
                </p>
                <input
                  type="email"
                  value={emailValue}
                  autoComplete="email"
                  placeholder="your@email.com"
                  onChange={e => {
                    setEmailValue(e.target.value);
                    if (emailError) setEmailError(false);
                  }}
                  onKeyDown={e => { if (e.key === 'Enter') submitEmail(); }}
                  className={`w-full bg-card font-sans text-text text-[15px] px-4 py-[14px] mb-3 focus:outline-none border transition-colors placeholder:text-muted/50 ${
                    emailError ? 'border-urgent' : 'border-border focus:border-accent'
                  }`}
                />
                <button
                  onClick={submitEmail}
                  className="bg-accent text-bg font-sans text-xs font-semibold tracking-[0.09em] uppercase px-10 py-[15px] hover:-translate-y-px hover:bg-accent/90 active:translate-y-0 transition-all"
                >
                  Send it
                </button>
                <p className="font-sans text-muted text-[11px] mt-3">
                  Not shared. Unsubscribe any time.
                </p>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
