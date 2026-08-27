# Square booking analytics plan

Last updated: August 27, 2026

## Status

**Worker implemented and deployed; waiting for Square production identifiers/signature and the GA4 Measurement Protocol API secret before activating the subscription.**

The isolated Worker is available at `https://dlucca-square-bookings.eller-jr-13.workers.dev`. Its production webhook path remains safely unconfigured until the missing Square and GA4 values are installed. The current `book_appointment_click` event is already working and must not be replaced, renamed, or emitted a second time from the site code.

## Current environment

- Production hosting: Cloudflare Pages connected to GitHub, not Vercel.
- Application: static Next.js export (`output: "export"`).
- Cloudflare build command: `npm run build`.
- Cloudflare output directory: `out`.
- GA4 measurement ID currently installed on the site: `G-WCL2PLSJF7`.
- Square booking URL is centralized in `src/lib/constants.ts` as `BOOKING_URL`.
- Current booking destination: `https://book.squareup.com/appointments/1qxvwmck0vibcb/location/LDSYEV6DSTW7W/services`.

Squarespace and Square are separate products. Access to Squarespace Developer Apps does not authorize the Square Bookings API.

## Confirmed analytics behavior

The marketing manager created `book_appointment_click` in GA4. It measures only the outbound click from the D'Lucca website to `book.squareup.com` and is working correctly.

The requested completed-booking event is a separate event:

```text
appointment_booked
```

The Square confirmation page has a different URL, but it is hosted on `book.squareup.com`. The D'Lucca website cannot read that URL or execute its GA4 tag there. The native Square booking flow currently does not provide a reliable custom confirmation redirect or preserve GCLID/client identifiers through the booking.

## Current approved scope

Until Square access is available:

- Do not change `book_appointment_click` or its GA4 rule.
- Do not add another client-side `gtag` call for the booking click.
- Add only preventive QA when implementation resumes: verify every Square booking link across all routes, languages, and mobile/desktop navigation.
- Keep the completed-booking integration documented but disconnected.

## Required access and secrets

### Square

The Square Developer application needs seller-level read access:

- `APPOINTMENTS_READ`
- `APPOINTMENTS_ALL_READ`

Both are required because buyer-level `APPOINTMENTS_READ` alone sees primarily bookings created by the application. Seller-level read access is required to receive bookings created through Square's hosted online booking site.

Do not request these write permissions:

- `APPOINTMENTS_WRITE`
- `APPOINTMENTS_ALL_WRITE`

The integration must not create, update, reschedule, or cancel appointments.

Required Square values must be stored as Cloudflare secrets and never committed or pasted into documentation:

- Production access token or OAuth credentials, depending on the authorization model.
- Webhook signature key.
- Square application ID if required by the selected SDK or verification implementation.

### GA4

Request these values from the marketing manager only when the Square side is ready:

- Measurement ID (confirm whether it remains `G-WCL2PLSJF7`).
- Measurement Protocol API secret.

The API secret must exist only as a Cloudflare secret. Never expose it through a `NEXT_PUBLIC_*` variable or browser-side code.

## Planned data flow

```text
Customer completes booking on Square
  -> Square sends booking.created
  -> Cloudflare Worker validates the Square signature
  -> Worker filters and deduplicates the booking
  -> Worker sends appointment_booked through GA4 Measurement Protocol
```

The webhook should be implemented as a separate Cloudflare Worker so the existing static Cloudflare Pages deployment remains unchanged.

## Webhook processing rules

For each `booking.created` notification:

1. Reject requests with an invalid Square signature.
2. Require the expected Square merchant and D'Lucca location. The current public booking URL contains location ID `LDSYEV6DSTW7W`; confirm it against the authorized API account before hard-coding or configuring it.
3. Accept only `source = FIRST_PARTY_BUYER` so customer-created online bookings are counted and team-created/manual bookings are excluded.
4. Use Square `event_id` for idempotency so webhook retries cannot create duplicate GA4 conversions.
5. Return an HTTP `2xx` response within Square's webhook deadline after safe processing or queuing.
6. Do not send or log customer name, email, phone, address, notes, `customer_id`, or service-provider identifiers in analytics.
7. Send only the minimum event needed for counting, named `appointment_booked`.

## Attribution limitation

`booking.created` does not contain the original GA4 `client_id`, GA4 `session_id`, GCLID, or campaign information. GA4 Measurement Protocol requires a matching `client_id` to associate a server-side event with the original visitor, and session attribution also requires the corresponding `session_id`.

Therefore:

- The webhook can provide a reliable operational count of customer-created bookings.
- The webhook alone cannot reliably attribute those bookings to the Google Ads campaign that produced them.
- Do not make `appointment_booked` the primary Google Ads conversion until attribution has been validated.
- A later attribution project will require either a first-party correlation mechanism, a compliant offline-conversion workflow, or a custom booking experience built with Square APIs.
- No personal customer information may be sent to GA4. Any future Google Ads enhanced-conversion design must be reviewed separately for consent and privacy requirements.

## Implementation checklist

- [x] Confirm Flaviano's Square authorization has arrived.
- [x] Confirm access is to Square Developer (`developer.squareup.com`), not Squarespace.
- [ ] Create or open the production Square Developer application.
- [ ] Confirm `APPOINTMENTS_READ` and `APPOINTMENTS_ALL_READ` seller-level access.
- [ ] Verify that bookings from the hosted Square page are visible through the application.
- [x] Create a separate Cloudflare Worker webhook endpoint.
- [ ] Add Square credentials and webhook signature key as Cloudflare secrets.
- [ ] Subscribe the production webhook to `booking.created`.
- [x] Implement signature validation, merchant/location filtering, source filtering, and idempotency.
- [ ] Ask the marketing manager for the GA4 Measurement Protocol API secret.
- [ ] Add GA4 values as Cloudflare secrets.
- [ ] Validate the GA4 payload with Google's validation endpoint before production delivery.
- [ ] Test a Square-generated webhook event.
- [ ] Test a manual/team-created booking and confirm it is excluded.
- [ ] Complete one authorized customer booking and confirm exactly one `appointment_booked`.
- [ ] Inspect logs and GA4 to confirm no PII is present.
- [ ] Keep the event secondary until Google Ads attribution is solved.

## Preventive site QA checklist

When work resumes, expand the existing Playwright coverage without changing the analytics event:

- Validate every link whose destination is `BOOKING_URL`.
- Cover English, Portuguese, and Spanish routes.
- Cover desktop navigation, mobile menu, mobile action bar, hero CTAs, and page-specific CTAs.
- Assert the exact Square URL, `target="_blank"`, and `rel="noopener noreferrer"`.
- After the next Cloudflare preview deploy, perform a representative browser-network check confirming one `book_appointment_click` per user click.

## Resume instructions for a future Codex session

1. Read this document completely before changing analytics or deployment code.
2. Run `git status --short` and preserve unrelated local changes.
3. Verify Square authorization and permissions before building the Worker.
4. Never expose Square or GA4 secrets in commands, logs, screenshots, commits, or client-side environment variables.
5. Treat click tracking, completed-booking counting, and Google Ads attribution as three separate concerns.

## Official references

- [Square booking webhooks](https://developer.squareup.com/docs/bookings-api/use-webhooks)
- [Square booking source values](https://developer.squareup.com/reference/square/enums/BookingBookingSource)
- [Square Bookings API permissions](https://developer.squareup.com/docs/bookings-api/what-it-is)
- [GA4 Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4)
- [GA4 Measurement Protocol reference](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference)
