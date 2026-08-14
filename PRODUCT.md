# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 15 App Router with TypeScript and Tailwind CSS 3.4, exported as a static site. The implementation choice was confirmed in the approved execution plan. The first delivery is local source plus the generated `out/` directory; production hosting is undecided.

## Users

Primary users are Chicago-area clients evaluating and booking premium hair, aesthetics, bridal, and beauty services. They need to understand the salon's point of view, verify services and pricing, see authentic work, and move confidently to booking or contact.

Secondary users are bridal clients comparing makeup and styling support, and clients considering Cherry financing for eligible services.

## Product Purpose

Present Flaviano D'Lucca Hair & Beauty as a distinctive, credible Chicago salon and convert qualified interest into Square bookings, wedding inquiries, calls, directions, or financing applications. Success means visitors can quickly identify the relevant service, trust the evidence, and take the correct next action.

## Positioning

The site joins Flaviano D'Lucca's Brazilian point of view and personal service with a disciplined Chicago salon experience, using real salon imagery and live service information rather than generic luxury claims.

## Operating Context

Visitors arrive primarily on mobile, often while comparing salons, checking a price, planning an appointment, or coordinating a wedding. Booking is completed on Square. Wedding and newsletter submissions use configurable Formspree endpoints. Financing is provided by Cherry. The physical salon is in Chicago.

## Capabilities and Constraints

- Public routes: Home, Story, Hair, Aesthetics, Weddings, Gallery, Financing, Contact, and a no-index style guide.
- Prices and durations are compiled from a committed snapshot of the public Square booking catalog; the site makes no runtime Square request.
- The current public website's real photographs are the initial media source. Stock and AI-generated photography are prohibited.
- No CMS, database, user accounts, or custom backend are in scope.
- Static export, responsive behavior, WCAG 2.1 AA, reduced-motion support, and strong Lighthouse results are required.
- Missing business hours, original high-resolution media, final bridal travel fees, approved clinical language, Cherry collateral, and the designer's original SVG remain client decisions.

## Brand Commitments

- Name: Flaviano D'Lucca Hair & Beauty.
- Concept: CASA D'LUCCA — Brazilian modernist curves meeting Chicago Deco discipline.
- Voice: warm, specific, editorial, confident, and factual; never generic spa luxury or exaggerated medical/financial claims.
- Preserve the recognizable D'Lucca wordmark and flame-like D mark from the current logo.
- Avoid cards as the dominant layout, large rounded corners, decorative icon tiles, glass effects, stock textures, and gradients. The sole gradient exception is a functional readability scrim on the Home hero.

## Evidence on Hand

- Source brief: the Casa D'Lucca prompt pack supplied with the project.
- Existing public salon site and Squarespace-hosted salon imagery.
- Public Square booking catalog with current service names, prices, and durations.
- Existing Cherry merchant slug `d-lucca-hair-beauty`.
- No verified testimonials, awards, numerical performance claims, complete opening hours, parking/transit claims, or original high-resolution hero file are available; future work must not fabricate them.

## Product Principles

1. Real work and precise service information earn trust before adjectives do.
2. Every route leads to one clear next action without hiding essential context.
3. Editorial expression must remain legible, fast, accessible, and useful on mobile.
4. Unverified facts are omitted or handled with an honest fallback.
5. The experience feels authored as one house, not assembled from interchangeable templates.

## Accessibility & Inclusion

Meet WCAG 2.1 AA, including keyboard operation, visible focus, semantic structure, descriptive alternatives, 44px minimum touch targets, sufficient contrast, reduced-motion behavior, and accessible validation/status messages.
