"use client";

import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import { useApp } from "@/components/app-provider";

const footerLinks = [
  ["/what-is-ocd", "What is OCD?"],
  ["/solutions", "Solution Library"],
  ["/quiz", "Take the Quiz"],
  ["/community", "Help Our Community"],
  ["/help-now", "I Need Help Now!"],
];

export function SiteFooter() {
  const { quiz } = useApp();
  const hasQuiz = Boolean(quiz?.conditions?.length);
  const visibleLinks = hasQuiz ? footerLinks : [["/quiz", "Take the Quiz"]];

  return (
    <footer className="mt-auto bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 md:grid-cols-[1fr_auto] lg:px-8">
        <div className="max-w-lg">
          <div className="mb-5 flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-terracotta">
              <HeartHandshake className="size-5" aria-hidden />
            </span>
            <span className="font-display text-3xl font-semibold">Echo</span>
          </div>
          <p className="text-cream/70">
            A private space for learning how Echo works and finding a next step that feels manageable.
          </p>
          <p className="mt-5 text-xs leading-relaxed text-cream/50">
            Echo is educational and supportive. It does not diagnose, provide treatment, or replace
            a psychologist, psychiatrist, doctor, or emergency service.
          </p>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-cream/50">Quick links</p>
          <div className="grid gap-3">
            {visibleLinks.map(([href, label]) => (
              <Link key={href} href={href} className="font-medium text-cream/80 hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-cream/50">
        © 2026 Echo. All rights reserved.
      </div>
    </footer>
  );
}
