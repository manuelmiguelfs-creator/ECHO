import { AlertTriangle, Quote } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { testimonials } from "@/lib/testimonials";

export default function TestimonialsPage() {
  return (
    <>
      <PageHero eyebrow="⭐ Public profiles" title="People who made room for honest conversation." description="A gallery of public figures associated with open mental health conversations. Echo does not imply endorsement and does not invent personal quotes." tone="pink" />
      <div className="page-shell py-14">
        <div className="mb-8 flex gap-3 rounded-2xl bg-ochre-light p-5 text-sm leading-6"><AlertTriangle className="mt-0.5 size-5 shrink-0 text-terracotta" /><p><strong>Editorial review note:</strong> the source material listed two different David Beckham dates (February 5 and May 2, 1975). This public gallery uses May 2, 1975; the inconsistency remains flagged for administrators. John Green’s source year was also corrected from 1997 to 1977.</p></div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((person) => (
            <article key={person.id} className="overflow-hidden rounded-[1.75rem] bg-paper shadow-sm">
              <div className={`relative grid aspect-[4/3] place-items-center ${person.color}`}><Quote className="absolute left-5 top-5 size-6 text-ink/20" /><span className="font-display text-6xl font-semibold text-ink/50">{person.initials}</span></div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-terracotta">{person.featured ? "Featured profile" : "Public profile"}</p>
                <h2 className="mt-2 font-display text-2xl font-semibold">{person.displayName}</h2>
                <p className="mt-1 text-xs text-ink/45">{person.fullName} · Born {person.birthDate}{person.nationality ? ` · ${person.nationality}` : ""}</p>
                <p className="mt-4 text-sm leading-6 text-ink/65">{person.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
