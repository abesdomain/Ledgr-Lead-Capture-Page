# Ledgr Landing Page

Bilingual (EN/ES) Next.js 14 static landing page for Ledgr, deployed to Cloudflare Pages.

## Local development

```bash
npm run dev
```

Opens at http://localhost:3000.

## Build

```bash
npm run build
```

Output goes to `out/`. The static export is fully self-contained — no Node.js server required.

## Deploy

Push to the `main` branch — GitHub Actions deploys automatically via Cloudflare Pages.

Required repository secrets:

| Secret | Where to find it |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare dashboard → My Profile → API Tokens |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → right sidebar on any zone page |

## Manual deploy

```bash
npm run build
```

Then drag-and-drop the `out/` folder at [pages.cloudflare.com](https://pages.cloudflare.com).

## Connecting the waitlist form

The waitlist form POSTs to `/api/waitlist`. In production this is handled by the Cloudflare Pages Function at `/functions/api/waitlist.ts`. Replace the TODO in that file with a fetch to your email tool of choice.

**Loops.so**

```ts
await fetch('https://app.loops.so/api/v1/contacts/create', {
  method: 'POST',
  headers: { Authorization: `Bearer ${env.LOOPS_API_KEY}` },
  body: JSON.stringify({ email, firstName, source: 'waitlist' }),
});
```

Add `LOOPS_API_KEY` as an environment variable in the Cloudflare Pages dashboard under **Settings → Environment variables**.

> **Note:** `/app/api/waitlist/route.ts` is kept for local `npm run dev`. The `/functions/` version is only used on Cloudflare Pages.
