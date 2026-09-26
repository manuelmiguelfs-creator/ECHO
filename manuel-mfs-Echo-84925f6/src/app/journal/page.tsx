"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Download, Edit3, LockKeyhole, Plus, Trash2, X } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useApp, type JournalEntry } from "@/components/app-provider";
import { categoryMeta, solutions, type Category } from "@/lib/solutions";
import { formatConditionList, selectedConditionProfiles } from "@/lib/conditions";

const emotions = ["Guilt", "Relief (brief)", "Confusion", "Anxiety", "Frustration", "Sadness", "Fear", "Anger", "Tiredness", "Loneliness"];
const emptyForm = { date: "", description: "", emotions: [] as string[], activities: [] as string[], notes: "", completed: false };

export default function JournalPage() {
  const params = useSearchParams();
  const initialActivity = params.get("activity");
  const { quiz, journal, addJournalEntry, updateJournalEntry, deleteJournalEntry } = useApp();
  const labels = selectedConditionProfiles(quiz?.conditions).map((profile) => profile.label);
  const conditionList = formatConditionList(labels);
  const journalTitle = labels.length === 0 || labels.length > 2 ? "Your journal" : `Your ${conditionList} journal`;
  const journalDescription = conditionList
    ? `Record moments related to ${conditionList}, what you felt, and what you tried. Patterns can support reflection, but they are not diagnoses.`
    : "Record what happened, what you felt, and what you tried. Patterns can support reflection, but they are not diagnoses.";
  const momentPrompt = labels.length === 1
    ? `Write a little about this ${labels[0]} moment`
    : conditionList
      ? `Write a little about this moment with ${conditionList}`
      : "Write a little about what happened";
  const [open, setOpen] = useState(params.get("new") === "true" || !!initialActivity);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm, activities: initialActivity ? [initialActivity] : [] });
  const [emotionFilter, setEmotionFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState<"All" | Category>("All");
  const [status, setStatus] = useState("");

  const filtered = useMemo(() => journal.filter((entry) => {
    const emotionMatches = emotionFilter === "All" || entry.emotions.includes(emotionFilter);
    const categoryMatches = categoryFilter === "All" || entry.activities.some((id) => solutions.find((item) => item.id === id)?.category === categoryFilter);
    return emotionMatches && categoryMatches;
  }).sort((a, b) => (b.date || b.createdAt).localeCompare(a.date || a.createdAt)), [journal, emotionFilter, categoryFilter]);

  const emotionCounts = emotions.map((emotion) => ({ emotion, count: journal.filter((entry) => entry.emotions.includes(emotion)).length })).sort((a, b) => b.count - a.count);

  function toggle(field: "emotions" | "activities", value: string) {
    setForm((current) => ({ ...current, [field]: current[field].includes(value) ? current[field].filter((item) => item !== value) : [...current[field], value] }));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (editing) {
      const existing = journal.find((entry) => entry.id === editing)!;
      updateJournalEntry({ ...existing, ...form });
      setStatus("Entry updated.");
    } else {
      addJournalEntry(form);
      setStatus("Entry saved privately on this device.");
    }
    setEditing(null); setForm(emptyForm); setOpen(false);
  }

  function edit(entry: JournalEntry) {
    setForm({ date: entry.date, description: entry.description, emotions: entry.emotions, activities: entry.activities, notes: entry.notes ?? "", completed: entry.completed });
    setEditing(entry.id); setOpen(true); window.scrollTo({ top: 300, behavior: "smooth" });
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(journal, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = `echo-journal-${new Date().toISOString().slice(0, 10)}.json`; anchor.click(); URL.revokeObjectURL(url);
  }

  return (
    <>
      <PageHero eyebrow="Private reflection" title="Compulsion Journal" description="Record what happened, what you felt, and what you tried. Patterns can support reflection, but they are not diagnoses." tone="ochre" glow />
      <div className="page-shell py-12">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3"><LockKeyhole className="mt-1 size-5 text-terracotta" /><div><p className="font-semibold">Private by default</p><p className="text-sm text-ink/55">Entries remain in this browser’s local storage. Clearing browser data will remove them.</p></div></div>
          <div className="flex gap-2"><Button type="button" variant="outline" className="rounded-full bg-transparent" onClick={exportData}><Download /> Export</Button><Button type="button" className="rounded-full bg-terracotta text-white" onClick={() => { setEditing(null); setForm(emptyForm); setOpen(true); }}><Plus /> Add entry</Button></div>
        </div>

        {open && (
          <form onSubmit={submit} className="mt-8 rounded-[2rem] bg-paper p-6 shadow-lg sm:p-9">
            <div className="flex items-center justify-between"><h2 className="font-display text-3xl font-semibold">{editing ? "Edit entry" : "New journal entry"}</h2><Button type="button" variant="ghost" size="icon" aria-label="Close form" onClick={() => setOpen(false)}><X /></Button></div>
            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <label className="text-sm font-semibold">Day<Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="mt-2 h-12 bg-white" /></label>
              <label className="text-sm font-semibold sm:col-span-2">{momentPrompt}<Textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-2 min-h-28 bg-white" /></label>
            </div>
            <fieldset className="mt-7"><legend className="font-semibold">Emotions</legend><div className="mt-3 flex flex-wrap gap-2">{emotions.map((emotion) => <ChoicePill key={emotion} checked={form.emotions.includes(emotion)} label={emotion} onChange={() => toggle("emotions", emotion)} />)}</div></fieldset>
            <fieldset className="mt-7"><legend className="font-semibold">What did you do to respond?</legend><div className="mt-3 max-h-72 space-y-6 overflow-y-auto rounded-2xl bg-cream p-4">{(["Outside", "Inside", "Mental"] as Category[]).map((category) => <div key={category}><p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink/50">{categoryMeta[category].emoji} {category}</p><div className="grid gap-2 sm:grid-cols-2">{solutions.filter((solution) => solution.category === category).map((solution) => <label key={solution.id} className="flex gap-2 rounded-lg bg-white p-3 text-sm"><input type="checkbox" className="accent-terracotta" checked={form.activities.includes(solution.id)} onChange={() => toggle("activities", solution.id)} />{solution.name}</label>)}</div></div>)}</div></fieldset>
            <label className="mt-7 block text-sm font-semibold">Additional notes (optional)<Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="mt-2 bg-white" /></label>
            <label className="mt-5 flex items-center gap-2 text-sm"><input type="checkbox" checked={form.completed} onChange={(e) => setForm({ ...form, completed: e.target.checked })} className="accent-terracotta" />I finished recording this episode</label>
            <Button type="submit" className="mt-7 h-12 rounded-full bg-ink px-7 text-white">{editing ? "Save changes" : "Save entry"}</Button>
          </form>
        )}
        <p role="status" className="mt-4 text-sm font-semibold text-green-800">{status}</p>

        <section className="mt-10 grid gap-5 lg:grid-cols-[1fr_300px]">
          <div>
            <div className="flex flex-wrap gap-3 rounded-2xl bg-paper p-4">
              <select value={emotionFilter} onChange={(e) => setEmotionFilter(e.target.value)} className="h-10 rounded-lg border bg-white px-3 text-sm" aria-label="Filter by emotion"><option>All</option>{emotions.map((emotion) => <option key={emotion}>{emotion}</option>)}</select>
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value as "All" | Category)} className="h-10 rounded-lg border bg-white px-3 text-sm" aria-label="Filter by activity type"><option>All</option><option>Outside</option><option>Inside</option><option>Mental</option></select>
              <span className="ml-auto self-center text-sm text-ink/50">{filtered.length} entries</span>
            </div>
            <div className="mt-5 space-y-4">
              {filtered.map((entry) => (
                <article key={entry.id} className="rounded-2xl bg-paper p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-terracotta">{entry.date || "No date"}</p><h2 className="mt-2 font-display text-2xl font-semibold">{entry.description || "Untitled entry"}</h2></div><div className="flex gap-1"><Button type="button" variant="ghost" size="icon" aria-label="Edit entry" onClick={() => edit(entry)}><Edit3 /></Button><Button type="button" variant="ghost" size="icon" aria-label="Delete entry" onClick={() => { if (confirm("Delete this journal entry?")) deleteJournalEntry(entry.id); }}><Trash2 /></Button></div></div>
                  <div className="mt-4 flex flex-wrap gap-2">{entry.emotions.map((emotion) => <Badge key={emotion} className="bg-pink-soft text-ink">{emotion}</Badge>)}</div>
                  {entry.activities.length ? <div className="mt-5 border-t border-ink/8 pt-4"><p className="text-xs font-bold uppercase tracking-wider text-ink/40">Activities used</p><ul className="mt-2 space-y-1 text-sm text-ink/65">{entry.activities.map((id) => <li key={id}>• {solutions.find((solution) => solution.id === id)?.name ?? id}</li>)}</ul></div> : null}
                </article>
              ))}
            </div>
          </div>
          <aside className="rounded-2xl bg-sage-light p-6 lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow">Pattern snapshot</p><h2 className="mt-3 font-display text-2xl font-semibold">What appears most often</h2><p className="mt-2 text-xs leading-5 text-ink/55">A simple count, not a clinical interpretation.</p>
            <div className="mt-6 space-y-3">{emotionCounts.filter((item) => item.count > 0).slice(0, 6).map((item) => <div key={item.emotion}><div className="flex justify-between text-sm"><span>{item.emotion}</span><span>{item.count}</span></div><div className="mt-1 h-2 overflow-hidden rounded-full bg-white/60"><div className="h-full rounded-full bg-terracotta" style={{ width: `${Math.max(12, item.count / Math.max(...emotionCounts.map((value) => value.count)) * 100)}%` }} /></div></div>)}</div>
          </aside>
        </section>
      </div>
    </>
  );
}

function ChoicePill({ checked, label, onChange }: { checked: boolean; label: string; onChange: () => void }) {
  return <label className={`cursor-pointer rounded-full border px-4 py-2 text-sm ${checked ? "border-terracotta bg-terracotta-light" : "border-ink/10 bg-white"}`}><input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />{label}</label>;
}
