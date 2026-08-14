---
name: Casa D'Lucca
description: A warm, editorial Brazilian beauty house in Chicago.
colors:
  ink: "#1c1c1a"
  umber: "#51463d"
  taupe: "#9a8977"
  sand: "#d8cdbd"
  linen: "#f3f0e9"
  alabaster: "#faf9f6"
  white: "#ffffff"
  brass: "#b79355"
  void: "#0e0d0c"
typography:
  display:
    fontFamily: "Bodoni Moda, Didot, Times New Roman, serif"
    fontSize: "clamp(2.5rem, 1.7rem + 3.4vw, 4.5rem)"
    fontWeight: 440
    lineHeight: 1.01
    letterSpacing: "-0.025em"
  display-xl:
    fontFamily: "Bodoni Moda, Didot, Times New Roman, serif"
    fontSize: "clamp(3.15rem, 1.8rem + 6.4vw, 7.25rem)"
    fontWeight: 440
    lineHeight: 0.92
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Bodoni Moda, Didot, Times New Roman, serif"
    fontSize: "clamp(1.75rem, 1.3rem + 2vw, 2.75rem)"
    fontWeight: 440
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Lora, Georgia, serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "-0.01em"
  label:
    fontFamily: "Inter Tight, Arial, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.18em"
rounded:
  hairline: "2px"
spacing:
  1: "0.5rem"
  2: "1rem"
  3: "1.5rem"
  4: "2.5rem"
  5: "4rem"
  6: "6rem"
  7: "9rem"
  8: "12.5rem"
  9: "17.5rem"
  gutter: "clamp(1.5rem, 1rem + 3vw, 4rem)"
  section: "clamp(6rem, 4rem + 7vw, 12.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.linen}"
    rounded: "0"
    padding: "1.05rem 2.5rem"
    height: "3.25rem"
    typography: "{typography.label}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "0"
    padding: "1.05rem 2.5rem"
    height: "3.25rem"
    typography: "{typography.label}"
  button-on-dark:
    backgroundColor: "transparent"
    textColor: "{colors.linen}"
    rounded: "0"
    padding: "1.05rem 2.5rem"
    height: "3.25rem"
    typography: "{typography.label}"
---

# Design System: Casa D'Lucca

## Overview

**Creative North Star: "The Brazilian Modernist House"**

Casa D'Lucca is a high-touch Brazilian beauty house in Chicago: an editorial world of warm mineral paper, near-black rooms, antique-brass hairlines, and real salon imagery. Its sophistication comes from proportion, photography, and type—not generic luxury ornament. Brazilian modernist curves soften the system while Chicago Deco discipline gives it its vertical rhythm.

The experience is photographic and typographic, asymmetrical but composed. Service detail is deliberately dense enough to be useful, then opened up by generous blank space and long horizontal rules. The work, the people, and a clear route to booking lead; the interface stays quiet and factual around them.

**Key Characteristics:**

- Warm mineral palette with void-black contrast and restrained brass signals.
- Bodoni Moda display type over literary Lora body copy and compact Inter Tight labels.
- 12-column editorial composition on larger screens; six-column mobile composition with preserved asymmetry.
- Real photography as the primary source of atmosphere and proof.
- One controlled arch silhouette per viewport; hairline rules and vertical dividers provide the recurring geometry.

## Colors

The palette feels like sun-warmed stone, paper, darkened wood, and aged brass—never clinical, glossy, or cold.

### Primary

- **Antique Brass:** The rare focus color: use it for rules, active underlines, markers, and focus signals. Its scarcity gives hierarchy weight.

### Secondary

- **House Ink:** The default action and primary-text tone on light mineral surfaces.
- **Deep Umber:** The softer reading and secondary-text tone; it carries body detail without flattening the typographic hierarchy.

### Neutral

- **Warm Linen:** The principal page field and light-on-dark text tone.
- **Alabaster Paper:** The raised, quietest surface for tonal separation rather than card-like elevation.
- **Fine Sand:** The standard divider, muted-on-dark text, and material transition tone.
- **Weathered Taupe:** Reserved for subdued metadata and scrollbar detail.
- **Clean White:** A minimal utility surface when a true white is required.
- **Void:** The near-black room for photographic filmstrips, the footer, immersive menus, and high-contrast panels.

### Named Rules

**The Brass Signal Rule.** Brass is a rule, focus, or active-state signal—not a broad decorative fill. Keep it visually scarce.

**The Mineral-Not-Clinical Rule.** Default to linen, alabaster, sand, ink, and umber. Avoid cool gray, blue-white, glossy black, or medical-interface color logic.

## Typography

**Display Font:** Bodoni Moda (with Didot and Times New Roman fallbacks)

**Body Font:** Lora (with Georgia fallback)

**Label Font:** Inter Tight (with Arial fallback)

**Character:** Bodoni Moda supplies the house's high-fashion editorial scale; Lora makes longer service and story copy welcoming and literate. Inter Tight becomes the precise, compact operational voice for navigation, prices, metadata, and actions.

### Hierarchy

- **Display XL** (440, fluid 3.15–7.25rem, 0.92): Reserved for the home hero and its three deliberate lines.
- **Display** (440, fluid 2.5–4.5rem, 1.01): The major section and page titles.
- **Headline** (440, fluid 1.75–2.75rem, 1.12): Service names, article-sized statements, and secondary hierarchy.
- **Body** (400, 1.0625rem, 1.65): Lora copy with a readable maximum measure of 68ch; standfirsts expand fluidly up to 1.5rem.
- **Label** (500, 0.6875rem, 0.18em, uppercase): Inter Tight for labels, prices, durations, navigation, and calls to action.

### Named Rules

**The Three-Line Arrival Rule.** The home title remains exactly three lines: “Chicago’s / Brazilian beauty / destination.” Its line breaks are part of the composition.

