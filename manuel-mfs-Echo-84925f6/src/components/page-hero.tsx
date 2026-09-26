export type HeroTone = "sage" | "pink" | "blue" | "ochre";

const flatColors: Record<HeroTone, string> = {
  sage: "bg-sage-light",
  pink: "bg-pink-soft",
  blue: "bg-blue-soft",
  ochre: "bg-ochre-light",
};

export const heroGradients: Record<HeroTone, string> = {
  sage: "bg-[linear-gradient(120deg,#dbe6d3_0%,#e8ede0_55%,#f7f1e7_100%)]",
  pink: "bg-[linear-gradient(120deg,#ebd0d6_0%,#f1e0dd_55%,#f7f1e7_100%)]",
  blue: "bg-[linear-gradient(120deg,#d3e4e6_0%,#e3ebe3_55%,#f7f1e7_100%)]",
  ochre: "bg-[linear-gradient(120deg,#f5e2ad_0%,#f6eacd_55%,#f7f1e7_100%)]",
};

const glowColors: Record<HeroTone, [string, string]> = {
  sage: ["bg-ochre-light/70", "bg-terracotta-light/45"],
  pink: ["bg-terracotta-light/60", "bg-ochre-light/50"],
  blue: ["bg-terracotta-light/60", "bg-sage/35"],
  ochre: ["bg-terracotta-light/55", "bg-sage/35"],
};

export function HeroGlow({ tone }: { tone: HeroTone }) {
  const [top, bottom] = glowColors[tone];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className={`absolute -right-24 -top-32 size-[28rem] rounded-full blur-3xl ${top}`} />
      <div className={`absolute -bottom-40 right-1/3 size-[22rem] rounded-full blur-3xl ${bottom}`} />
      <div className="absolute -left-20 top-10 size-72 rounded-full bg-paper/50 blur-3xl" />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  tone = "sage",
  glow = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  tone?: HeroTone;
  glow?: boolean;
}) {
  return (
    <section
      className={`${glow ? heroGradients[tone] : flatColors[tone]} relative overflow-hidden border-b border-ink/5`}
    >
      {glow && <HeroGlow tone={tone} />}
      <div className="page-shell relative py-16 sm:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-[-.03em] sm:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/65">{description}</p>
      </div>
    </section>
  );
}
