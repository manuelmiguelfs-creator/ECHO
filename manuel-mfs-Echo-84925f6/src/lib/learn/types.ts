import type { ConditionId } from "@/lib/conditions";

/**
 * Every condition in the Learn library follows this exact shape. The fixed
 * list lengths keep all condition pages visually identical: to change how many
 * items a section shows, change the number here and TypeScript will point to
 * every condition file that needs updating.
 */
type Exactly<T, N extends number, R extends T[] = []> = R["length"] extends N
  ? R
  : Exactly<T, N, [...R, T]>;

export type Accent = "sage" | "pink" | "blue" | "ochre";

export type KeyFact = {
  label: string;
  value: string;
};

export type Treatment = {
  name: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Helpline = {
  name: string;
  /** How the number is displayed, e.g. "213 544 545" or "Text HOME to 741741". */
  contact: string;
  /** A tel:, sms: or https: link. */
  href: string;
  region: string;
  description: string;
};

export type Organization = {
  name: string;
  description: string;
  href: string;
};

export type Photo = {
  src: string;
  /** Page crediting the photographer and licence. */
  creditHref: string;
};

export type PublicFigure = {
  name: string;
  knownFor: string;
  photo: Photo;
  /** What they have shared publicly, paraphrased. Never an invented quote. */
  story: string;
  learnMoreHref: string;
};

export type LearnEntry = {
  id: ConditionId;
  name: string;
  shortName: string;
  tagline: string;
  accent: Accent;
  overview: {
    intro: Exactly<string, 2>;
    keyFacts: Exactly<KeyFact, 3>;
    symptoms: Exactly<string, 6>;
    causes: Exactly<string, 4>;
    treatments: Exactly<Treatment, 3>;
  };
  faq: Exactly<FaqItem, 6>;
  resources: {
    helplines: Exactly<Helpline, 3>;
    organizations: Exactly<Organization, 3>;
  };
  testimonials: Exactly<PublicFigure, 6>;
};