**The Labels-Are-Tools Rule.** Small uppercase labels provide navigation and data precision; they do not compete with display headings for expressive weight.

## Layout

The desktop canvas is a 12-column grid inside a 90rem content maximum, with a fluid gutter and narrow column gaps. Sections use a broad, fluid vertical interval. Major editorial moves span uneven column ranges rather than settling into symmetric cards: copy often occupies columns two through seven while an image begins around column eight.

At 1023px, navigation becomes a full-height mobile menu and multi-column editorial modules simplify without losing their house rhythm. At 767px, the base grid becomes six columns, text and actions widen, service rows become two-column information stacks, and filmstrips retain their horizontal browse behavior. The compact fixed Call/Book action system stays visible at tablet and mobile sizes.

**The Photograph Leads Rule.** Give a photograph room to establish each major section. Typography should align to, frame, or counterbalance it—not turn the image into a decorative card thumbnail.

## Elevation & Depth

This is a flat system. Depth comes from tonal fields, image crop, contrast, brass rules, and occasional overlaid navigation—not drop shadows. Alabaster provides the sole gentle raised-surface distinction over linen; void provides the strongest room change. The Home hero alone uses a dark directional scrim, strictly as a legibility layer over photography.

**The No-Shadow Rule.** Do not introduce box shadows, glass blur, floating cards, or gradients. The sole gradient exception is the functional Home hero scrim.

## Shapes

Edges are sharp and architectural: buttons, fields, dividers, navigation modules, and service rows use square corners. A two-pixel hairline radius exists only as a technical micro-adjustment, never as a visible soft-card language. The signature curve is a single, cropped Brazilian arch applied to selected media; it is an accent, not a repeating pattern.

**The One-Arch Rule.** Use no more than one arch motif within a viewport. Let it establish a moment of softness against the house's rules and rectangles.

## Components

### Buttons

Quiet editorial actions with a sweeping fill state rather than a pill or elevated-control treatment.

- **Shape:** Square corners; a 3.25rem minimum height (3.5rem on small screens).
- **Primary:** House Ink with Warm Linen text; Inter Tight uppercase label; generous horizontal inset.
- **Ghost:** Transparent with House Ink text; on hover or keyboard focus, an ink fill reverses the text to linen.
- **On Dark:** Transparent Warm Linen action with a linen outline; its hover fill reverses to Void.
- **Focus:** A visible Antique Brass outline with a small offset.

### Service Rows

Dense, breathable service-menu data rather than cards.

- **Structure:** Name, dotted leader, tabular price, and duration sit on one ruled desktop row; price and duration remain legible in a stacked two-column mobile layout.
- **Surface:** Transparent at rest with an Alabaster hover field; Fine Sand provides dividers and dotted leaders.
- **Type:** Service names are body-sized; prices and durations use compact Inter Tight labels with tabular figures.

### Inputs / Fields

Underlined editorial fields that preserve attention for the form's content.

- **Style:** Transparent surface, square corners, and a single Fine Sand bottom border.
- **Focus:** The underline shifts to Antique Brass; the browser-visible brass focus outline remains available for keyboard users.
- **Error:** Deep Umber status text, with no aggressive alert-color treatment.

### Disclosure

An editorial accordion with a simple brass plus/minus mark.

- **Structure:** One Fine Sand bottom rule per item; a minimum 4rem trigger; text at left and the mark at right.
- **Open state:** The vertical stem rotates away to become a horizontal line while the content expands using the house easing.

### Navigation

Desktop navigation frames the wordmark between two label groups; the fixed bar turns from transparent-on-image to a compact Linen field after the hero threshold.

- **Desktop:** Small Inter Tight links use a brass underline for hover, focus, and current-route state; Book is an outlined compact action.
- **Mobile:** The menu becomes a Void full-screen panel with large Bodoni Moda links. The mobile action bar is a fixed, bordered Call/Book pair: linen for Call and ink for Book.

### Media & Filmstrips

Real salon photography is framed by crop and proportion, not decorative chrome.

- **Media:** Use object-fit imagery in sand-backed frames; the selected arch applies only to a media frame.
- **Filmstrip:** Void field, edge-to-edge horizontal scroll, large image panels, brass progress rule, and accessible lightbox expansion.

### Map Fallback

The map remains usable even when its external iframe cannot load.

- **Style:** Grayscale map under a restrained Void overlay, a small brass-outlined diamond marker, and a permanent high-contrast direction strip.
- **Fallback:** Show the street address and a clear “Get directions” link in the strip; do not leave the location as an image-only or iframe-only experience.

## Do's and Don'ts

### Do:

- **Do** lead with real salon imagery and use it as evidence, atmosphere, and spatial counterweight.
- **Do** use brass for hairlines, active underlines, focus, markers, and singular emphasis.
- **Do** keep service information compact, ruled, and easy to scan; preserve price and duration prominence.
- **Do** maintain the 12-column to six-column grid transition and the horizontal filmstrip behavior on mobile.
- **Do** keep motion restrained, use the house easing, and reduce it to near-instant under `prefers-reduced-motion`.
- **Do** keep the compact Call/Book system available on mobile and preserve visible keyboard focus.

### Don't:

- **Don't** use generic salon card grids, pill buttons, oversized rounded corners, decorative icon tiles, glass effects, stock textures, or AI-generated imagery.
- **Don't** use gradients except the single functional legibility scrim on the Home hero.
- **Don't** turn brass into a dominant background color or add visual clutter through redundant decorative numerals.
- **Don't** replace real routes, map directions, or financing recovery paths with loading-only or image-only states.
- **Don't** use clinical, cold, or exaggerated luxury styling; the house is warm, specific, welcoming, expert, and sophisticated.
