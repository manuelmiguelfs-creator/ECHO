# Cloudstudio Hero Animation Specification

## Overview

- Target source: `https://cloudstudio.es/`
- Echo target: `src/components/home-content.tsx`
- Target area: the hero character/animation replacing Echo’s current right-side hero visual
- Interaction model: time-driven canvas animation with pointer-responsive motion; the source also has clickable character variants, but Echo will use one adapted mental-wellbeing visual without the variant picker
- Reference screenshots:
  - Desktop: `C:\Users\manue\AppData\Local\Temp\cursor\screenshots\page-2026-09-26T14-20-33-986Z.png` (mobile source reference)
  - Desktop source captured in the browser at 1920×1080

## Source observations

- Cloudstudio’s hero uses a large canvas-based particle character (`.cs-ai-mascot`) centered in the hero.
- The source mascot is a 561×561 canvas rendered at roughly 449×449 CSS pixels at 1920×1080.
- Source visual palette:
  - Ink: `#0e0e0c`
  - Accent yellow: `#FFF48D`
  - Paper: `#faf7ea`
- The mascot is visually composed of many small particles forming a face/character, with large eyes and a central dark shape.
- The source hero also contains a separate hidden/opacity-zero Three.js organism canvas; the visible hero character is the `.cs-ai-mascot` canvas.
- The source mascot has `opacity: 1`, `transition: opacity 0.35s`, and pointer-driven CSS variables `--cs-mx`, `--cs-my`, and `--cs-mscale`.
- The source hero is full viewport height on desktop and stacks vertically on mobile.
- At 390px, the mascot becomes a smaller particle character beneath the hero title, with the control/prompt below it.

## Echo adaptation

- Do not copy Cloudstudio’s branding, text, yellow palette, or character identity.
- Use Echo’s existing visual tokens:
  - ink for the dark particle core
  - cream/paper background
  - terracotta and ochre for the animated accent particles
  - sage as a soft surrounding field
- Replace the abstract Cloudstudio character with a calm “signal” made of small particles that loosely forms a breathing orb/wave.
- Copy the source’s visual principles rather than its branded artwork:
  - many independently moving dots
  - a strong central silhouette
  - gentle idle motion
  - pointer attraction/repulsion
  - responsive scale
- Echo content inside/near the animation:
  - label: `Echo / mental well-being`
  - central message: `Make space`
  - supporting message: `One small step is still a step.`
  - statistic card: `1 in 8 people worldwide live with a mental disorder.` with a WHO source link

## Implementation requirements

- Create a focused client component for the animation, such as `src/components/hero-wellbeing-animation.tsx`.
- Use `requestAnimationFrame` and a `<canvas>` for the particles; cancel the frame loop on unmount.
- Respect `prefers-reduced-motion`: render a static particle arrangement with no continuous animation when reduced motion is enabled.
- Keep pointer interaction local to the animation container and do not add global mouse listeners.
- Make the particle field responsive with a CSS-size canvas and device-pixel-ratio-aware backing dimensions.
- Use a deterministic seeded particle layout so SSR/client markup remains stable; draw only after mount.
- Do not use external assets or copy Cloudstudio source code.

## Responsive behavior

- Desktop (1440px+): animation occupies the right hero column, approximately 440–520px square.
- Tablet (~768px): animation remains visible but scales down and follows the hero content.
- Mobile (390px): animation moves below the hero copy, remains approximately 250–300px square, and reduces particle count for performance.

## QA

- Verify the animation appears on the Echo homepage at `/`.
- Verify pointer movement changes the particle field without affecting page scroll.
- Verify animation cleanup on navigation.
- Verify the reduced-motion media query produces a stable visual.
- Run `npx tsc --noEmit`, `npm run lint`, and `npm run build`.
