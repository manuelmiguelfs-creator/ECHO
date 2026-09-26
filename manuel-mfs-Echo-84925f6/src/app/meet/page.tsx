"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { CalendarPlus, CheckCircle2, Clock, Info, MapPin, Search, User, Users } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MeetingCard } from "@/components/meeting-card";
import { useApp } from "@/components/app-provider";
import { conditionProfiles, normalizeConditionIds, type ConditionId } from "@/lib/conditions";
import { conditionPinColors } from "@/lib/meetings";

const MeetingsMap = dynamic(() => import("@/components/meetings-map"), {
  ssr: false,
  loading: () => (
    <div className="grid h-[480px] place-items-center rounded-[2rem] border border-ink/10 bg-paper text-sm text-ink/50">
      Loading map…
    </div>
  ),
});

const emptyForm = {
  organizer: "",
  condition: "" as ConditionId | "",
  city: "",
  place: "",
  dateTime: "",
  description: "",
};

export default function MeetPage() {
  const { quiz, meetings, joinedMeetings, addMeeting } = useApp();
  const [view, setView] = useState<"join" | "create">("join");
  const [scope, setScope] = useState<"mine" | "all">("mine");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [created, setCreated] = useState(false);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    queueMicrotask(() => setNow(Date.now()));
  }, []);

  const myConditions = normalizeConditionIds(quiz?.conditions);
  const hasQuiz = myConditions.length > 0;
  const showMine = hasQuiz && scope === "mine";

  const isPast = (dateTime: string) => now !== null && new Date(dateTime).getTime() < now;

  const visible = meetings
    .filter((meeting) => !showMine || myConditions.includes(meeting.condition))
    .filter((meeting) =>
      `${meeting.place} ${meeting.city} ${meeting.organizer} ${meeting.description ?? ""}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      const pastDiff = Number(isPast(a.dateTime)) - Number(isPast(b.dateTime));
      return pastDiff || a.dateTime.localeCompare(b.dateTime);
    });

  const goingCount = meetings.filter((meeting) => joinedMeetings.includes(meeting.id)).length;

  function startCreating() {
    setForm({
      ...emptyForm,
      organizer: quiz?.fullName ?? "",
      condition: myConditions[0] ?? "",
    });
    setCreated(false);
    setView("create");
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!form.condition) return;
    addMeeting({
      organizer: form.organizer.trim(),
      condition: form.condition,
      city: form.city.trim(),
      place: form.place.trim(),
      dateTime: form.dateTime,
      description: form.description.trim() || undefined,
    });
    setCreated(true);
    setScope("all");
    setView("join");
  }

  return (
    <>
      <PageHero
        eyebrow="🤝 Meet"
        title="Meet people who understand."
        description="Create or join small, in-person meetups with people living with the same condition. Talk openly about how you live with it, at your own pace."
        tone="blue"
        glow
      />

      <div className="page-shell py-12 lg:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex rounded-full border border-ink/10 bg-paper p-1 shadow-xs">
            <button
              type="button"
              onClick={() => setView("join")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                view === "join" ? "bg-ink text-white" : "text-ink/70 hover:text-ink"
              }`}
            >
              <Users className="size-4" /> Join a meeting
            </button>
            <button
              type="button"
              onClick={startCreating}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                view === "create" ? "bg-ink text-white" : "text-ink/70 hover:text-ink"
              }`}
            >
              <CalendarPlus className="size-4" /> Create a meeting
            </button>
          </div>
          {goingCount > 0 && (
            <p className="text-sm text-ink/60">
              You&apos;re going to <span className="font-semibold text-terracotta">{goingCount}</span>{" "}
              {goingCount === 1 ? "meeting" : "meetings"}.
            </p>
          )}
        </div>

        {view === "join" ? (
          <section className="mt-8">
            {created && (
              <div
                role="status"
                className="mb-6 flex items-center gap-2.5 rounded-2xl border border-sage/60 bg-sage-light/60 px-4 py-3 text-sm font-semibold"
              >
                <CheckCircle2 className="size-5 text-[#4e6b45]" />
                Your meeting was created and you&apos;re on the list.
              </div>
            )}

            {!hasQuiz && (
              <div className="mb-6 flex flex-col gap-3 rounded-2xl bg-ochre-light p-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-ink/75">
                  Take the quiz so Echo can show you meetings about the conditions that apply to you.
                </p>
                <Button asChild variant="outline" className="rounded-full bg-white">
                  <Link href="/quiz">Take the quiz</Link>
                </Button>
              </div>
            )}

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              {hasQuiz ? (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setScope("mine")}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      scope === "mine" ? "border-terracotta bg-terracotta-light/50 text-ink" : "border-ink/10 bg-paper text-ink/65"
                    }`}
                  >
                    For {conditionProfiles.filter((p) => myConditions.includes(p.id)).map((p) => p.label).join(", ")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setScope("all")}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      scope === "all" ? "border-terracotta bg-terracotta-light/50 text-ink" : "border-ink/10 bg-paper text-ink/65"
                    }`}
                  >
                    All meetings
                  </button>
                </div>
              ) : (
                <span />
              )}
              <div className="relative md:w-80">
                <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search place, city, or host"
                  className="h-11 rounded-full border-ink/15 bg-paper pl-11"
                />
              </div>
            </div>

            {visible.length ? (
              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {visible.map((meeting) => (
                  <MeetingCard key={meeting.id} meeting={meeting} isPast={isPast(meeting.dateTime)} />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-[2rem] border border-dashed border-ink/20 p-10 text-center">
                <span className="text-4xl">🌱</span>
                <h2 className="mt-4 font-display text-3xl font-semibold">No meetings here yet</h2>
                <p className="mt-2 text-ink/60">Be the first to bring people together.</p>
                <Button onClick={startCreating} className="mt-6 h-11 rounded-full bg-terracotta px-6 text-white hover:bg-ink">
                  <CalendarPlus className="size-4" /> Create a meeting
                </Button>
              </div>
            )}

            <div className="mt-14">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="eyebrow">🗺️ Meeting map</p>
                  <h2 className="mt-3 font-display text-4xl font-semibold">Where people are meeting</h2>
                  <p className="mt-2 max-w-xl text-sm text-ink/60">
                    Hover over a pin to see the meeting details. Drag to move around and use the + and − buttons to zoom.
                  </p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-ink/70">
                  {conditionProfiles.map((condition) => (
                    <span key={condition.id} className="flex items-center gap-1.5">
                      <span className="size-2.5 rounded-full" style={{ background: conditionPinColors[condition.id] }} />
                      {condition.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <MeetingsMap meetings={visible} pastIds={visible.filter((m) => isPast(m.dateTime)).map((m) => m.id)} />
              </div>
            </div>
          </section>
        ) : (
          <section className="mt-8 grid gap-10 lg:grid-cols-[1.12fr_.88fr]">
            <form
              onSubmit={submit}
              className="rounded-[2.5rem] border border-ink/10 bg-paper p-6 shadow-[0_20px_50px_rgba(41,50,45,0.04)] sm:p-10"
            >
              <h2 className="font-display text-3xl font-semibold">Create a meeting</h2>
              <p className="mt-1 text-sm text-ink/60">Share the essentials so people know where and when to find you.</p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <Field label="Full name" className="sm:col-span-2">
                  <IconInput icon={<User />}>
                    <Input
                      required
                      value={form.organizer}
                      onChange={(e) => setForm({ ...form, organizer: e.target.value })}
                      placeholder="Your name"
                      className="h-13 rounded-2xl border-ink/15 bg-white/90 pl-11 text-base"
                    />
                  </IconInput>
                </Field>

                <Field label="What condition is this meeting about?" className="sm:col-span-2">
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                    {conditionProfiles.map((condition) => {
                      const checked = form.condition === condition.id;
                      return (
                        <label
                          key={condition.id}
                          className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3.5 text-sm transition select-none ${
                            checked
                              ? "border-terracotta bg-terracotta-light/40 font-semibold ring-1 ring-terracotta/30"
                              : "border-ink/10 bg-white/80 text-ink/80 hover:border-ink/25"
                          }`}
                        >
                          <input
                            required
                            type="radio"
                            name="condition"
                            className="size-4 accent-terracotta"
                            checked={checked}
                            onChange={() => setForm({ ...form, condition: condition.id })}
                          />
                          <span className="truncate">{condition.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </Field>

                <Field label="City or area">
                  <IconInput icon={<MapPin />}>
                    <Input
                      required
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="e.g. Seixal"
                      className="h-13 rounded-2xl border-ink/15 bg-white/90 pl-11 text-base"
                    />
                  </IconInput>
                </Field>

                <Field label="Where will it take place?">
                  <IconInput icon={<MapPin />}>
                    <Input
                      required
                      value={form.place}
                      onChange={(e) => setForm({ ...form, place: e.target.value })}
                      placeholder="e.g. Parque Urbano do Seixal"
                      className="h-13 rounded-2xl border-ink/15 bg-white/90 pl-11 text-base"
                    />
                  </IconInput>
                </Field>

                <Field label="Date and time" className="sm:col-span-2">
                  <IconInput icon={<Clock />}>
                    <Input
                      required
                      type="datetime-local"
                      value={form.dateTime}
                      onChange={(e) => setForm({ ...form, dateTime: e.target.value })}
                      className="h-13 rounded-2xl border-ink/15 bg-white/90 pl-11 text-base"
                    />
                  </IconInput>
                </Field>

                <Field label="Description (optional)" className="sm:col-span-2">
                  <Textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="What should people expect? e.g. a relaxed walk followed by coffee."
                    className="min-h-28 rounded-2xl border-ink/15 bg-white/90 p-4 text-base"
                  />
                </Field>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 border-t border-ink/10 pt-8">
                <Button type="submit" className="h-13 rounded-full bg-terracotta px-8 text-base font-semibold text-white hover:bg-ink">
                  <CalendarPlus className="size-4" /> Create meeting
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setView("join")}
                  className="h-13 rounded-full border-ink/15 bg-transparent px-6"
                >
                  Cancel
                </Button>
              </div>
            </form>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[2rem] bg-ink p-7 text-white sm:p-9">
                <p className="text-xs font-bold uppercase tracking-[.18em] text-terracotta-light">Why meet?</p>
                <h3 className="mt-3 font-display text-3xl font-semibold">You are not alone in this.</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  Talking with people who share a similar experience can make it easier to feel understood and to
                  swap ideas about what helps day to day.
                </p>
              </div>
              <div className="rounded-[2rem] border border-ink/10 bg-paper p-7">
                <p className="flex items-center gap-2 font-semibold">
                  <Info className="size-4 text-terracotta" /> Staying safe
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/65">
                  <li>• Choose public, easy-to-reach places like parks or cafés.</li>
                  <li>• Tell someone you trust where you&apos;re going.</li>
                  <li>• Share only what you feel comfortable sharing.</li>
                  <li>• Meetups are peer support, not a replacement for professional care.</li>
                </ul>
              </div>
            </aside>
          </section>
        )}
      </div>
    </>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <Label className="mb-2 block text-sm font-semibold text-ink">{label}</Label>
      {children}
    </div>
  );
}

function IconInput({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 [&>svg]:size-4">{icon}</span>
      {children}
    </div>
  );
}
