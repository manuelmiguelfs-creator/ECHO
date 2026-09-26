"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, Search, Timer } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/components/app-provider";
import { categoryMeta, recommendationFor, solutions, type Category } from "@/lib/solutions";

export default function SolutionsPage() {
  const params = useSearchParams();
  const initial = params.get("category");
  const [category, setCategory] = useState<"All" | Category>(
    initial === "Outside" || initial === "Inside" || initial === "Mental" ? initial : "All",
  );
  const [search, setSearch] = useState("");
  const { scores, completedSolutions } = useApp();

  const filtered = useMemo(
    () =>
      solutions.filter(
        (solution) =>
          (category === "All" || solution.category === category) &&
          `${solution.name} ${solution.description}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [category, search],
  );

  return (
    <>
      <PageHero
        eyebrow="💡 Practical support"
        title="Solution Library"
        description="Explore 22 activities for difficult moments. These are optional support strategies—not medical treatment—and you can stop any activity at any time."
        tone="sage"
      />
      <div className="page-shell py-12">
        <div className="flex flex-col gap-4 rounded-2xl bg-paper p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search activities…" className="h-12 bg-white pl-11" aria-label="Search activities" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {(["All", "Outside", "Inside", "Mental"] as const).map((value) => (
              <Button key={value} type="button" variant={category === value ? "default" : "outline"} onClick={() => setCategory(value)} className={`shrink-0 rounded-full ${category === value ? "bg-ink text-white" : "bg-white"}`}>
                {value === "All" ? "All 22" : `${categoryMeta[value].emoji} ${value}`}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-ink/55">{filtered.length} {filtered.length === 1 ? "activity" : "activities"}</p>
          {!scores && <Link href="/quiz" className="text-sm font-semibold text-terracotta hover:underline">Take the quiz to personalize →</Link>}
        </div>

        {filtered.length ? (
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((solution) => (
              <article key={solution.id} className="group flex min-h-[300px] flex-col rounded-[1.75rem] border border-ink/8 bg-paper p-6 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-11 place-items-center rounded-2xl bg-cream text-2xl">{categoryMeta[solution.category].emoji}</span>
                  {completedSolutions.includes(solution.id) && <Badge className="bg-sage-light text-ink"><Check /> Completed</Badge>}
                </div>
                <p className="mt-6 text-xs font-bold uppercase tracking-widest text-terracotta">{solution.category}</p>
                <h2 className="mt-2 font-display text-2xl font-semibold leading-tight">{solution.name}</h2>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-ink/60">{solution.description}</p>
                <div className="mt-auto flex items-center justify-between pt-6">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-ink/50"><Timer className="size-4" /> {solution.duration}</span>
                  <span className="text-xs text-ink/50">{recommendationFor(scores?.[solution.category])}</span>
                </div>
                <Button asChild variant="outline" className="mt-4 h-11 w-full rounded-full bg-transparent group-hover:border-ink">
                  <Link href={`/solutions/${solution.id}`}>Open activity <ArrowRight /></Link>
                </Button>
              </article>
            ))}
          </div>
        ) : (
          <div className="my-16 rounded-3xl border border-dashed border-ink/20 p-12 text-center">
            <p className="text-4xl">🔍</p><h2 className="mt-4 font-display text-3xl font-semibold">No activities found</h2><p className="mt-2 text-ink/60">Try another search or category.</p>
          </div>
        )}
        <p className="mt-10 rounded-2xl bg-ochre-light p-5 text-sm leading-6 text-ink/70">
          <strong>Content review:</strong> Activities should be periodically reviewed for clarity, safety, and current guidance. Echo does not promise that any activity will work for everyone.
        </p>
      </div>
    </>
  );
}
