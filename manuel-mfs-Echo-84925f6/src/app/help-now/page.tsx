"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Dice5, RefreshCw, ShieldAlert } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/components/app-provider";
import { categoryMeta, recommendationFor, solutions, type Category } from "@/lib/solutions";
import { conditionProfiles, formatConditionList, normalizeConditionIds } from "@/lib/conditions";

export default function HelpNowPage() {
  const { scores, quiz } = useApp();
  const selectedIds = normalizeConditionIds(quiz?.conditions);
  const selectedProfiles = conditionProfiles.filter((profile) => selectedIds.includes(profile.id));
  const suggestedCategories = [...new Set(selectedProfiles.flatMap((profile) => profile.suggestedCategories))] as Category[];
  const [randomId, setRandomId] = useState<string | null>(null);
  const random = solutions.find((solution) => solution.id === randomId);

  function chooseRandom() {
    let pool = solutions;
    if (suggestedCategories.length) {
      pool = solutions.filter((solution) => suggestedCategories.includes(solution.category));
    }
    if (scores) {
      const best = (Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0] as Category);
      const preferred = pool.filter((solution) => solution.category === best);
      if (preferred.length && Math.random() < 0.7) pool = preferred;
    }
    setRandomId(pool[Math.floor(Math.random() * pool.length)].id);
  }

  return (
    <>
      <PageHero
        eyebrow="A calmer next step"
        title="Let’s start by choosing a challenge."
        description="Pick any activity below or let Echo choose one. Suggestions can reflect your selected conditions, but they are not a clinical judgment."
        tone="pink"
      />
      <div className="page-shell py-12">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto]">
          <div className="rounded-2xl bg-paper p-6">
            {selectedProfiles.length ? (
              <><p className="font-semibold">Support suggestions for {formatConditionList(selectedProfiles.map((profile) => profile.label))}.</p><p className="mt-2 text-sm leading-6 text-ink/60">Echo will highlight {suggestedCategories.map((category) => categoryMeta[category].label.toLowerCase()).join(" and ")} activities while keeping every activity available to you.</p><Link href="/learn" className="mt-3 inline-block text-sm font-bold text-terracotta">Read about your conditions →</Link></>
            ) : scores ? (
              <><p className="font-semibold">Your recommendations are active.</p><p className="mt-2 text-sm leading-6 text-ink/60">The Recommendation label uses the score for each activity’s category. You can update or repeat the quiz at any time and still choose any activity.</p><Link href="/quiz" className="mt-3 inline-block text-sm font-bold text-terracotta">Update quiz answers →</Link></>
            ) : (
              <><p className="font-semibold">Personalize this list.</p><p className="mt-2 text-sm leading-6 text-ink/60">The short quiz helps identify which broad categories have worked best for you before.</p><Button asChild variant="outline" className="mt-4 rounded-full bg-white"><Link href="/quiz">Take the quiz</Link></Button></>
            )}
          </div>
          <Button type="button" onClick={chooseRandom} className="h-auto min-h-32 rounded-2xl bg-terracotta px-8 text-lg text-white hover:bg-ink"><Dice5 className="size-6" /> Random activity</Button>
        </div>

        {random && (
          <div className="mt-7 rounded-[2rem] bg-ink p-7 text-white sm:p-9">
            <div className="flex items-center gap-3"><span className="text-3xl">{categoryMeta[random.category].emoji}</span><span className="text-xs font-bold uppercase tracking-widest text-white/50">Your random activity</span></div>
            <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div><h2 className="max-w-2xl font-display text-4xl font-semibold">{random.name}</h2><p className="mt-3 text-white/60">{random.description}</p></div>
              <div className="flex shrink-0 gap-2"><Button type="button" variant="outline" onClick={chooseRandom} className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10"><RefreshCw /> Again</Button><Button asChild className="rounded-full bg-white text-ink hover:bg-cream"><Link href={`/solutions/${random.id}`}>Start <ArrowRight /></Link></Button></div>
            </div>
          </div>
        )}

        <div className="mt-10 space-y-10">
          {(["Outside", "Inside", "Mental"] as Category[]).map((category) => (
            <section key={category}>
              <div className="flex items-center justify-between gap-4"><h2 className="font-display text-3xl font-semibold">{categoryMeta[category].emoji} {categoryMeta[category].label}</h2><Badge variant="outline">{scores ? recommendationFor(scores[category]) : "Quiz not completed"}</Badge></div>
              <div className="mt-4 overflow-hidden rounded-2xl border border-ink/10 bg-paper">
                {solutions.filter((solution) => solution.category === category).map((solution, index) => (
                  <Link key={solution.id} href={`/solutions/${solution.id}`} className={`grid gap-3 p-4 transition hover:bg-cream sm:grid-cols-[1fr_190px_auto] sm:items-center ${index ? "border-t border-ink/8" : ""}`}>
                    <span className="font-semibold">{solution.name}</span><span className="text-sm text-ink/55">{recommendationFor(scores?.[category])}</span><ArrowRight className="size-4 text-terracotta" />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 flex gap-3 rounded-2xl bg-ochre-light p-5 text-sm leading-6">
          <ShieldAlert className="mt-0.5 size-5 shrink-0 text-terracotta" />
          <p><strong>If you are in immediate danger or crisis:</strong> contact local emergency services or a local crisis line now. Echo offers supportive activities and does not replace urgent care, diagnosis, or professional treatment.</p>
        </div>
      </div>
    </>
  );
}
