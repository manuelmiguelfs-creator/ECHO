import Link from "next/link";
import { ArrowRight, Eye, HeartHandshake, LockKeyhole, MessagesSquare, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";

const goals = [
  ["Give OCD visibility", "Represent the condition with more accuracy and care.", Eye],
  ["Open honest conversations", "Make it easier to speak without reducing people to symptoms.", MessagesSquare],
  ["Reduce stigma", "Challenge misinformation, stereotypes, and casual misuse of the term.", ShieldCheck],
  ["Support understanding", "Explain obsessions and compulsions in plain, empathetic language.", HeartHandshake],
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="Our story" title="Built by students who wanted mental health conversations to feel more human." description="Echo began with concern about how poorly OCD—and many other mental health conditions—can be understood, represented, and discussed." tone="sage" />
      <div className="page-shell py-14">
        <section className="grid gap-10 lg:grid-cols-2">
          <div><p className="eyebrow">Why Echo exists</p><h2 className="mt-4 font-display text-5xl font-semibold">OCD is not a personality trait or a passing habit.</h2></div>
          <div className="space-y-5 text-lg leading-8 text-ink/65"><p>It is a serious condition that can affect people across the world and deserves more attention, honest discussion, and accurate representation.</p><p>This student-led project brings education, practical support, reflection, and community into one welcoming space. Today’s content focuses on OCD; the wider vision includes responsibly reviewed education for other mental health conditions.</p><p>We believe knowledge can be one meaningful step in recovery—but knowledge is not a substitute for personalized professional care.</p></div>
        </section>

        <section className="section-space">
          <div className="grid gap-5 sm:grid-cols-2">
            {goals.map(([title, text, Icon], index) => {
              const GoalIcon = Icon as typeof Eye;
              return <article key={String(title)} className={`rounded-[1.75rem] p-7 ${index === 0 ? "bg-pink-soft" : index === 1 ? "bg-blue-soft" : index === 2 ? "bg-ochre-light" : "bg-sage-light"}`}><GoalIcon className="size-7 text-terracotta" /><h3 className="mt-8 font-display text-3xl font-semibold">{String(title)}</h3><p className="mt-3 leading-7 text-ink/65">{String(text)}</p></article>;
            })}
          </div>
        </section>

        <section className="grid overflow-hidden rounded-[2.5rem] bg-ink text-white lg:grid-cols-[1fr_.8fr]">
          <div className="p-8 sm:p-12"><p className="text-xs font-bold uppercase tracking-[.18em] text-terracotta-light">A living platform</p><h2 className="mt-4 font-display text-4xl font-semibold">Help us make Echo more useful.</h2><p className="mt-4 max-w-xl leading-7 text-white/60">Share a strategy for team review or explore the current activity library. Every community idea stays private until moderation.</p><div className="mt-7 flex flex-wrap gap-3"><Button asChild className="rounded-full bg-white text-ink hover:bg-cream"><Link href="/community">Share an idea <ArrowRight /></Link></Button><Button asChild variant="outline" className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10"><Link href="/solutions">Explore activities</Link></Button></div></div>
          <div className="grid place-items-center bg-terracotta p-8"><div className="text-center"><HeartHandshake className="mx-auto size-16" /><p className="mt-5 font-display text-3xl font-semibold">Say it.<br />Hear it back.</p></div></div>
        </section>

        <section className="mt-8 flex gap-4 rounded-2xl border border-ink/10 bg-paper p-6">
          <LockKeyhole className="mt-1 size-6 shrink-0 text-terracotta" />
          <div><h2 className="font-semibold">Team contacts are private</h2><p className="mt-2 text-sm leading-6 text-ink/60">Personal phone numbers and university email addresses are intentionally excluded from this public page. A future authenticated administrative area can store authorized team contact details. The source brief also describes both three and four founders; the exact public team count should be confirmed before publication.</p></div>
        </section>
      </div>
    </>
  );
}
