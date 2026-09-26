"use client";

import { ArrowUpRight, CircleCheck, Phone, ShieldCheck, Stethoscope } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PersonPhoto } from "@/components/learn/person-photo";
import { emergencyLines, type LearnEntry } from "@/lib/learn";
import type { Helpline } from "@/lib/learn/types";

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mb-8">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl font-semibold">{title}</h2>
      {description && <p className="mt-3 max-w-2xl leading-7 text-ink/65">{description}</p>}
    </div>
  );
}

export function OverviewSection({ entry }: { entry: LearnEntry }) {
  const { overview } = entry;
  return (
    <div className="space-y-6">
      <article className="rounded-[2rem] bg-paper p-7 shadow-sm sm:p-10">
        <SectionHeading eyebrow="Overview" title={`What is ${entry.shortName}?`} />
        <div className="grid gap-5 text-lg leading-8 text-ink/70 lg:grid-cols-2">
          {overview.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </article>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <article className="rounded-[2rem] bg-paper p-7 shadow-sm sm:p-10">
          <h3 className="font-display text-2xl font-semibold">Common signs and symptoms</h3>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {overview.symptoms.map((symptom) => (
              <li key={symptom} className="flex gap-3 rounded-xl bg-cream p-4 text-sm leading-6">
                <CircleCheck className="mt-0.5 size-5 shrink-0 text-terracotta" />{symptom}
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-[2rem] bg-paper p-7 shadow-sm sm:p-10">
          <h3 className="font-display text-2xl font-semibold">What can contribute</h3>
          <ol className="mt-6 grid gap-3">
            {overview.causes.map((cause, index) => (
              <li key={cause} className="flex items-start gap-4 rounded-xl bg-cream p-4 text-sm leading-6">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-white">{index + 1}</span>
                {cause}
              </li>
            ))}
          </ol>
        </article>
      </div>

      <article className="rounded-[2rem] bg-paper p-7 shadow-sm sm:p-10">
        <h3 className="font-display text-2xl font-semibold">How it is treated</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {overview.treatments.map((treatment) => (
            <div key={treatment.name} className="rounded-2xl border border-ink/10 p-6">
              <Stethoscope className="size-6 text-terracotta" />
              <h4 className="mt-4 font-semibold">{treatment.name}</h4>
              <p className="mt-2 text-sm leading-6 text-ink/65">{treatment.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 flex items-start gap-2 text-sm leading-6 text-ink/55">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-sage" />
          This guide is educational. Only a qualified professional can diagnose {entry.shortName} or recommend treatment.
        </p>
      </article>
    </div>
  );
}

export function FaqSection({ entry }: { entry: LearnEntry }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
      <SectionHeading
        eyebrow="FAQ"
        title="Common questions"
        description={`Clear answers to the questions people ask most often about ${entry.shortName}.`}
      />
      <Accordion className="rounded-[1.5rem] bg-paper px-6 shadow-sm">
        {entry.faq.map((item, index) => (
          <AccordionItem key={item.question} value={`faq-${index}`}>
            <AccordionTrigger className="py-5 text-left text-base font-semibold">{item.question}</AccordionTrigger>
            <AccordionContent className="pb-5 leading-7 text-ink/65">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

function HelplineCard({ line, tone }: { line: Helpline; tone: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <a
      href={line.href}
      className={`group flex flex-col rounded-2xl p-6 transition hover:-translate-y-0.5 ${dark ? "bg-white/10 hover:bg-white/15" : "bg-paper shadow-sm hover:shadow-md"}`}
    >
      <span className={`w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${dark ? "bg-white/15 text-white/80" : "bg-cream text-ink/60"}`}>
        {line.region}
      </span>
      <span className={`mt-4 text-sm font-semibold ${dark ? "text-white/80" : "text-ink/70"}`}>{line.name}</span>
      <span className="mt-1 flex items-center gap-2 font-display text-2xl font-semibold">
        <Phone className={`size-5 shrink-0 ${dark ? "text-terracotta-light" : "text-terracotta"}`} />{line.contact}
      </span>
      <span className={`mt-3 text-sm leading-6 ${dark ? "text-white/60" : "text-ink/60"}`}>{line.description}</span>
    </a>
  );
}

export function ResourcesSection({ entry }: { entry: LearnEntry }) {
  return (
    <div className="space-y-10">
      <div className="rounded-[2rem] bg-ink p-7 text-white sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[.16em] text-terracotta-light">In crisis or in danger?</p>
        <h2 className="mt-2 font-display text-3xl font-semibold">Get help right now</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {emergencyLines.map((line) => <HelplineCard key={line.name} line={line} tone="dark" />)}
        </div>
      </div>

      <section>
        <SectionHeading
          eyebrow="Useful resources"
          title={`Support lines for ${entry.shortName}`}
          description="Talk to someone who understands. These lines are free or low-cost and confidential."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {entry.resources.helplines.map((line) => <HelplineCard key={line.name} line={line} tone="light" />)}
        </div>
      </section>

      <section>
        <h3 className="font-display text-2xl font-semibold">Trusted organisations</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {entry.resources.organizations.map((org) => (
            <a
              key={org.href}
              href={org.href}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col rounded-2xl bg-paper p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="flex items-start justify-between gap-3 font-semibold">
                {org.name}
                <ArrowUpRight className="size-4 shrink-0 text-terracotta transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
              <span className="mt-2 text-sm leading-6 text-ink/60">{org.description}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export function TestimonialsSection({ entry }: { entry: LearnEntry }) {
  return (
    <div>
      <SectionHeading
        eyebrow="Testimonials"
        title="You are not alone"
        description={`Well-known people who have spoken openly about their experience with ${entry.shortName}. Their stories are summarised from public statements — Echo never invents quotes.`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {entry.testimonials.map((person) => (
          <article key={person.name} className="flex flex-col overflow-hidden rounded-[1.75rem] bg-paper shadow-sm">
            <PersonPhoto src={person.photo.src} name={person.name} className="aspect-[4/3] w-full" />
            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-terracotta">{person.knownFor}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold">{person.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-ink/65">{person.story}</p>
              <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4 text-xs">
                <a href={person.learnMoreHref} target="_blank" rel="noreferrer" className="flex items-center gap-1 font-bold text-terracotta">
                  Read more <ArrowUpRight className="size-3.5" />
                </a>
                <a href={person.photo.creditHref} target="_blank" rel="noreferrer" className="text-ink/40 hover:text-ink/70">
                  Photo: Wikimedia Commons
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
