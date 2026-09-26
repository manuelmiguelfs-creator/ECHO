"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Eye, LockKeyhole, MessagesSquare, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/logo-mark";
import { useApp } from "@/components/app-provider";
import { conditionHeading, formatConditionList, selectedConditionProfiles } from "@/lib/conditions";

export default function AboutPage() {
  const { quiz } = useApp();
  const labels = selectedConditionProfiles(quiz?.conditions).map((profile) => profile.label);
  const list = formatConditionList(labels);
  const heading = conditionHeading(labels, "mental health");
  const single = labels.length === 1;

  const goals = [
    [`Give ${heading} visibility`, list ? `Represent ${list} with more accuracy and care.` : "Represent mental health with more accuracy and care.", Eye],
    ["Open honest conversations", "Make it easier to speak without reducing people to symptoms.", MessagesSquare],
    ["Reduce stigma", list ? `Challenge misinformation and stereotypes about ${list}.` : "Challenge misinformation, stereotypes, and casual misuse of clinical language.", ShieldCheck],
    ["Support understanding", list ? `Explain ${list} in plain, empathetic language.` : "Explain mental health in plain, empathetic language.", BookOpen],
  ] as const;

  const whyTitle = labels.length === 0
    ? "A condition is not a personality trait or a passing habit."
    : single
      ? `${labels[0]} is not a personality trait or a passing habit.`
      : "These conditions are not personality traits or passing habits.";

  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="Built by students who wanted mental health conversations to feel more human."
        description={
          list
            ? `Echo is here so ${list} can be understood, represented, and discussed with more care.`
            : "Echo is a place to understand mental health with more accuracy, care, and room to talk."
        }
        tone="sage"
      />
      <div className="page-shell py-14">
        <section className="grid gap-10 lg:grid-cols-2">
          <div><p className="eyebrow">Why Echo exists</p><h2 className="mt-4 font-display text-5xl font-semibold">{whyTitle}</h2></div>
          <div className="space-y-5 text-lg leading-8 text-ink/65">
            <p>{list ? `${list} ${single ? "deserves" : "deserve"} more attention, honest discussion, and accurate representation.` : "Mental health conditions deserve more attention, honest discussion, and accurate representation."}</p>
            <p>This student-led project brings condition-aware education, practical support, reflection, and community into one welcoming space. The quiz helps each person find information and activities relevant to the conditions they select.</p>
            <p>We believe knowledge can be one meaningful step in recovery—but knowledge is not a substitute for personalized professional care.</p>
          </div>
        </section>

        <section className="section-space">
          <div className="grid gap-5 sm:grid-cols-2">
            {goals.map(([title, text, Icon], index) => (
              <article key={title} className={`rounded-[1.75rem] p-7 ${index === 0 ? "bg-pink-soft" : index === 1 ? "bg-blue-soft" : index === 2 ? "bg-ochre-light" : "bg-sage-light"}`}>
                <Icon className="size-7 text-terracotta" />
                <h3 className="mt-8 font-display text-3xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-ink/65">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid overflow-hidden rounded-[2.5rem] bg-ink text-white lg:grid-cols-[1fr_.8fr]">
          <div className="p-8 sm:p-12"><p className="text-xs font-bold uppercase tracking-[.18em] text-terracotta-light">A living platform</p><h2 className="mt-4 font-display text-4xl font-semibold">Help us make Echo more useful.</h2><p className="mt-4 max-w-xl leading-7 text-white/60">Share a strategy for team review or explore the current activity library. Every community idea stays private until moderation.</p><div className="mt-7 flex flex-wrap gap-3"><Button asChild className="rounded-full bg-white text-ink hover:bg-cream"><Link href="/community">Share an idea <ArrowRight /></Link></Button><Button asChild variant="outline" className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10"><Link href="/solutions">Explore activities</Link></Button></div></div>
          <div className="grid place-items-center bg-cream p-8 text-ink">
            <div className="text-center">
              <LogoMark className="mx-auto size-28 drop-shadow-md" />
              <p className="mt-5 font-display text-3xl font-semibold">Say it.<br />Hear it back.</p>
            </div>
          </div>
        </section>

        <section className="mt-8 flex gap-4 rounded-2xl border border-ink/10 bg-paper p-6">
          <LockKeyhole className="mt-1 size-6 shrink-0 text-terracotta" />
          <div><h2 className="font-semibold">Team contacts are private</h2><p className="mt-2 text-sm leading-6 text-ink/60">Personal phone numbers and university email addresses are intentionally excluded from this public page. A future authenticated administrative area can store authorized team contact details. The source brief also describes both three and four founders; the exact public team count should be confirmed before publication.</p></div>
        </section>
      </div>
    </>
  );
}
