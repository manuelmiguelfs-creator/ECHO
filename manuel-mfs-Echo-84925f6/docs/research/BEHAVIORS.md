# Hero Animation Behavior Notes

## Cloudstudio source

- The visible hero character is a canvas-based particle mascot.
- It is time-driven and reacts to pointer position.
- The source scales the character with CSS variables and uses a smaller version on mobile.
- Character selection is controlled by a separate picker; that picker is intentionally not copied into Echo.

## Echo implementation

- The hero animation is rendered by `HeroWellbeingAnimation`.
- Particles gently drift around a central mental-wellbeing signal.
- Pointer movement attracts nearby particles toward the pointer.
- `prefers-reduced-motion: reduce` disables continuous animation and pointer movement.
- The animation is local to its canvas and cleans up its animation frame and resize observer on unmount.
- The statistic links to the WHO mental-disorders fact sheet.
