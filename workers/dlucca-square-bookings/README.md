# D'Lucca Square booking webhook

Isolated Cloudflare Worker that receives Square `booking.created` notifications and sends the privacy-minimized GA4 event `appointment_booked`.

This package does not change or share runtime configuration with the existing Cloudflare Pages site. If the Worker is unavailable, the website and Square booking flow continue to work; only analytics delivery is retried.

## Data flow

```text
Square booking.created
  -> verify Square HMAC signature
  -> require production merchant + D'Lucca location + FIRST_PARTY_BUYER
  -> deduplicate Square event_id in D1
  -> send appointment_booked through GA4 Measurement Protocol
```

The Worker never persists or forwards the Square request body, customer ID, names, email addresses, phone numbers, notes, service details, or staff identifiers.

## Local verification

```bash
npm install
npm test
npm run typecheck
```

For local Worker development, copy `.dev.vars.example` to `.dev.vars`, replace the placeholders locally, and run:

```bash
npx wrangler d1 migrations apply WEBHOOK_EVENTS --local
npm run dev
```

Never commit `.dev.vars`.

## One-time Cloudflare setup

1. Authenticate Wrangler with the Cloudflare account that hosts D'Lucca.
2. Create the D1 database:

   ```bash
   npx wrangler d1 create dlucca-square-booking-events
   ```

3. Record the returned database ID in `wrangler.jsonc`. The production database is currently configured as `1d0e9575-bebf-43f0-b8a3-b1f52a0f7111`.
4. Apply the production migration:

   ```bash
   npx wrangler d1 migrations apply WEBHOOK_EVENTS --remote
   ```

5. Deploy once to obtain the exact `workers.dev` hostname:

   ```bash
   npm run deploy
   ```

6. The production Square notification URL is:

   ```text
   https://dlucca-square-bookings.eller-jr-13.workers.dev/webhooks/square/bookings
   ```

7. Add the following Worker variables/secrets in **Workers & Pages → dlucca-square-bookings → Settings → Variables and Secrets**:

   | Name | Type | Value |
   | --- | --- | --- |
   | `SQUARE_MERCHANT_ID` | Secret | Production Square merchant ID |
   | `SQUARE_WEBHOOK_SIGNATURE_KEY` | Secret | Signature key from the Square webhook subscription |
   | `GA4_API_SECRET` | Secret | Measurement Protocol API secret supplied by marketing |

`SQUARE_NOTIFICATION_URL`, `SQUARE_LOCATION_ID=LDSYEV6DSTW7W`, and `GA4_MEASUREMENT_ID=G-WCL2PLSJF7` are non-secret committed variables.

Until `GA4_API_SECRET` exists, a valid production booking receives HTTP `503` so it is not silently acknowledged and lost. Do not activate the Square production subscription until the GA4 secret is installed.

## Square Developer steps

Perform these steps only after the Worker has its final URL.

1. Open [Square Developer Console](https://developer.squareup.com/apps) and select the application associated with the salon's real Square seller account.
2. Switch to **Production**. Do not configure the final webhook under Sandbox.
3. Confirm seller-level read access for `APPOINTMENTS_READ` and `APPOINTMENTS_ALL_READ`. Do not request booking write permissions.
4. Open **Webhooks** and choose **Add subscription**.
5. Use a clear name such as `D'Lucca GA4 completed booking`.
6. Paste `https://dlucca-square-bookings.eller-jr-13.workers.dev/webhooks/square/bookings`, with no added trailing slash.
7. Select only `booking.created` and save.
8. Reveal the subscription **Signature Key** and add it directly to Cloudflare as `SQUARE_WEBHOOK_SIGNATURE_KEY`. Never commit or share the value in chat.
9. Use Square's **Test webhook** action. A correctly signed but non-booking test can return `204`; a valid matching booking returns `200` only after GA4 is configured.
10. Complete one authorized customer booking through the public Square page and verify exactly one `appointment_booked` in GA4 Realtime/DebugView.
11. Create one manual/team booking and confirm that it does not produce `appointment_booked`.

The exact notification URL participates in Square's signature. If the Worker hostname or path changes, update `SQUARE_NOTIFICATION_URL` and the Square subscription together.

## Responses

| Condition | Status |
| --- | ---: |
| Health check | `200` |
| Valid online booking delivered to GA4 | `200` |
| Duplicate already delivered | `200` |
| Irrelevant event/manual booking/wrong merchant or location | `204` |
| Invalid or missing Square signature | `403` |
| Missing production configuration | `503` |
| Temporary D1 or GA4 delivery failure | `5xx` |
