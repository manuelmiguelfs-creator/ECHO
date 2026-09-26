"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, ExternalLink, Pause, Play, Plus, RotateCcw, ShieldAlert, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/components/app-provider";
import { categoryMeta, recommendationFor, type Solution } from "@/lib/solutions";

export function ActivityExperience({ solution }: { solution: Solution }) {
  const { scores, completedSolutions, toggleSolution } = useApp();
  const completed = completedSolutions.includes(solution.id);
  const [seconds, setSeconds] = useState(solution.timerSeconds ?? 0);
  const [running, setRunning] = useState(false);
  const [observations, setObservations] = useState([{ pleasing: "", description: "" }]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!running || seconds <= 0) return;
    const interval = window.setInterval(
      () =>
        setSeconds((value) => {
          if (value <= 1) {
            setRunning(false);
            return 0;
          }
          return value - 1;
        }),
      1000,
    );
    return () => window.clearInterval(interval);
  }, [running, seconds]);

  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;

  return (
    <div className="page-shell py-10">
      <Link href="/solutions" className="inline-flex items-center gap-2 text-sm font-semibold text-ink/60 hover:text-ink"><ArrowLeft className="size-4" /> Back to library</Link>
      <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_360px]">
        <article className="rounded-[2rem] bg-paper p-6 shadow-sm sm:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-sage-light text-ink">{categoryMeta[solution.category].emoji} {solution.category}</Badge>
            <Badge variant="outline">{solution.duration}</Badge>
            <Badge variant="outline">{recommendationFor(scores?.[solution.category])}</Badge>
          </div>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">{solution.name}</h1>
          <p className="mt-5 text-lg leading-8 text-ink/65">{solution.description}</p>

          {solution.safetyNote && (
            <div className="mt-7 flex gap-3 rounded-2xl bg-ochre-light p-5 text-sm leading-6">
              <ShieldAlert className="mt-0.5 size-5 shrink-0 text-terracotta" />
              <p><strong>Safety first.</strong> {solution.safetyNote}</p>
            </div>
          )}

          <div className="mt-10">
            <p className="eyebrow">How to do it</p>
            <ol className="mt-5 space-y-4">
              {solution.instructions.map((instruction, index) => (
                <li key={instruction} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-cream font-display font-semibold">{index + 1}</span>
                  <span className="pt-1 leading-7 text-ink/75">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {solution.timerSeconds && (
            <div className="mt-10 rounded-[1.75rem] bg-ink p-7 text-center text-white">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-white/50">Optional timer</p>
              <p aria-live="polite" className="mt-3 font-display text-6xl tabular-nums">{String(minutes).padStart(2, "0")}:{String(remainder).padStart(2, "0")}</p>
              <div className="mt-5 flex justify-center gap-3">
                <Button type="button" onClick={() => seconds > 0 && setRunning((value) => !value)} className="rounded-full bg-white text-ink hover:bg-cream">
                  {running ? <><Pause /> Pause</> : <><Play /> {seconds === solution.timerSeconds ? "Start" : "Continue"}</>}
                </Button>
                <Button type="button" variant="outline" onClick={() => { setRunning(false); setSeconds(solution.timerSeconds!); }} className="rounded-full border-white/25 bg-transparent text-white hover:bg-white/10"><RotateCcw /> Reset</Button>
              </div>
            </div>
          )}

          {solution.special === "observations" && (
            <ReflectionSection title="Observation notes">
              <div className="space-y-3">
                {observations.map((row, index) => (
                  <div key={index} className="grid gap-3 rounded-xl bg-cream p-3 sm:grid-cols-[70px_130px_1fr_auto] sm:items-center">
                    <span className="text-sm font-semibold">#{index + 1}</span>
                    <select aria-label={`Observation ${index + 1} pleasing`} value={row.pleasing} onChange={(e) => setObservations((current) => current.map((item, i) => i === index ? { ...item, pleasing: e.target.value } : item))} className="h-10 rounded-lg border bg-white px-3 text-sm"><option value="">Pleasing?</option><option>Yes</option><option>No</option></select>
                    <Input aria-label={`Observation ${index + 1} description`} placeholder="What did you notice?" value={row.description} onChange={(e) => setObservations((current) => current.map((item, i) => i === index ? { ...item, description: e.target.value } : item))} className="bg-white" />
                    <Button type="button" variant="ghost" size="icon" aria-label={`Remove observation ${index + 1}`} onClick={() => setObservations((current) => current.filter((_, i) => i !== index))}><Trash2 /></Button>
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" className="mt-4 rounded-full bg-white" onClick={() => setObservations((current) => [...current, { pleasing: "", description: "" }])}><Plus /> Add observation</Button>
            </ReflectionSection>
          )}

          {solution.special === "bus" && (
            <ReflectionSection title="Mission notes">
              <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold">Time in minutes<Input type="number" min="0" className="mt-2 bg-white" /></label><label className="text-sm font-semibold">Color of the bus<Input className="mt-2 bg-white" /></label></div>
            </ReflectionSection>
          )}

          {solution.special === "grounding" && (
            <ReflectionSection title="What do you notice?">
              <div className="grid gap-4 sm:grid-cols-2">
                {[["5", "things you can see"], ["4", "things you can touch"], ["3", "sounds you hear"], ["2", "smells"], ["1", "taste"]].map(([count, label]) => (
                  <label key={count} className="text-sm font-semibold"><span className="text-terracotta">{count}</span> {label}<Textarea className="mt-2 min-h-20 bg-white" /></label>
                ))}
              </div>
            </ReflectionSection>
          )}

          {solution.special === "sudoku" && <Sudoku />}

          {solution.reflectionFields?.length ? (
            <ReflectionSection title="A note for yourself">
              <div className="grid gap-4 sm:grid-cols-2">
                {solution.reflectionFields.map((field) => (
                  <label key={field.id} className={`text-sm font-semibold ${field.type === "textarea" ? "sm:col-span-2" : ""}`}>{field.label}
                    {field.type === "textarea" ? <Textarea className="mt-2 bg-white" /> : <Input type={field.type ?? "text"} className="mt-2 bg-white" />}
                  </label>
                ))}
              </div>
            </ReflectionSection>
          ) : null}

          {solution.links?.length ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {solution.links.map((link) => <Button key={link.href} asChild variant="outline" className="rounded-full bg-transparent"><a href={link.href} target="_blank" rel="noreferrer">{link.label} <ExternalLink /></a></Button>)}
            </div>
          ) : null}
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[2rem] bg-sage-light p-7">
            <span className="text-4xl">{completed ? "🌟" : "🌱"}</span>
            <h2 className="mt-4 font-display text-3xl font-semibold">{completed ? "Activity completed" : "Ready when you are"}</h2>
            <p className="mt-3 text-sm leading-6 text-ink/65">Completing an activity only marks your progress. It does not measure recovery or success.</p>
            <Button type="button" onClick={() => { toggleSolution(solution.id); setStatus(completed ? "Completion removed." : "Activity marked complete."); }} className="mt-6 h-12 w-full rounded-full bg-ink text-white">
              <Check /> {completed ? "Mark as not completed" : "I completed this!"}
            </Button>
            <Button asChild variant="outline" className="mt-3 h-12 w-full rounded-full bg-white/60"><Link href={`/journal?activity=${solution.id}`}>Add to journal</Link></Button>
            <p role="status" className="mt-3 text-center text-xs text-ink/55">{status}</p>
          </div>
          <p className="mt-5 px-3 text-xs leading-5 text-ink/50">Stop if you feel pain, dizziness, intense distress, or discomfort. Seek professional support when you need it.</p>
        </aside>
      </div>
    </div>
  );
}

function ReflectionSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="mt-10 rounded-[1.75rem] bg-cream p-6"><h2 className="mb-5 font-display text-2xl font-semibold">{title}</h2>{children}</section>;
}

const sudokuPuzzle = [5,3,0,0,7,0,0,0,0,6,0,0,1,9,5,0,0,0,0,9,8,0,0,0,0,6,0,8,0,0,0,6,0,0,0,3,4,0,0,8,0,3,0,0,1,7,0,0,0,2,0,0,0,6,0,6,0,0,0,0,2,8,0,0,0,0,4,1,9,0,0,5,0,0,0,0,8,0,0,7,9];
const sudokuSolution = [5,3,4,6,7,8,9,1,2,6,7,2,1,9,5,3,4,8,1,9,8,3,4,2,5,6,7,8,5,9,7,6,1,4,2,3,4,2,6,8,5,3,7,9,1,7,1,3,9,2,4,8,5,6,9,6,1,5,3,7,2,8,4,2,8,7,4,1,9,6,3,5,3,4,5,2,8,6,1,7,9];

function Sudoku() {
  const [cells, setCells] = useState(sudokuPuzzle.map(String));
  const [selected, setSelected] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  function fill(value: string) {
    if (selected === null || sudokuPuzzle[selected]) return;
    setCells((current) => current.map((cell, index) => index === selected ? value : cell));
  }
  return (
    <ReflectionSection title="Interactive Sudoku">
      <div className="mx-auto grid max-w-[396px] grid-cols-9 overflow-hidden rounded-lg border-2 border-ink bg-ink">
        {cells.map((cell, index) => (
          <button key={index} type="button" onClick={() => !sudokuPuzzle[index] && setSelected(index)} aria-label={`Row ${Math.floor(index / 9) + 1}, column ${(index % 9) + 1}${cell !== "0" ? `, ${cell}` : ""}`} className={`aspect-square border-[.5px] border-ink/20 text-sm sm:text-base ${(Math.floor(index / 9) + 1) % 3 === 0 && index < 72 ? "border-b-2 border-b-ink" : ""} ${(index + 1) % 3 === 0 && (index + 1) % 9 !== 0 ? "border-r-2 border-r-ink" : ""} ${selected === index ? "bg-ochre-light" : sudokuPuzzle[index] ? "bg-sage-light font-bold" : "bg-white text-terracotta"}`}>{cell === "0" ? "" : cell}</button>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-2">{[1,2,3,4,5,6,7,8,9].map((number) => <Button type="button" key={number} variant="outline" size="icon" className="bg-white" onClick={() => fill(String(number))}>{number}</Button>)}</div>
      <div className="mt-5 flex flex-wrap justify-center gap-3"><Button type="button" variant="outline" className="rounded-full bg-white" onClick={() => fill("0")}>Clear cell</Button><Button type="button" className="rounded-full bg-ink text-white" onClick={() => setMessage(cells.every((cell, index) => Number(cell) === sudokuSolution[index]) ? "Wonderful—you completed the puzzle." : "Not quite yet. Check the empty or incorrect cells.")}>Check puzzle</Button></div>
      <p aria-live="polite" className="mt-4 text-center text-sm font-semibold">{message}</p>
    </ReflectionSection>
  );
}
