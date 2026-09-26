"use client";

import { useEffect, useState } from "react";

export function IntroSplash() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }

    const fadeTimer = window.setTimeout(() => {
      setFading(true);
    }, 2100);

    const doneTimer = window.setTimeout(() => setVisible(false), 2900);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={fading ? "intro-splash is-fading" : "intro-splash"} aria-hidden="true" inert>
      <div className="intro-echo">
        <svg className="intro-echo-svg" viewBox="0 0 100 100">
          <circle className="intro-ring" cx="50" cy="50" r="1.8" />
          <circle className="intro-ring" cx="50" cy="50" r="1.8" />
          <circle className="intro-ring" cx="50" cy="50" r="1.8" />
        </svg>
        <span className="intro-core" />
      </div>
    </div>
  );
}
