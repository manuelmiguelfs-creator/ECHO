"use client";

import Link from "next/link";
import { useRef, useSyncExternalStore } from "react";
import { BookOpen, CircleHelp, Phone, Sparkles, Users } from "lucide-react";
import { HeroGlow, heroGradients } from "@/components/page-hero";
import { FaqSection, OverviewSection, ResourcesSection, TestimonialsSection } from "@/components/learn/learn-sections";
import type { ConditionId } from "@/lib/conditions";
import { learnSections, type LearnEntry, type LearnSectionId } from "@/lib/learn";

const sectionIcons = {
  overview: BookOpen,
  faq: CircleHelp,
  resources: Phone,
  testimonials: Users,
} satisfies Record<LearnSectionId, typeof BookOpen>;

/** Matches the `h-18` sticky site header. */
const HEADER_HEIGHT = 72;

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function toSectionId(hash: string): LearnSectionId {
  return learnSections.find((section) => section.id === hash)?.id ?? "overview";
}

export function LearnConditionView({
  entry,
  yourConditions,
  onSelectCondition,
}: {
  entry: LearnEntry;
  yourConditions: LearnEntry[];
  onSelectCondition: (id: ConditionId) => void;
}) {
  const tabsAnchorRef = useRef<HTMLDivElement>(null);
  const active = toSectionId(
    useSyncExternalStore(subscribeToHash, () => window.location.hash.slice(1), () => ""),
  );

  function selectSection(id: LearnSectionId) {
    history.replaceState(null, "", `#${id}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    const anchor = tabsAnchorRef.current;
    if (!anchor) return;
    const top = anchor.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
    if (window.scrollY > top) window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <>
      <section className={`${heroGradients[entry.accent]} relative overflow-hidden border-b border-ink/5`}>
        <HeroGlow tone={entry.accent} />
        <div className="page-shell relative py-12 sm:py-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink/60">
              <Sparkles className="size-4 text-terracotta" /> Based on your quiz answers
              <Link href="/quiz" className="font-bold text-terracotta hover:underline">Update</Link>
            </p>
            {yourConditions.length > 1 && (
              <div role="group" aria-label="Your conditions" className="flex flex-wrap gap-2">
                {yourConditions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={item.id === entry.id}
                    onClick={() => onSelectCondition(item.id)}
                    className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                      item.id === entry.id ? "bg-ink text-white" : "bg-white/60 text-ink/70 hover:bg-white"
                    }`}
                  >
                    {item.shortName}
                  </button>
                ))}
              </div>
            )}
          </div>

          <p className="eyebrow mt-10">Your guide · {entry.shortName}</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-[-.03em] sm:text-6xl">
            {entry.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/65">{entry.tagline}</p>

          <dl className="mt-10 grid gap-4 md:grid-cols-3">
            {entry.overview.keyFacts.map((fact) => (
              <div key={fact.label} className="rounded-2xl bg-paper/80 p-5">
                <dt className="text-xs font-bold uppercase tracking-widest text-ink/50">{fact.label}</dt>
                <dd className="mt-2 font-display text-xl font-semibold leading-snug">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div ref={tabsAnchorRef} aria-hidden />
      <div className="sticky top-18 z-40 border-b border-ink/10 bg-cream/95 backdrop-blur">
        <div className="page-shell">
          <div role="tablist" aria-label={`${entry.shortName} guide`} className="-mx-1 flex gap-1 overflow-x-auto py-3">
            {learnSections.map((section) => {
              const Icon = sectionIcons[section.id];
              const selected = section.id === active;
              return (
                <button
                  key={section.id}
                  type="button"
                  role="tab"
                  id={`tab-${section.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${section.id}`}
                  onClick={() => selectSection(section.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    selected ? "bg-white text-terracotta shadow-sm" : "text-ink/65 hover:bg-white/70 hover:text-ink"
                  }`}
                >
                  <Icon className="size-4" />{section.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`} className="page-shell py-12 sm:py-14">
        {active === "overview" && <OverviewSection entry={entry} />}
        {active === "faq" && <FaqSection entry={entry} />}
        {active === "resources" && <ResourcesSection entry={entry} />}
        {active === "testimonials" && <TestimonialsSection entry={entry} />}
      </div>
    </>
  );
}
