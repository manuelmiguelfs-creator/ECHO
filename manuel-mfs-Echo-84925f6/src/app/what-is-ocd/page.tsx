import Link from "next/link";
import { ArrowUpRight, Brain, CircleCheck, RefreshCcw } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { educationFaqs, sources } from "@/lib/education";

const obsessions = [
  "Fear of contact with contaminated substances",
  "Fear of acting on an impulse to harm someone",
  "Recurring violent or frightening images",
  "Fear of causing harm through carelessness",
  "An excessive need for exactness or doing things “correctly”",
  "Fear of making mistakes",
  "Fears related to sexual impulses",
  "Fear of offending God",
  "Excessive moral concerns",
  "Relationship obsessions",
  "Existential obsessions about death, the universe, or purpose",
];

const compulsions = [
  "Excessive bathing, tooth brushing, or hygiene routines",
  "Repeatedly cleaning objects",
  "Mentally reviewing events",
  "Praying to prevent a tragedy",
  "Counting until reaching a “safe” number",
  "Mentally canceling or undoing words or thoughts",
  "Arranging until things feel “just right”",
  "Avoiding situations that activate obsessions",
  "Repeating activities a specific number of times",
];

export default function WhatIsOcdPage() {
  return (
    <>
      <PageHero
        eyebrow="🧠 Education"
        title="What is OCD?"
        description="Obsessive-compulsive disorder is not a preference, personality quirk, or shorthand for being organized. It can be a serious condition that creates a painful cycle of obsessions and compulsions."
        tone="blue"
      />
      <div className="page-shell py-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <ConceptCard
            icon={<Brain />}
            number="01"
            title="Obsessions"
            text="Unwanted thoughts, images, or urges that feel outside a person’s control and often create fear, disgust, doubt, uncertainty, or anxiety. Most people have occasional intrusive thoughts; in OCD they tend to be frequent, highly distressing, and disruptive."
            examples={obsessions}
            tone="bg-pink-soft"
          />
          <ConceptCard
            icon={<RefreshCcw />}
            number="02"
            title="Compulsions"
            text="Repetitive behaviors or mental acts used to reduce anxiety or neutralize an obsession. They may bring temporary relief while reinforcing the OCD cycle over time."
            examples={compulsions}
            tone="bg-sage-light"
          />
        </div>

        <div className="mt-8 rounded-2xl border-l-4 border-terracotta bg-paper p-6">
          <p className="leading-7 text-ink/70">
            Saying you are “obsessed” with a song or topic does not necessarily mean OCD. Likewise, not every
            habit or repetitive behavior is a compulsion. The function, distress, sense of obligation, and
            impact on life matter—and only a qualified professional can diagnose the condition.
          </p>
        </div>

        <section className="section-space">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div><p className="eyebrow">The wider picture</p><h2 className="mt-4 font-display text-5xl font-semibold">What we know—and what we do not.</h2></div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "OCD can affect people of every age, gender, and background.",
                "It may begin in childhood, adolescence, or early adulthood.",
                "Its exact cause is not fully known.",
                "Genetics, brain circuits, learning, and environmental factors may be involved.",
                "Stress and hormonal changes may intensify symptoms.",
                "Diagnosis must come from a qualified mental health professional.",
                "Assessment considers obsessions, compulsions, distress, and daily impact.",
                "Depression, anxiety, substance use, and medical conditions may also need consideration.",
              ].map((fact) => <div key={fact} className="flex gap-3 rounded-xl bg-paper p-4 text-sm leading-6"><CircleCheck className="mt-0.5 size-5 shrink-0 text-terracotta" />{fact}</div>)}
            </div>
          </div>
        </section>

        <section className="rounded-[2.5rem] bg-ink p-7 text-white sm:p-12">
          <p className="eyebrow !text-terracotta-light">Professional care</p>
          <div className="mt-4 grid gap-10 lg:grid-cols-2">
            <div><h2 className="font-display text-4xl font-semibold">Improvement is possible.</h2><p className="mt-4 leading-7 text-white/65">Exposure and Response Prevention (ERP) is an important psychological approach. Medication can also form part of care, but Echo does not recommend specific medicines. Many people improve substantially with appropriate support; the goal is symptom management, not a promise of instant cure.</p></div>
            <div className="rounded-2xl bg-white/8 p-6"><h3 className="font-semibold">A responsible next step</h3><p className="mt-3 text-sm leading-6 text-white/60">If symptoms cause distress or interfere with everyday life, talk with an OCD-informed mental health professional or your family doctor.</p><Button asChild className="mt-5 rounded-full bg-white text-ink hover:bg-cream"><Link href="#sources">Find trusted information</Link></Button></div>
          </div>
        </section>

        <section className="section-space grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div><p className="eyebrow">Educational FAQ</p><h2 className="mt-4 font-display text-5xl font-semibold">Questions deserve careful answers.</h2></div>
          <Accordion className="rounded-2xl bg-paper px-6">
            {educationFaqs.map((item, index) => (
              <AccordionItem key={item.question} value={`education-${index}`}>
                <AccordionTrigger className="py-5 text-left font-semibold">{item.question}</AccordionTrigger>
                <AccordionContent className="pb-5 leading-7 text-ink/65">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section id="sources" className="scroll-mt-28 rounded-[2rem] bg-ochre-light p-7 sm:p-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow">Trusted starting points</p><h2 className="mt-3 font-display text-3xl font-semibold">Learn from established health organizations</h2></div><span className="rounded-full bg-white/60 px-4 py-2 text-xs font-bold uppercase tracking-wider">Medical statistics: verify before publishing</span></div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {sources.map(([label, href]) => <a key={href} href={href} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl bg-paper p-4 font-semibold hover:shadow-md">{label}<ArrowUpRight className="size-4" /></a>)}
          </div>
        </section>
      </div>
    </>
  );
}

function ConceptCard({ icon, number, title, text, examples, tone }: { icon: React.ReactNode; number: string; title: string; text: string; examples: string[]; tone: string }) {
  return (
    <article className={`rounded-[2rem] p-7 sm:p-9 ${tone}`}>
      <div className="flex items-center justify-between"><span className="grid size-12 place-items-center rounded-2xl bg-paper">{icon}</span><span className="font-display text-4xl text-ink/20">{number}</span></div>
      <h2 className="mt-7 font-display text-4xl font-semibold">{title}</h2><p className="mt-4 leading-7 text-ink/70">{text}</p>
      <h3 className="mt-8 text-xs font-bold uppercase tracking-widest text-ink/50">Examples can include</h3>
      <ul className="mt-4 grid gap-2 text-sm leading-6">{examples.map((example) => <li key={example} className="flex gap-2"><span aria-hidden>•</span>{example}</li>)}</ul>
    </article>
  );
}
