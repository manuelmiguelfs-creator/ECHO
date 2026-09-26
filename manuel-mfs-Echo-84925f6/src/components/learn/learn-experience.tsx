"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ArrowRight, BookOpen, CircleHelp, Phone, Users } from "lucide-react";
import { useApp } from "@/components/app-provider";
import { LearnConditionView } from "@/components/learn/learn-condition-view";
import { Button } from "@/components/ui/button";
import { normalizeConditionIds } from "@/lib/conditions";
import { learnLibrary } from "@/lib/learn";

const guideParts = [
  { icon: BookOpen, title: "Overview", text: "What it is, its symptoms, causes and treatment." },
  { icon: CircleHelp, title: "FAQ", text: "Straight answers to the most common questions." },
  { icon: Phone, title: "Useful resources", text: "Helplines to call and trusted organisations." },
  { icon: Users, title: "Testimonials", text: "Well-known people who have shared similar experiences." },
];

export function LearnExperience() {
  const { quiz, hydrated } = useApp();
  const requestedId = useSearchParams().get("condition");
  const [chosenId, setChosenId] = useState<string | null>(requestedId);

  if (!hydrated) {
    return <div className="page-shell py-24"><div className="h-72 animate-pulse rounded-[2rem] bg-paper" /></div>;
  }

  const yourConditions = normalizeConditionIds(quiz?.conditions).map((id) => learnLibrary[id]);
  if (yourConditions.length === 0) return <TakeQuizPrompt />;

  const entry = yourConditions.find((item) => item.id === chosenId) ?? yourConditions[0];
  return <LearnConditionView entry={entry} yourConditions={yourConditions} onSelectCondition={setChosenId} />;
}

function TakeQuizPrompt() {
  return (
    <section className="page-shell py-16 sm:py-24">
      <div className="rounded-[2.5rem] bg-blue-soft p-8 sm:p-14">
        <p className="eyebrow">Learn</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[1.02] tracking-[-.03em] sm:text-6xl">
          Your guide is built around you.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/65">
          Take the quiz first so Echo knows which condition to explain. Your guide will then show everything about it in one place.
        </p>
        <Button asChild size="lg" className="mt-8 h-13 rounded-full bg-terracotta px-7 text-base text-white hover:bg-ink">
          <Link href="/quiz">Take the quiz <ArrowRight /></Link>
        </Button>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {guideParts.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4 rounded-2xl bg-paper/80 p-5">
              <Icon className="size-6 shrink-0 text-terracotta" />
              <div>
                <p className="font-semibold">{title}</p>
                <p className="mt-1 text-sm leading-6 text-ink/60">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
