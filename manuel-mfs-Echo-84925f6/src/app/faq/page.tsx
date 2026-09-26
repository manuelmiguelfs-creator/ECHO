"use client";

import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useApp } from "@/components/app-provider";
import { conditionProfiles, normalizeConditionIds } from "@/lib/conditions";

const productFaqs = [
  ["How can I help your community?", "Suggest a personal strategy on the Help Our Community page. A team member reviews every submission before it can become public."],
  ["How did you gather your information?", "Echo uses established health resources, interviews, and lived experience. Educational content remains reviewable, and unsourced medical statistics are not presented as established facts."],
  ["What is the quiz for?", "It scores how useful Outside, Inside, and Mental activities have felt to you. Those three scores personalize activity labels. It does not screen for or diagnose OCD."],
  ["How does Help Now work?", "It shows the full activity library with quiz-based category recommendations and can pick a random activity. You remain free to choose anything."],
  ["Can I add my own support measure?", "Yes, through the community form. It remains private and under review until an authorized reviewer approves it."],
  ["Where can I suggest an improvement?", "Use the community form and describe your product suggestion, or contact the team through a future authenticated support channel."],
];

export default function FaqPage() {
  const { quiz } = useApp();
  const selectedIds = normalizeConditionIds(quiz?.conditions);
  const profiles = conditionProfiles.filter((profile) =>
    selectedIds.length ? selectedIds.includes(profile.id) : profile.id === "ocd",
  );

  return (
    <>
      <PageHero eyebrow="Questions & answers" title="Clear answers, without false certainty." description="Learn how Echo works and find responsible answers about the conditions selected in your quiz." tone="ochre" />
      <div className="page-shell grid gap-12 py-14 lg:grid-cols-2">
        <section>
          <p className="eyebrow">About Echo</p><h2 className="mt-3 font-display text-3xl font-semibold">Using the platform</h2>
          <Accordion className="mt-6 rounded-2xl bg-paper px-6">
            {productFaqs.map(([question, answer], index) => <AccordionItem key={question} value={`product-${index}`}><AccordionTrigger className="py-5 text-left">{question}</AccordionTrigger><AccordionContent className="pb-5 leading-7 text-ink/65">{answer}</AccordionContent></AccordionItem>)}
          </Accordion>
        </section>
        <section>
          <p className="eyebrow">Your conditions</p><h2 className="mt-3 font-display text-3xl font-semibold">Education and care</h2>
          <div className="mt-6 space-y-3">
            {profiles.map((profile) => (
              <article key={profile.id} className="rounded-2xl bg-paper p-6">
                <h3 className="font-display text-2xl font-semibold">{profile.label}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/65">{profile.summary}</p>
                <p className="mt-3 text-sm leading-6 text-ink/65">{profile.support}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
      <div className="page-shell pb-20 text-center"><div className="rounded-[2rem] bg-sage-light p-8"><h2 className="font-display text-3xl font-semibold">Still unsure?</h2><p className="mx-auto mt-3 max-w-xl text-ink/60">For personal symptoms or treatment questions, a qualified mental health professional is the right person to ask.</p><Button asChild className="mt-5 rounded-full bg-ink text-white"><Link href="/what-is-ocd#ocd">Open trusted resources</Link></Button></div></div>
    </>
  );
}
