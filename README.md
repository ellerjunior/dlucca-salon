# Casa D'Lucca

Static Next.js redesign for Flaviano D'Lucca Hair & Beauty.

## Requirements

- Node.js 24 (also declared in `package.json` and `.nvmrc`)
- npm and the committed `package-lock.json`

## Local development

```bash
nvm use
npm ci
npm run dev -- --hostname 0.0.0.0
```

Open `http://localhost:3000`. A LAN address printed by Next.js can be used from a phone on the same network.

## Deploy to Vercel

This repository is portable between GitHub and Vercel accounts. It contains no committed Vercel project link, account ID, machine-specific path, or required secret.

1. Copy, fork, or transfer the repository to the destination GitHub account.
2. In Vercel, choose **Add New > Project** and import that repository.
3. Keep the detected **Next.js** framework preset, root directory, build command, and output settings at their defaults.
4. Select **Deploy**. Vercel will use Node.js 24 from `package.json` and run the project build.

No environment variables are required for the first deployment. The two optional form endpoints are documented in `.env.example`:

```bash
NEXT_PUBLIC_WEDDING_FORM_ENDPOINT=
NEXT_PUBLIC_NEWSLETTER_ENDPOINT=
```

If they are configured later under **Project Settings > Environment Variables**, redeploy so the static build includes them. Without them, the site still builds normally: the wedding form displays the salon email fallback and the newsletter reports that delivery is not connected.

For a local production check before handoff:

```bash
npm ci
npm run build
npm run preview
```

## Verification

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

`npm run verify:services` compares the committed catalog against the current public Square booking page. It does not change files. `npm run snapshot:services` intentionally refreshes the snapshot.

## Project documentation

- [Square booking analytics plan](docs/SQUARE_BOOKING_ANALYTICS_PLAN.md) — current status, pending permissions, Cloudflare webhook architecture, privacy constraints, and implementation checklist.
- [Square booking Worker runbook](workers/dlucca-square-bookings/README.md) — isolated Worker setup, production URL, Square Developer steps, secrets, and verification.
