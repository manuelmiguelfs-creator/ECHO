"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Heart,
  Info,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/components/app-provider";
import { conditionProfiles } from "@/lib/conditions";
import { categoryMeta, type Category, recommendationFor } from "@/lib/solutions";

const categoryTheme = {
  Outside: {
    bg: "bg-sage-light/30",
    border: "border-sage/40",
    badge: "bg-sage/20 text-[#304529] border-sage/40",
    bar: "bg-sage",
  },
  Inside: {
    bg: "bg-ochre-light/30",
    border: "border-ochre/40",
    badge: "bg-ochre/25 text-[#543b0d] border-ochre/40",
    bar: "bg-ochre",
  },
  Mental: {
    bg: "bg-blue-soft/30",
    border: "border-blue-soft/60",
    badge: "bg-blue-soft/60 text-[#1f424b] border-blue-soft/70",
    bar: "bg-[#719faa]",
  },
} as const;

function calculateScores(conditions: string[]) {
  const counts: Record<Category, number> = { Outside: 1, Inside: 1, Mental: 1 };
  conditions.forEach((condId) => {
    const profile = conditionProfiles.find((p) => p.id === condId);
    profile?.suggestedCategories.forEach((cat) => {
      if (cat in counts) counts[cat as Category] += 1;
    });
  });
  return {
    outsideScore: Math.min(3, counts.Outside),
    insideScore: Math.min(3, counts.Inside),
    mentalScore: Math.min(3, counts.Mental),
  };
}

