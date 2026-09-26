import type { Helpline, Photo } from "./types";

/** Builds a photo from a Wikimedia Commons file name, e.g. "Lady_Gaga_2016.jpg". */
export function commonsPhoto(fileName: string): Photo {
  const file = encodeURIComponent(fileName);
  return {
    src: `https://commons.wikimedia.org/wiki/Special:FilePath/${file}?width=480`,
    creditHref: `https://commons.wikimedia.org/wiki/File:${file}`,
  };
}

/** Builds an English Wikipedia link from an article title, e.g. "Lady_Gaga". */
export function wikipedia(title: string) {
  return `https://en.wikipedia.org/wiki/${title}`;
}

/** Shown at the top of every condition's resources, in this order. */
export const emergencyLines: Helpline[] = [
  {
    name: "Emergency services",
    contact: "112",
    href: "tel:112",
    region: "Portugal & EU",
    description: "Call if you or someone else is in immediate danger.",
  },
  {
    name: "SNS 24 — Psychological support",
    contact: "808 24 24 24",
    href: "tel:808242424",
    region: "Portugal",
    description: "Choose option 4 to speak with a psychologist. Available 24/7.",
  },
  {
    name: "988 Suicide & Crisis Lifeline",
    contact: "Call or text 988",
    href: "tel:988",
    region: "United States",
    description: "Free, confidential crisis support. Available 24/7.",
  },
];

/** Condition-specific lines. Reference these from condition files so each number lives in one place. */
export const helplines = {
  sosVozAmiga: {
    name: "SOS Voz Amiga",
    contact: "213 544 545",
    href: "tel:213544545",
    region: "Portugal",
    description: "Confidential emotional support line for loneliness, anxiety, depression and suicidal thoughts.",
  },
  vozDeApoio: {
    name: "Voz de Apoio",
    contact: "225 506 070",
    href: "tel:225506070",
    region: "Portugal",
    description: "Anonymous listening line for people going through emotional distress.",
  },
  apav: {
    name: "APAV — Victim Support",
    contact: "116 006",
    href: "tel:116006",
    region: "Portugal",
    description: "Free, confidential support for victims of crime, violence and abuse.",
  },
  namiHelpline: {
    name: "NAMI HelpLine",
    contact: "1-800-950-6264",
    href: "tel:18009506264",
    region: "United States",
    description: "Information, referrals and support for people with mental health conditions and their families.",
  },
  crisisTextLine: {
    name: "Crisis Text Line",
    contact: "Text HOME to 741741",
    href: "sms:741741?&body=HOME",
    region: "United States",
    description: "Free 24/7 support by text message with a trained crisis counsellor.",
  },
  veteransCrisisLine: {
    name: "Veterans Crisis Line",
    contact: "Dial 988, then press 1",
    href: "tel:988",
    region: "United States",
    description: "Confidential support for veterans, service members and their families.",
  },
  rainn: {
    name: "RAINN Sexual Assault Hotline",
    contact: "1-800-656-4673",
    href: "tel:18006564673",
    region: "United States",
    description: "Free, confidential support for survivors of sexual violence. Available 24/7.",
  },
  samaritans: {
    name: "Samaritans",
    contact: "116 123",
    href: "tel:116123",
    region: "UK & Ireland",
    description: "Free listening support for anyone who is struggling. Available 24/7.",
  },
  ocdAction: {
    name: "OCD Action Helpline",
    contact: "0300 636 5478",
    href: "tel:03006365478",
    region: "United Kingdom",
    description: "Information and support for people affected by OCD and their families.",
  },
  anxietyUk: {
    name: "Anxiety UK",
    contact: "03444 775 774",
    href: "tel:03444775774",
    region: "United Kingdom",
    description: "Support, information and therapy access for people living with anxiety.",
  },
  saneline: {
    name: "SANEline",
    contact: "0300 304 7000",
    href: "tel:03003047000",
    region: "United Kingdom",
    description: "Emotional support for anyone affected by mental illness, including family and friends.",
  },
} satisfies Record<string, Helpline>;
