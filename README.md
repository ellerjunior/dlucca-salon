# Casa D'Lucca

Static Next.js redesign for Flaviano D'Lucca Hair & Beauty.

## Local development

```bash
npm install
npm run dev -- --hostname 0.0.0.0
```

Open `http://localhost:3000`. A LAN address printed by Next.js can be used from a phone on the same network.

## Verification

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

`npm run verify:services` compares the committed catalog against the current public Square booking page. It does not change files. `npm run snapshot:services` intentionally refreshes the snapshot.