export default function QuizPage() {
  const router = useRouter();
  const { quiz, setQuiz } = useApp();
  const [saved, setSaved] = useState(false);
  const [conditionError, setConditionError] = useState("");
  const [form, setForm] = useState({
    fullName: quiz?.fullName ?? "",
    conditions: quiz?.conditions ?? [],
    symptomsDuration: quiz?.symptomsDuration ?? "",
    attackDuration: quiz?.attackDuration ?? "",
    outsideScore: quiz?.outsideScore ?? 2,
    insideScore: quiz?.insideScore ?? 1,
    mentalScore: quiz?.mentalScore ?? 3,
  });

  useEffect(() => {
    if (quiz && !saved) {
      queueMicrotask(() =>
        setForm({
          fullName: quiz.fullName,
          conditions: quiz.conditions,
          symptomsDuration: quiz.symptomsDuration,
          attackDuration: quiz.attackDuration,
          outsideScore: quiz.outsideScore,
          insideScore: quiz.insideScore,
          mentalScore: quiz.mentalScore,
        }),
      );
    }
  }, [quiz, saved]);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (form.conditions.length === 0) {
      setConditionError("Select at least one condition.");
      return;
    }
    setConditionError("");
    const scores = calculateScores(form.conditions);
    const updatedForm = { ...form, ...scores };
    setForm(updatedForm);
    setQuiz({ ...updatedForm, updatedAt: new Date().toISOString() });
    router.push("/");
  }

  const result = saved || quiz ? form : null;
  const best = result
    ? (Object.entries({
        Outside: result.outsideScore,
        Inside: result.insideScore,
        Mental: result.mentalScore,
      }).sort((a, b) => b[1] - a[1])[0][0] as Category)
    : null;

  const isNameDone = Boolean(form.fullName.trim());
  const isConditionsDone = form.conditions.length > 0;
  const isDurationDone = Boolean(form.symptomsDuration && form.attackDuration);
  const stepsDoneCount = [isNameDone, isConditionsDone, isDurationDone].filter(Boolean).length;

  return (
    <div className="bg-background">
      <PageHero
        eyebrow="🔎 Personalization"
        title="Who are you?"
        description="Answer a few questions about your condition and symptoms. This is not a diagnostic or clinical assessment."
        tone="ochre"
      />

      <div className="page-shell grid gap-10 py-12 lg:grid-cols-[1.12fr_.88fr] lg:py-16">
        {/* Main Quiz Form Card */}
        <form
          onSubmit={submit}
          className="rounded-[2.5rem] border border-ink/10 bg-paper p-6 shadow-[0_20px_50px_rgba(41,50,45,0.04)] sm:p-10"
        >
          {/* Section 1: Personal Info & Conditions */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-ink/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-full bg-terracotta text-xs font-bold text-white shadow-xs">
                  01
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                    Personal Details & Conditions
                  </h2>
                  <p className="text-xs text-ink/60 sm:text-sm">
                    Help us personalize your educational resources and support options.
                  </p>
                </div>
              </div>
              <span className="hidden rounded-full bg-cream px-3 py-1 text-xs font-semibold text-ink/60 sm:inline-block">
                Step 1 of 2
              </span>
            </div>

            <div className="space-y-5 pt-1">
              <Field label="Full name">
                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
                  <Input
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="Your name"
                    className="h-13 rounded-2xl border-ink/15 bg-white/90 pl-11 pr-4 text-base transition-all focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                  />
                </div>
              </Field>

              <Field label="What conditions apply to you?">
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {conditionProfiles.map((condition) => {
                    const checked = form.conditions.includes(condition.id);
                    return (
                      <label
                        key={condition.id}
                        className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3.5 text-sm transition-all duration-200 select-none ${
                          checked
                            ? "border-terracotta bg-terracotta-light/40 font-semibold text-ink shadow-xs ring-1 ring-terracotta/30"
                            : "border-ink/10 bg-white/80 text-ink/80 hover:border-ink/25 hover:bg-cream/40"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="size-4 shrink-0 rounded accent-terracotta cursor-pointer"
                          checked={checked}
                          onChange={() => {
                            const conditions = checked
                              ? form.conditions.filter((id) => id !== condition.id)
                              : [...form.conditions, condition.id];
                            setConditionError("");
                            setForm({ ...form, conditions });
                          }}
                        />
                        <span className="truncate">{condition.label}</span>
                      </label>
                    );
                  })}
                </div>

                <div className="mt-2.5 flex items-start gap-2 text-xs text-ink/60">
                  <Info className="mt-0.5 size-3.5 shrink-0 text-ink/40" />
                  <span>
                    Select all that apply. This helps Echo personalize educational content and support suggestions.
                  </span>
                </div>

                {conditionError && (
                  <p className="mt-2.5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-2.5 text-xs font-semibold text-red-700">
                    <span className="size-1.5 rounded-full bg-red-600" />
                    {conditionError}
                  </p>
                )}
              </Field>
            </div>
          </div>

          {/* Section 2: Timeline & Durations */}
          <div className="mt-10 border-t border-ink/10 pt-8">
            <div className="flex items-center justify-between border-b border-ink/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-full bg-ochre text-xs font-bold text-ink shadow-xs">
                  02
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                    Timeline & Durations
                  </h2>
                  <p className="text-xs text-ink/60 sm:text-sm">
                    Understanding symptom duration helps frame gentle, sustainable routines.
                  </p>
                </div>
              </div>
              <span className="hidden rounded-full bg-cream px-3 py-1 text-xs font-semibold text-ink/60 sm:inline-block">
                Step 2 of 2
              </span>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="How long have you had these symptoms?">
                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
                  <Input
                    required
                    min="0"
                    step="0.5"
                    type="number"
                    value={form.symptomsDuration}
                    onChange={(e) => setForm({ ...form, symptomsDuration: e.target.value })}
                    placeholder="e.g. 2"
                    className="h-13 rounded-2xl border-ink/15 bg-white/90 pl-11 pr-16 text-base transition-all focus:border-ochre focus:ring-2 focus:ring-ochre/25"
                  />
                  <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 rounded-lg bg-cream px-2 py-1 text-xs font-semibold text-ink/60">
                    years
                  </span>
                </div>
              </Field>

              <Field label="How long does an attack last?">
                <div className="relative">
                  <Clock className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
                  <Input
                    required
                    min="0"
                    type="number"
                    value={form.attackDuration}
                    onChange={(e) => setForm({ ...form, attackDuration: e.target.value })}
                    placeholder="e.g. 30"
                    className="h-13 rounded-2xl border-ink/15 bg-white/90 pl-11 pr-16 text-base transition-all focus:border-ochre focus:ring-2 focus:ring-ochre/25"
                  />
                  <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 rounded-lg bg-cream px-2 py-1 text-xs font-semibold text-ink/60">
                    min
                  </span>
                </div>
              </Field>
            </div>
          </div>

          {/* Form Submit & Reset Actions */}
          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-ink/10 pt-8">
            <Button
              type="submit"
              className="h-13 rounded-full bg-terracotta px-8 text-base font-semibold text-white shadow-md transition-all hover:bg-ink hover:shadow-lg"
            >
              {quiz ? "Update my answers" : "See my recommendations"}
              <ArrowRight className="size-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-13 rounded-full border-ink/15 bg-transparent px-6 text-sm font-semibold text-ink/75 transition-all hover:bg-cream hover:text-ink"
              onClick={() => {
                setForm({
                  fullName: "",
                  conditions: [],
                  symptomsDuration: "",
                  attackDuration: "",
                  outsideScore: 2,
                  insideScore: 1,
                  mentalScore: 3,
                });
                setSaved(false);
              }}
            >
              <RotateCcw className="size-4" /> Reset
            </Button>
          </div>

          {saved && (
            <div
              role="status"
              className="mt-5 flex items-center gap-2.5 rounded-2xl border border-sage/60 bg-sage-light/60 px-4 py-3 text-sm font-semibold text-ink"
            >
              <CheckCircle2 className="size-5 text-[#4e6b45]" />
              <span>Your answers were saved on this device.</span>
            </div>
          )}
        </form>

        {/* Right Aside: Interactive Results / Preview Card */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          {result && best ? (
            <div className="relative overflow-hidden rounded-[2.5rem] bg-terracotta p-7 text-white shadow-xl sm:p-9">
              {/* Decorative background glow */}
              <div className="pointer-events-none absolute -bottom-12 -right-12 size-48 rounded-full bg-terracotta/25 blur-3xl" />
              <div className="pointer-events-none absolute -left-12 -top-12 size-40 rounded-full bg-ochre/15 blur-2xl" />

              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-terracotta-light">
                    <Sparkles className="size-3.5 text-ochre" />
                    <span>Your current match</span>
                  </div>
                  <span className="text-xs font-medium text-white/50">Personalized</span>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <div className="flex size-20 shrink-0 items-center justify-center rounded-3xl border border-white/15 bg-white/10 text-4xl shadow-inner backdrop-blur-sm">
                    {categoryMeta[best].emoji}
                  </div>
                  <div>
                    <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                      {categoryMeta[best].label}
                    </h2>
                    <span className="mt-1 inline-block rounded-full bg-ochre-light/20 px-2.5 py-0.5 text-xs font-semibold text-ochre-light">
                      Best suited category
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
                  {categoryMeta[best].description}
                </p>

                {/* Score Breakdown List with Visual Meters */}
                <div className="mt-8 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-white/50">
                    Category Breakdown
                  </p>
                  {(["Outside", "Inside", "Mental"] as Category[]).map((category) => {
                    const score =
                      result[
                        `${category.toLowerCase()}Score` as
                          | "outsideScore"
                          | "insideScore"
                          | "mentalScore"
                      ];
                    const isTop = category === best;
                    const meta = categoryMeta[category];
                    const theme = categoryTheme[category];

                    return (
                      <div
                        key={category}
                        className={`rounded-2xl border p-4 transition-all ${
                          isTop
                            ? "border-white/30 bg-white/12 shadow-sm"
                            : "border-white/10 bg-white/6"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 font-medium text-white">
                            <span className="text-lg">{meta.emoji}</span>
                            <span>{category}</span>
                          </span>
                          <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white/80">
                            {recommendationFor(score)}
                          </span>
                        </div>

                        {/* Visual 4-step bar */}
                        <div className="mt-3 flex gap-1.5">
                          {[0, 1, 2, 3].map((step) => (
                            <div
                              key={step}
                              className={`h-1.5 flex-1 rounded-full transition-all ${
                                step <= score
                                  ? theme.bar
                                  : "bg-white/15"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Button
                  asChild
                  size="lg"
                  className="mt-8 h-13 w-full rounded-full bg-terracotta text-base font-semibold text-white shadow-md transition-all hover:bg-white hover:text-ink hover:shadow-lg"
                >
                  <Link href="/help-now">
                    Choose an activity <ArrowRight className="size-4" />
                  </Link>
                </Button>

                <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs leading-5 text-white/50">
                  <ShieldCheck className="size-3.5 shrink-0 text-sage" />
                  <span>
                    Recommendations are guidance only. You can use any activity, regardless of its score.
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-[2.5rem] bg-terracotta-light p-8 text-center shadow-[0_20px_50px_rgba(184,95,69,0.12)] sm:p-10">
              <div className="pointer-events-none absolute -right-8 -top-8 size-36 rounded-full bg-ochre-light/50 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-8 -left-8 size-36 rounded-full bg-terracotta/20 blur-2xl" />

              <div className="relative z-10">
                <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-ochre-light text-2xl shadow-xs">
                  ✨
                </div>

                <h2 className="mt-5 font-display text-2xl font-semibold text-ink sm:text-3xl">
                  Your results will appear here
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-ink/65">
                  Complete all fields to see the activity category that currently fits you best.
                </p>

                {/* Progress tracker preview */}
                <div className="mt-7 rounded-2xl border border-ink/10 bg-cream/50 p-4 text-left">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-ink/60">
                    <span>Quiz completion</span>
                    <span className="text-terracotta">{stepsDoneCount}/3</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white">
                    <div
                      className="h-full rounded-full bg-terracotta transition-all duration-300"
                      style={{ width: `${(stepsDoneCount / 3) * 100}%` }}
                    />
                  </div>

                  <ul className="mt-4 space-y-2 text-xs">
                    <li className="flex items-center gap-2">
                      <div
                        className={`flex size-4 items-center justify-center rounded-full ${
                          isNameDone ? "bg-terracotta text-cream" : "bg-white/70 text-ink/30"
                        }`}
                      >
                        <Check className="size-2.5 stroke-[3]" />
                      </div>
                      <span className={isNameDone ? "font-semibold text-ink" : "text-ink/50"}>
                        Your full name
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div
                        className={`flex size-4 items-center justify-center rounded-full ${
                          isConditionsDone ? "bg-terracotta text-cream" : "bg-white/70 text-ink/30"
                        }`}
                      >
                        <Check className="size-2.5 stroke-[3]" />
                      </div>
                      <span className={isConditionsDone ? "font-semibold text-ink" : "text-ink/50"}>
                        At least one condition
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div
                        className={`flex size-4 items-center justify-center rounded-full ${
                          isDurationDone ? "bg-terracotta text-cream" : "bg-white/70 text-ink/30"
                        }`}
                      >
                        <Check className="size-2.5 stroke-[3]" />
                      </div>
                      <span className={isDurationDone ? "font-semibold text-ink" : "text-ink/50"}>
                        Symptom & attack durations
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-ink/50">
                  <Heart className="size-3.5 fill-terracotta-light text-terracotta" />
                  <span>Echo keeps all answers private on your device.</span>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label className="mb-2 block text-sm font-semibold text-ink">{label}</Label>
      {children}
    </div>
  );
}
