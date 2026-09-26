"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, LockKeyhole, Send, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/components/app-provider";

const sources = ["Official OCD resource", "Reddit or online comments", "I created and tested it", "Other"];
const categories = ["Outside Activity", "Inside Activity", "Mental Exercise"];

export default function CommunityPage() {
  const { addSubmission } = useApp();
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ fullName: "", ageRange: "", email: "", source: [] as string[], category: [] as string[], solutionName: "", description: "" });

  function toggle(field: "source" | "category", value: string) {
    setForm((current) => ({ ...current, [field]: current[field].includes(value) ? current[field].filter((item) => item !== value) : [...current[field], value] }));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!form.source.length || !form.category.length) return;
    addSubmission(form);
    setSuccess(true);
    setForm({ fullName: "", ageRange: "", email: "", source: [], category: [], solutionName: "", description: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <PageHero eyebrow="🔄 Help our community" title="A strategy shared responsibly can start a useful conversation." description="Do you use a tactic that is not in our solution library? This is your chance to help us improve Echo." tone="pink" />
      <div className="page-shell grid gap-10 py-14 lg:grid-cols-[.7fr_1.3fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow">How it works</p><h2 className="mt-3 font-display text-4xl font-semibold">Share. Review. Learn.</h2>
          <ol className="mt-7 space-y-5">
            {[["1", "You submit", "Tell us what you tried and where it came from."], ["2", "A team member reviews", "Nothing is published automatically."], ["3", "Approved ideas may join the library", "Safety, clarity, and evidence still matter."]].map(([number, title, text]) => <li key={number} className="flex gap-4"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-terracotta text-sm font-bold text-white">{number}</span><div><p className="font-semibold">{title}</p><p className="mt-1 text-sm leading-6 text-ink/60">{text}</p></div></li>)}
          </ol>
          <div className="mt-8 flex gap-3 rounded-2xl bg-sage-light p-5"><LockKeyhole className="mt-0.5 size-5 shrink-0" /><p className="text-sm leading-6">Your name and email are review data. They are never shown in the public library.</p></div>
        </aside>

        <div>
          {success && <div role="status" className="mb-6 flex gap-3 rounded-2xl bg-sage-light p-5"><CheckCircle2 className="size-6 text-green-800" /><div><p className="font-semibold">Your idea was submitted.</p><p className="mt-1 text-sm text-ink/60">Its status is Submitted. It will not be published without review.</p></div></div>}
          <form onSubmit={submit} className="rounded-[2rem] bg-paper p-6 shadow-sm sm:p-9">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Full name"><Input required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="h-12 bg-white" /></Field>
              <Field label="Age range"><select required value={form.ageRange} onChange={(e) => setForm({ ...form, ageRange: e.target.value })} className="h-12 w-full rounded-xl border bg-white px-3 text-sm"><option value="">Select an age range</option><option>&lt;18</option><option>18–30</option><option>31–50</option><option>50+</option></select></Field>
              <Field label="Email" className="sm:col-span-2"><Input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-12 bg-white" /></Field>
            </div>

            <fieldset className="mt-8"><legend className="font-semibold">Where did you obtain the solution? <span className="text-terracotta">*</span></legend><p className="mt-1 text-xs text-ink/50">Select all that apply.</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{sources.map((source) => <CheckOption key={source} checked={form.source.includes(source)} label={source} onChange={() => toggle("source", source)} />)}</div>{!form.source.length && <p className="mt-2 text-xs text-ink/45">At least one source is required.</p>}</fieldset>
            <fieldset className="mt-8"><legend className="font-semibold">Select a category <span className="text-terracotta">*</span></legend><div className="mt-3 grid gap-2 sm:grid-cols-3">{categories.map((category) => <CheckOption key={category} checked={form.category.includes(category)} label={category} onChange={() => toggle("category", category)} />)}</div></fieldset>
            <div className="mt-8 grid gap-6">
              <Field label="Name your solution"><Input required value={form.solutionName} onChange={(e) => setForm({ ...form, solutionName: e.target.value })} className="h-12 bg-white" /></Field>
              <Field label="Describe your solution"><Textarea required minLength={30} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Explain what you did, how you used it, and any safety considerations." className="min-h-36 bg-white" /><p className="mt-2 text-xs text-ink/45">Minimum 30 characters. Do not include private health information you do not want a reviewer to see.</p></Field>
            </div>
            <div className="mt-8 flex items-start gap-3 rounded-xl bg-cream p-4 text-xs leading-5 text-ink/60"><ShieldCheck className="mt-0.5 size-4 shrink-0" />By submitting, you understand that this is a suggestion, not medical advice, and it may be edited, declined, or held for further review.</div>
            <Button type="submit" disabled={!form.source.length || !form.category.length} className="mt-6 h-12 rounded-full bg-terracotta px-7 text-white"><Send /> Submit for review</Button>
          </form>
        </div>
      </div>
    </>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return <div className={className}><Label className="mb-2 block">{label} <span className="text-terracotta">*</span></Label>{children}</div>;
}

function CheckOption({ checked, label, onChange }: { checked: boolean; label: string; onChange: () => void }) {
  return <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm ${checked ? "border-terracotta bg-terracotta-light/40" : "border-ink/10 bg-white"}`}><input type="checkbox" checked={checked} onChange={onChange} className="accent-terracotta" />{label}</label>;
}
