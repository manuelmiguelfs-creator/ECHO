"use client";

import { useState } from "react";

export function PersonPhoto({ src, name, className }: { src: string; name: string; className: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .filter((letter) => /[A-Za-z]/.test(letter))
    .slice(0, 2)
    .join("");

  if (failed) {
    return (
      <div className={`grid place-items-center bg-cream ${className}`}>
        <span className="font-display text-6xl font-semibold text-ink/40">{initials}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-cream ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- Wikimedia redirects to its own CDN, which next/image cannot follow reliably. */}
      <img
        src={src}
        alt={`Portrait of ${name}`}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="absolute inset-0 size-full object-cover object-[center_22%]"
      />
    </div>
  );
}
