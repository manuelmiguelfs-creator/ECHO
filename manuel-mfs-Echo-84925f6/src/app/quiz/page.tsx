"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, RotateCcw } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/components/app-provider";
import { conditionProfiles } from "@/lib/conditions";
import { categoryMeta, type Category, recommendationFor } from "@/lib/solutions";

const options = [
  ["0", "Doesn't work"],
  ["1", "Not much effect"],
  ["2", "Calms me down a bit"],
  ["3", "Perfect for me"],
];

export default function QuizPage() {
  const { quiz, setQuiz } = useApp();
  const [saved, setSaved] = useState(false);
  const [conditionError, setConditionError] = useState("");
  const [form, setForm] = useState({
    fullName: quiz?.fullName ?? "",
    conditions: quiz?.conditions ?? [],
    symptomsDuration: quiz?.symptomsDuration ?? "",
    attackDuration: quiz?.attackDuration ?? "",
    outsideScore: quiz?.outsideScore ?? 2,
    insideScore: quiz?.insideScore ?? 0,
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
    setQuiz({ ...form, updatedAt: new Date().toISOString() });
    setSaved(true);
  }

  const result = saved || quiz ? form : null;
  const best = result
    ? (Object.entries({
        Outside: result.outsideScore,
        Inside: result.insideScore,
        Mental: result.mentalScore,
      }).sort((a, b) => b[1] - a[1])[0][0] as Category)
    : null;

  return (
    <>
      <PageHero
        eyebrow="🔎 Personalization"
        title="Who are you?"
        description="Answer a few questions about your condition, symptoms, and support activities. This is not a diagnostic or clinical assessment."
        tone="ochre"
      />
      <div className="page-shell grid gap-10 py-14 lg:grid-cols-[1.1fr_.9fr]">
        <form onSubmit={submit} className="rounded-[2rem] bg-paper p-6 shadow-sm sm:p-9">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Full name" className="sm:col-span-2">
              <Input required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Your name" className="h-12 bg-white" />
            </Field>
            <Field label="What conditions apply to you?">
              <div className="grid gap-2 rounded-xl border border-ink/10 bg-white p-3 sm:grid-cols-2">
                {conditionProfiles.map((condition) => {
                  const checked = form.conditions.includes(condition.id);
                  return (
                    <label key={condition.id} className={`flex cursor-pointer items-center gap-3 rounded-lg p-3 text-sm transition ${checked ? "bg-terracotta-light/50" : "hover:bg-cream"}`}>
                      <input
                        className="size-4 accent-terracotta"
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          (() => {
                            const conditions = checked
                              ? form.conditions.filter((id) => id !== condition.id)
                              : [...form.conditions, condition.id];
                            setConditionError("");
                            setForm({ ...form, conditions });
                          })()
                        }
                      />
                      {condition.label}
                    </label>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-ink/55">Select all that apply. This helps Echo personalize educational content and support suggestions.</p>
              {conditionError && <p className="mt-2 text-sm font-semibold text-red-700">{conditionError}</p>}
            </Field>
            <Field label="How long have you had these symptoms? (years)">
              <Input required min="0" step="0.5" type="number" value={form.symptomsDuration} onChange={(e) => setForm({ ...form, symptomsDuration: e.target.value })} className="h-12 bg-white" />
            </Field>
            <Field label="How long does an attack last? (minutes)">
              <Input required min="0" type="number" value={form.attackDuration} onChange={(e) => setForm({ ...form, attackDuration: e.target.value })} className="h-12 bg-white" />
            </Field>
          </div>
          <div className="mt-8 space-y-7 border-t border-ink/10 pt-8">
            {(["Outside", "Inside", "Mental"] as Category[]).map((category) => {
              const key = `${category.toLowerCase()}Score` as "outsideScore" | "insideScore" | "mentalScore";
              return (
                <fieldset key={category}>
                  <legend className="mb-3 font-semibold">{categoryMeta[category].emoji} {categoryMeta[category].label}</legend>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {options.map(([value, label]) => (
                      <label key={value} className={`cursor-pointer rounded-xl border p-3 text-sm transition ${form[key] === Number(value) ? "border-terracotta bg-terracotta-light/50" : "border-ink/10 bg-white hover:border-ink/30"}`}>
                        <input className="mr-2 accent-terracotta" type="radio" name={key} value={value} checked={form[key] === Number(value)} onChange={() => setForm({ ...form, [key]: Number(value) })} />
                        {label}
                      </label>
                    ))}
                  </div>
                </fieldset>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button type="submit" className="h-12 rounded-full bg-terracotta px-7 text-white">{quiz ? "Update my answers" : "See my recommendations"} <ArrowRight /></Button>
            <Button type="button" variant="ghost" className="h-12 rounded-full" onClick={() => setForm({ fullName: "", conditions: [], symptomsDuration: "", attackDuration: "", outsideScore: 0, insideScore: 0, mentalScore: 0 })}><RotateCcw /> Reset</Button>
          </div>
          {saved && <p role="status" className="mt-4 flex items-center gap-2 text-sm font-semibold text-green-800"><Check className="size-4" /> Your answers were saved on this device.</p>}
        </form>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          {result && best ? (
            <div className="rounded-[2rem] bg-ink p-7 text-white sm:p-9">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-white/50">Your current match</p>
              <div className="mt-5 text-6xl">{categoryMeta[best].emoji}</div>
              <h2 className="mt-4 font-display text-4xl font-semibold">{categoryMeta[best].label}</h2>
              <p className="mt-3 text-white/65">{categoryMeta[best].description}</p>
              <div className="mt-8 space-y-3">
                {(["Outside", "Inside", "Mental"] as Category[]).map((category) => {
                  const score = result[`${category.toLowerCase()}Score` as "outsideScore" | "insideScore" | "mentalScore"];
                  return <div key={category} className="flex items-center justify-between rounded-xl bg-white/8 p-4"><span>{categoryMeta[category].emoji} {category}</span><span className="text-sm text-white/70">{recommendationFor(score)}</span></div>;
                })}
              </div>
              <Button asChild className="mt-7 h-12 w-full rounded-full bg-white text-ink hover:bg-cream"><Link href="/help-now">Choose an activity <ArrowRight /></Link></Button>
              <p className="mt-4 text-xs leading-5 text-white/45">Recommendations are guidance only. You can use any activity, regardless of its score.</p>
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-ink/20 p-9 text-center">
              <span className="text-5xl">✨</span><h2 className="mt-5 font-display text-3xl font-semibold">Your results will appear here</h2><p className="mt-3 text-ink/60">Complete all fields to see the activity category that currently fits you best.</p>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return <div className={className}><Label className="mb-2 block">{label}</Label>{children}</div>;
}
