export const onRequestPost = async ({ request }: { request: Request }): Promise<Response> => {
  const body = await request.json() as Record<string, string>;
  const { firstName, email, language } = body;

  if (!firstName || !email) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Missing fields' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // TODO: Replace with Loops.so or Airtable webhook — see README.md
  console.log('[waitlist]', { firstName, email, language });

  return new Response(
    JSON.stringify({ ok: true }),
    { status: 200, headers: { 'Content-Type': 'application/json' } },
  );
};
