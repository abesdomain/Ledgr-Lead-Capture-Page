import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { firstName, email, language } = body;

  if (!firstName || !email) {
    return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
  }

  // TODO: Replace with webhook call — e.g. await fetch('https://app.loops.so/api/v1/contacts/create', { method: 'POST', headers: { Authorization: `Bearer ${process.env.LOOPS_API_KEY}` }, body: JSON.stringify({ email, firstName, source: 'waitlist' }) })
  console.log('[waitlist]', { firstName, email, language });

  return NextResponse.json({ ok: true }, { status: 200 });
}
