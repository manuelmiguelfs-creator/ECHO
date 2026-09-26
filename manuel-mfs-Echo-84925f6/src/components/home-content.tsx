"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type MouseEvent } from "react";
import { ArrowRight, BookOpen, CheckCircle2, CircleHelp, Heart, ShieldCheck, Siren, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { categoryMeta, solutions, type Category } from "@/lib/solutions";
import { testimonials } from "@/lib/testimonials";
import { useApp } from "@/components/app-provider";
import { MeetingCard } from "@/components/meeting-card";
import { conditionProfiles, normalizeConditionIds } from "@/lib/conditions";

const faqs = [
  ["How can I help your community?", "Submit a personal strategy through our community page. Every contribution is reviewed before it can appear publicly."],
  ["How did you gather your information?", "Our education draws on established health organizations, interviews, and lived experiences. Content that is not adequately verified is held for review."],
  ["What is your quiz for?", "The quiz learns which activity categories have felt useful to you and uses those scores to order recommendations. It is not a clinical assessment."],
  ["How does the help button work?", "Help Now displays all activities and, after the quiz, shows a recommendation based on each activity’s category. You can always choose any activity."],
  ["Can I add my support measures to your library?", "Yes. Anyone can suggest an activity, but it must pass a team review before publication."],
  ["Where can I leave suggestions for improvements?", "Use the community contribution page and include product feedback in the description."],
];

export function HomeContent() {
  const { quiz, meetings } = useApp();
  const selectedIds = normalizeConditionIds(quiz?.conditions);
  const upcomingMeetings = meetings
    .filter((meeting) => !selectedIds.length || selectedIds.includes(meeting.condition))
    .sort((a, b) => a.dateTime.localeCompare(b.dateTime))
    .slice(0, 3);
  const selectedProfiles = conditionProfiles.filter((profile) => selectedIds.includes(profile.id));
  const selectedConditionKey = selectedIds.join(",");
  const selectedNames = selectedProfiles.map((profile) => profile.label).join(", ");
  const hasQuiz = Boolean(quiz?.conditions?.length);
  const focusText = selectedNames || "how Echo works";
  const emergencySolution = getEmergencySolution(quiz, selectedConditionKey);
  const emergencyHref = emergencySolution ? `/solutions/${emergencySolution.id}` : "/help-now";

  function openRandomActivity(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const randomSolution = getRandomEmergencySolution(quiz, selectedConditionKey);
    router.push(randomSolution ? `/solutions/${randomSolution.id}` : "/help-now");
  }

  return (
    <div className="overflow-hidden">
      <section className="page-shell relative grid min-h-[680px] items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
        <div className="relative z-10">
          <p className="eyebrow mb-5">👋 You are not your thoughts</p>
          <h1 className="max-w-3xl font-display text-6xl font-semibold leading-[.95] tracking-[-.04em] text-ink sm:text-7xl lg:text-[5.5rem]">
            Make room for what you <span className="relative inline-block text-terracotta">really feel.
              <svg className="absolute -bottom-3 left-0 w-full text-ochre" viewBox="0 0 300 18" fill="none" aria-hidden>
                <path d="M3 12C69 3 151 4 297 9" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-10 max-w-xl text-lg leading-8 text-ink/65">
            {hasQuiz
              ? `Find a direct next step for ${focusText}, explore the rest of Echo, and keep a private record of what helps—without judgment.`
              : "Learn how Echo works, complete the short quiz, and get a private starting point tailored to your answers."}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-13 rounded-full bg-terracotta px-7 text-base text-white hover:bg-ink">
              <Link href="/quiz">Start with the quiz <ArrowRight /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-13 rounded-full border-ink/20 bg-white/70 px-7 text-base">
              <Link href="/learn">Understand your conditions</Link>
            </Button>
            {hasQuiz && (
              <Button asChild variant="outline" size="lg" className="h-13 rounded-full border-ink/20 bg-white/70 px-7 text-base">
                <Link href="/what-is-ocd">Understand your conditions</Link>
              </Button>
            )}
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-ink/55">
            <ShieldCheck className="size-4 text-sage" /> Private by default. Educational, never diagnostic.
          </p>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          <div className="absolute inset-[8%] rounded-[48%_52%_46%_54%] bg-sage-light" />
          <div className="absolute inset-[18%] rotate-6 rounded-[42%_58%_55%_45%] bg-terracotta-light" />
          <div className="absolute left-[18%] top-[17%] w-[64%] -rotate-3 rounded-[2.5rem] border border-white/70 bg-paper p-7 shadow-[0_24px_80px_rgba(41,50,45,.14)] sm:p-9">
            <span className="mb-6 grid size-12 place-items-center rounded-2xl bg-ochre-light text-2xl">💬</span>
            <p className="font-display text-3xl font-semibold leading-tight sm:text-4xl">“A thought can feel loud without being a command.”</p>
            <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-cream"><div className="h-full w-2/3 rounded-full bg-terracotta" /></div>
            <p className="mt-3 text-xs font-bold uppercase tracking-widest text-ink/45">A small reminder from Echo</p>
          </div>
          <Sparkles className="absolute right-[4%] top-[9%] size-12 text-ochre" />
          <Heart className="absolute bottom-[9%] left-[6%] size-14 -rotate-12 fill-terracotta-light text-terracotta" />
        </div>
      </section>

      {selectedProfiles.length > 0 && (
        <section className="page-shell pb-10">
          <div className="rounded-[2rem] bg-blue-soft p-7 sm:p-10">
            <p className="eyebrow">Personalized for you</p>
            <h2 className="mt-3 font-display text-4xl font-semibold">A clearer starting point for {selectedNames}</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {selectedProfiles.map((profile) => (
                <Link key={profile.id} href={`/learn?condition=${profile.id}`} className="rounded-2xl bg-paper p-6 transition hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="font-display text-2xl font-semibold">{profile.label}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink/65">{profile.summary}</p>
                  <span className="mt-5 flex items-center gap-2 text-sm font-bold text-terracotta">Read about {profile.label} <ArrowRight className="size-4" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {!hasQuiz && (
        <section className="page-shell pb-24">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ["01", "Learn how Echo works", "Echo brings together private reflection, supportive activities, and responsibly reviewed community ideas."],
              ["02", "Answer a few questions", "The quiz helps Echo understand which broad activity categories may fit you. It is not a diagnosis."],
              ["03", "Choose your next step", "After the quiz, the homepage can take you directly to a randomly selected activity whenever you need one."],
            ].map(([number, title, text]) => (
              <article key={number} className={`rounded-[1.75rem] p-7 ${number === "01" ? "bg-sage-light" : number === "02" ? "bg-ochre-light" : "bg-pink-soft"}`}>
                <span className="font-display text-4xl text-ink/25">{number}</span>
                <h2 className="mt-8 font-display text-2xl font-semibold">{title}</h2>
                <p className="mt-4 leading-7 text-ink/65">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-[2rem] bg-ink p-8 text-center text-white sm:p-12">
            <h2 className="font-display text-4xl font-semibold">Start privately, at your own pace.</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/65">Complete the quiz to unlock personalized education and support suggestions. Echo is educational and does not replace professional or emergency care.</p>
            <Button asChild className="mt-7 h-12 rounded-full bg-white px-7 text-ink hover:bg-cream"><Link href="/quiz">Take the quiz <ArrowRight /></Link></Button>
          </div>
        </section>
      )}

      {hasQuiz && (
        <>
      <section className="page-shell pb-10">
        <div className="grid overflow-hidden rounded-[2rem] border border-terracotta/20 bg-ochre-light shadow-[0_16px_45px_rgba(180,101,72,.12)] md:grid-cols-[1fr_auto]">
          <div className="relative overflow-hidden p-7 sm:p-10">
            <div className="absolute -right-16 -top-20 size-56 rounded-full border-[28px] border-white/30" />
            <p className="relative mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-[.16em] text-terracotta"><Siren className="size-4" /> Need help right now?</p>
            <h2 className="relative font-display text-3xl font-semibold text-ink">Choose one small next step.</h2>
            <p className="relative mt-3 max-w-2xl text-ink/65">Get a randomly selected activity matched to your quiz answers. Echo is not an emergency service; contact local emergency services if you or someone else is in immediate danger.</p>
          </div>
          <div className="flex items-center justify-center bg-ochre-light p-7 sm:p-10">
            <Button asChild size="lg" className="h-14 rounded-full border-2 border-terracotta bg-terracotta px-8 text-white shadow-[0_10px_30px_rgba(180,101,72,.3)] transition hover:-translate-y-1 hover:bg-ink hover:shadow-[0_14px_36px_rgba(41,50,45,.25)]"><Link href={emergencyHref} onClick={openRandomActivity}><Siren className="size-5" /> I Need Help Now <ArrowRight /></Link></Button>
          </div>
        </div>
      </section>

      <section className="page-shell pb-10 pt-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">🤝 Meet</p>
            <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
              {selectedProfiles.length ? `Upcoming meetings for ${selectedNames}` : "Upcoming meetings"}
            </h2>
            <p className="mt-3 max-w-2xl text-ink/60">Small, in-person meetups to talk with people who understand what you live with.</p>
          </div>
          <Button asChild variant="outline" className="rounded-full bg-transparent"><Link href="/meet">See all meetings <ArrowRight /></Link></Button>
        </div>
        {upcomingMeetings.length ? (
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {upcomingMeetings.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />)}
          </div>
        ) : (
          <div className="mt-8 rounded-[2rem] border border-dashed border-ink/20 p-8 text-center">
            <p className="text-ink/60">No meetings for your conditions yet.</p>
            <Button asChild className="mt-4 rounded-full bg-terracotta text-white hover:bg-ink"><Link href="/meet">Create the first one</Link></Button>
          </div>
        )}
      </section>

      <section className="section-space page-shell">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Our mission</p>
            <h2 className="mt-4 font-display text-5xl font-semibold leading-tight">More truth.<br />Less stigma.</h2>
            <Button asChild variant="outline" className="mt-8 rounded-full bg-transparent"><Link href="/about">More about us <ArrowRight /></Link></Button>
          </div>
          <div className="grid gap-5 text-lg leading-8 text-ink/70 sm:grid-cols-2">
            <p>Echo challenges stigma and oversimplification around mental health conditions. Every person deserves clear information, practical support, and room to be understood without judgment.</p>
            <p>We bring together condition-aware education, practical support, and a responsibly moderated community so people can feel seen, informed, and less alone.</p>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20">
        <div className="page-shell">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div><p className="eyebrow">Keep in mind</p><h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Gentle reminders for hard moments</h2></div>
            <span className="hidden text-5xl sm:block">✦</span>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              ["01", "Name the pattern, not yourself", "Mental health symptoms can produce powerful thoughts, feelings, and urges. A qualified professional can help you understand them without reducing you to a label."],
              ["02", "Support can be practical and personal", "Small activities may help someone get through a difficult moment, but there is no single strategy that works for everyone."],
              ["03", "Expect the unexpected", "Symptoms and emotions can change over time. A difficult moment does not define your values, identity, or future."],
            ].map(([number, title, text], index) => (
              <article key={number} className={`rounded-[1.75rem] p-7 ${index === 0 ? "bg-sage-light" : index === 1 ? "bg-ochre-light" : "bg-pink-soft"}`}>
                <span className="font-display text-4xl text-ink/25">{number}</span>
                <h3 className="mt-10 font-display text-2xl font-semibold">{title}</h3>
                <p className="mt-4 leading-7 text-ink/65">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space page-shell">
        <div className="text-center">
          <p className="eyebrow">💡 Solution library</p>
          <h2 className="mt-3 font-display text-5xl font-semibold">Find an activity that fits this moment</h2>
          <p className="mx-auto mt-4 max-w-2xl text-ink/60">Browse 22 supportive activities for moments of anxiety or compulsion. The library is designed to be reviewed and updated.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {Object.entries(categoryMeta).map(([key, category]) => (
            <Link href={`/solutions?category=${key}`} key={key} className="group rounded-[1.75rem] border border-ink/10 bg-paper p-7 transition hover:-translate-y-1 hover:shadow-xl">
              <span className="text-4xl">{category.emoji}</span>
              <h3 className="mt-8 font-display text-2xl font-semibold">{category.label}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/60">{category.description}</p>
              <span className="mt-6 flex items-center gap-2 text-sm font-bold text-terracotta">Explore <ArrowRight className="size-4 transition group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center"><Button asChild className="h-12 rounded-full bg-ink px-7 text-white"><Link href="/solutions">Open solution library</Link></Button></div>
      </section>

      <section className="page-shell pb-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-terracotta px-7 py-14 text-white sm:px-14">
          <div className="absolute -right-20 -top-28 size-80 rounded-full border-[45px] border-white/10" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[.18em] text-white/65">🔄 Community solutions for mental health</p>
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold sm:text-5xl">What helped you might help someone else.</h2>
              <div className="mt-7 grid gap-3 text-white/80 sm:grid-cols-3"><span>Share real-life strategies.</span><span>Discover community ideas.</span><span>Reviewed before publishing.</span></div>
            </div>
            <Button asChild size="lg" className="h-12 rounded-full bg-white px-7 text-ink hover:bg-cream"><Link href="/community">Help our community <ArrowRight /></Link></Button>
          </div>
        </div>
      </section>

      <section className="bg-sage-light py-20">
        <div className="page-shell grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <CircleHelp className="size-10 text-terracotta" /><p className="eyebrow mt-6">Common questions</p>
            <h2 className="mt-3 font-display text-5xl font-semibold">A clearer way forward.</h2>
            <Button asChild variant="outline" className="mt-7 rounded-full bg-transparent"><Link href="/faq">Read the full FAQ</Link></Button>
          </div>
          <Accordion className="rounded-[1.5rem] bg-paper px-6">
            {faqs.map(([question, answer], index) => (
              <AccordionItem key={question} value={`faq-${index}`}>
                <AccordionTrigger className="py-5 text-left text-base font-semibold">{question}</AccordionTrigger>
                <AccordionContent className="pb-5 leading-7 text-ink/65">{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="section-space page-shell">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div><p className="eyebrow">⭐ Public profiles</p><h2 className="mt-3 font-display text-5xl font-semibold">Speaking openly matters.</h2></div>
          <Button asChild variant="outline" className="rounded-full bg-transparent"><Link href="/testimonials">See all profiles <ArrowRight /></Link></Button>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.filter((item) => item.featured).map((person) => (
            <article key={person.id} className="overflow-hidden rounded-[1.75rem] bg-paper shadow-sm">
              <div className={`grid aspect-[4/3] place-items-center ${person.color}`}><span className="font-display text-6xl font-semibold text-ink/50">{person.initials}</span></div>
              <div className="p-6"><p className="text-xs font-bold uppercase tracking-widest text-terracotta">Public profile</p><h3 className="mt-2 font-display text-2xl font-semibold">{person.displayName}</h3><p className="mt-3 line-clamp-2 text-sm leading-6 text-ink/60">{person.bio}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-shell pb-24">
        <div className="grid overflow-hidden rounded-[2.5rem] bg-ochre-light lg:grid-cols-2">
          <div className="p-8 sm:p-14">
            <BookOpen className="size-10 text-terracotta" /><h2 className="mt-6 font-display text-4xl font-semibold">Your private compulsion journal</h2>
            <p className="mt-4 max-w-lg leading-7 text-ink/65">Notice dates, emotions, and activities without turning patterns into a diagnosis. Entries stay in this browser unless you export them.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Button asChild className="rounded-full bg-ink text-white"><Link href="/journal">Open journal</Link></Button><Button asChild variant="outline" className="rounded-full bg-white/50"><Link href="/journal?new=true">Add entry</Link></Button></div>
          </div>
          <div className="grid place-items-center bg-paper/50 p-8">
            <div className="w-full max-w-sm -rotate-2 rounded-2xl bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between border-b border-ink/10 pb-4"><span className="font-semibold">Today</span><CheckCircle2 className="size-5 text-sage" /></div>
              <p className="mt-5 text-sm text-ink/50">What did I notice?</p><div className="mt-2 h-3 w-full rounded-full bg-cream" /><div className="mt-2 h-3 w-3/4 rounded-full bg-cream" />
              <div className="mt-6 flex gap-2"><span className="rounded-full bg-pink-soft px-3 py-1 text-xs">Anxiety</span><span className="rounded-full bg-sage-light px-3 py-1 text-xs">Relief (brief)</span></div>
            </div>
          </div>
        </div>
      </section>
        </>
      )}
    </div>
  );
}

function getEmergencySolution(quiz: QuizData | null, selectedConditionKey: string) {
  const pool = getEmergencyPool(quiz, selectedConditionKey);
  const seed = [...(quiz?.updatedAt ?? "echo")].reduce((total, character) => total + character.charCodeAt(0), 0);
  return pool[seed % pool.length];
}

function getRandomEmergencySolution(quiz: QuizData | null, selectedConditionKey: string) {
  const pool = getEmergencyPool(quiz, selectedConditionKey);
  return pool[Math.floor(Math.random() * pool.length)];
}

function getEmergencyPool(quiz: QuizData | null, selectedConditionKey: string) {
  const selectedConditionIds = selectedConditionKey ? selectedConditionKey.split(",") : [];
  const suggestedCategories = [...new Set(
    conditionProfiles
      .filter((profile) => selectedConditionIds.includes(profile.id))
      .flatMap((profile) => profile.suggestedCategories),
  )] as Category[];
  let pool = suggestedCategories.length
    ? solutions.filter((solution) => suggestedCategories.includes(solution.category))
    : solutions;

  if (quiz) {
    const bestCategory = Object.entries({
      Outside: quiz.outsideScore,
      Inside: quiz.insideScore,
      Mental: quiz.mentalScore,
    }).sort((a, b) => b[1] - a[1])[0][0] as Category;
    const preferred = pool.filter((solution) => solution.category === bestCategory);
    if (preferred.length) pool = preferred;
  }

  return pool;
}
