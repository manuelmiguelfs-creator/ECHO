export function PageHero({
  eyebrow,
  title,
  description,
  tone = "sage",
}: {
  eyebrow: string;
  title: string;
  description: string;
  tone?: "sage" | "pink" | "blue" | "ochre";
}) {
  const colors = {
    sage: "bg-sage-light",
    pink: "bg-pink-soft",
    blue: "bg-blue-soft",
    ochre: "bg-ochre-light",
  };
  return (
    <section className={`${colors[tone]} border-b border-ink/5`}>
      <div className="page-shell py-16 sm:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-[-.03em] sm:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/65">{description}</p>
      </div>
    </section>
  );
}
