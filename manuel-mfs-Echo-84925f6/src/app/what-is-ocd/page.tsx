"use client";

import { ArrowUpRight, CircleCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { useApp } from "@/components/app-provider";
import { conditionProfiles, normalizeConditionIds } from "@/lib/conditions";

export default function WhatIsOcdPage() {
  const { quiz } = useApp();
  const selectedIds = normalizeConditionIds(quiz?.conditions);
  const profiles = conditionProfiles.filter((profile) =>
    selectedIds.length ? selectedIds.includes(profile.id) : profile.id === "ocd",
  );
  const title = profiles.length === 1 ? `What is ${profiles[0].label}?` : "Understand your conditions";

  return (
    <>
      <PageHero
        eyebrow="Education"
        title={title}
        description="Learn from established health organizations about the conditions selected in your quiz. Echo is educational and cannot diagnose or replace professional care."
        tone="blue"
      />
      <div className="page-shell py-14">
        <div className="space-y-8">
          {profiles.map((profile) => (
            <section key={profile.id} id={profile.id} className="scroll-mt-28 rounded-[2rem] bg-paper p-7 shadow-sm sm:p-10">
              <div className="flex flex-col justify-between gap-4 border-b border-ink/10 pb-7 sm:flex-row sm:items-start">
                <div>
                  <p className="eyebrow">Selected condition</p>
                  <h2 className="mt-3 font-display text-4xl font-semibold">{profile.label}</h2>
                  <p className="mt-4 max-w-3xl text-lg leading-8 text-ink/70">{profile.summary}</p>
                </div>
                <span className="rounded-full bg-ochre-light px-4 py-2 text-xs font-bold uppercase tracking-wider">Educational only</span>
              </div>
              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="font-display text-2xl font-semibold">Common experiences</h3>
                  <ul className="mt-4 grid gap-3">
                    {profile.experiences.map((experience) => (
                      <li key={experience} className="flex gap-3 rounded-xl bg-cream p-4 text-sm leading-6">
                        <CircleCheck className="mt-0.5 size-5 shrink-0 text-terracotta" />{experience}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold">Support and care</h3>
                  <p className="mt-4 leading-7 text-ink/70">{profile.support}</p>
                  <h3 className="mt-8 font-display text-2xl font-semibold">Public figures who have spoken openly</h3>
                  <ul className="mt-4 grid gap-3">
                    {profile.publicFigures.map((person) => (
                      <li key={person.name} className="rounded-xl bg-cream p-4 text-sm leading-6">
                        <strong>{person.name}</strong><span className="text-ink/65"> — {person.note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-8 border-t border-ink/10 pt-6">
                <h3 className="font-display text-2xl font-semibold">Trusted starting points</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {profile.sources.map((source) => (
                    <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl bg-cream p-4 font-semibold hover:shadow-md">
                      {source.label}<ArrowUpRight className="size-4" />
                    </a>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
