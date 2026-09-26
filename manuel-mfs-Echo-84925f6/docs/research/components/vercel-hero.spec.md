# Vercel homepage hero — adapted for Echo

Source: https://vercel.com/home (desktop 1440, mobile 390), inspected 2026-09-26.
Screenshots: `docs/design-references/vercel-hero-desktop.png`, `docs/design-references/vercel-hero-mobile.png`.

Echo adaptation replaces Vercel copy, the triangle mark, and black/white tokens. Vercel glow, noise, and logo image assets are not copied.

## Layout

- Full-bleed dark section. Desktop hero row is about 728px tall inside a section about 836px, page margin 24px, content width about 1377px.
- Flex row, `justify-content: space-between`, `align-items: center`, padding 40px 0.
- Left column: max-width 444px, left aligned. Headline plus two pills.
- Center visual: absolutely centered, about 1080×720, pointer-events none, behind the text (`z-0`).
- Right column: max-width 364px, hidden below the large breakpoint. Three stacked lines, gap 8px, padding 32px 8px.

Mobile: column, mark on top, centered headline, one short line, full-width stacked pills. The three-line column is hidden.

## Type and controls

- Headline: 64px, weight 400, line-height 64px, letter-spacing -3.84px, color rgb(237, 237, 237). Echo uses Fraunces at a similar scale, cream text, terracotta on the second line.
- Primary pill: height 40px, padding 0 12px, fully rounded, fill rgb(237, 237, 237), text rgb(10, 10, 10). Echo uses a cream pill with ink text.
- Secondary pill: same size, transparent fill, 1px ring rgb(46, 46, 46). Echo uses a cream hairline ring.
- Right lines: 16px / 24px. Lead phrase stays visible. The rest of the sentence is opacity 0 and clipped to 24px height until hover, then the row grows (observed 84px) over 200ms and the continuation fades in over about 300–500ms at rgb(161, 161, 161).

## Center visual

A canvas shader draws a glowing triangle, with a static glow image and a noise overlay at opacity 0.42 as fallback. The canvas fades in over 1200ms. Echo draws its own concentric echo mark with a terracotta and ochre radial glow, and a slow opacity pulse that stops under `prefers-reduced-motion`.

## Echo content

Headline stays “Say it, hear it back.” Right-hand lines cover naming the moment, the WHO “1 in 8” estimate, and on-device privacy. After the quiz, the first line names the selected conditions. Buttons stay “Start with the quiz” or “I Need Help Now” plus “Understand your conditions.”
