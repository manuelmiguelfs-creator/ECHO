export type ConditionId =
  | "ocd"
  | "depression"
  | "schizophrenia"
  | "anxiety"
  | "ptsd"
  | "bipolar";

export type ConditionProfile = {
  id: ConditionId;
  label: string;
  summary: string;
  experiences: string[];
  support: string;
  publicFigures: { name: string; note: string }[];
  sources: { label: string; href: string }[];
  suggestedCategories: string[];
};

export const conditionProfiles: ConditionProfile[] = [
  {
    id: "ocd",
    label: "OCD",
    summary:
      "Obsessive-compulsive disorder can involve unwanted thoughts, images, or urges and repetitive behaviors or mental acts. It is more than being organized or liking things clean.",
    experiences: ["Intrusive thoughts or images", "Doubt and uncertainty", "Rituals, checking, reassurance seeking, or avoidance"],
    support:
      "A qualified professional can assess OCD. Exposure and Response Prevention (ERP) is an evidence-based treatment approach; Echo does not diagnose or replace care.",
    publicFigures: [
      { name: "David Beckham", note: "Has publicly discussed experiencing OCD." },
      { name: "Howie Mandel", note: "Has publicly discussed living with OCD." },
      { name: "John Green", note: "Has publicly discussed OCD and anxiety." },
    ],
    sources: [
      { label: "International OCD Foundation", href: "https://iocdf.org/about-ocd/" },
      { label: "NHS", href: "https://www.nhs.uk/mental-health/conditions/obsessive-compulsive-disorder-ocd/overview/" },
    ],
    suggestedCategories: ["Mental", "Inside"],
  },
  {
    id: "depression",
    label: "Depression",
    summary:
      "Depression can affect mood, interest, energy, sleep, concentration, self-worth, and daily functioning. It is more than a brief period of sadness.",
    experiences: ["Low mood or emptiness", "Loss of interest or energy", "Changes in sleep, appetite, concentration, or hope"],
    support:
      "A doctor or mental health professional can help assess symptoms and discuss treatment. If someone may be in immediate danger, contact local emergency services or a crisis service.",
    publicFigures: [
      { name: "Lili Reinhart", note: "Has publicly discussed depression and mental health." },
      { name: "Dwayne Johnson", note: "Has publicly discussed experiencing depression." },
      { name: "Lady Gaga", note: "Has publicly discussed depression and trauma-related mental health." },
    ],
    sources: [
      { label: "NIMH", href: "https://www.nimh.nih.gov/health/publications/depression" },
      { label: "NHS", href: "https://www.nhs.uk/mental-health/conditions/clinical-depression/overview/" },
    ],
    suggestedCategories: ["Inside", "Mental"],
  },
  {
    id: "schizophrenia",
    label: "Schizophrenia",
    summary:
      "Schizophrenia is a serious mental health condition that can affect perception, thinking, mood, and motivation. It is not the same as having multiple personalities.",
    experiences: ["Changes in perception or beliefs", "Disorganized thinking or speech", "Reduced motivation, social withdrawal, or changes in emotional expression"],
    support:
      "Assessment and ongoing support from mental health professionals are important. Treatment may include medication, psychological support, and practical help chosen with a care team.",
    publicFigures: [
      { name: "Elyn Saks", note: "Professor and author who has publicly discussed living with schizophrenia." },
      { name: "John Nash", note: "Mathematician whose life and schizophrenia were publicly documented." },
      { name: "Brian Wilson", note: "Has publicly discussed serious mental health experiences; public labels around his diagnosis have varied." },
    ],
    sources: [
      { label: "World Health Organization", href: "https://www.who.int/news-room/fact-sheets/detail/schizophrenia" },
      { label: "NIMH", href: "https://www.nimh.nih.gov/health/publications/schizophrenia" },
    ],
    suggestedCategories: ["Inside", "Outside"],
  },
  {
    id: "anxiety",
    label: "Anxiety",
    summary:
      "Anxiety can involve persistent worry, fear, physical tension, and avoidance that interfere with everyday life. Occasional anxiety is common; anxiety disorders are more persistent or disruptive.",
    experiences: ["Worry that feels difficult to control", "Restlessness, tension, or irritability", "Rapid heartbeat, sleep changes, or avoidance"],
    support:
      "A qualified professional can help distinguish everyday stress from an anxiety disorder and discuss appropriate support. Grounding or breathing exercises may help some moments but are not a diagnosis or treatment plan.",
    publicFigures: [
      { name: "Camila Cabello", note: "Has publicly discussed anxiety and mental health." },
      { name: "Adele", note: "Has publicly discussed anxiety and panic symptoms." },
      { name: "Ryan Reynolds", note: "Has publicly discussed experiencing anxiety." },
    ],
    sources: [
      { label: "NIMH", href: "https://www.nimh.nih.gov/health/topics/anxiety-disorders" },
      { label: "NHS", href: "https://www.nhs.uk/mental-health/conditions/anxiety/" },
    ],
    suggestedCategories: ["Outside", "Mental"],
  },
  {
    id: "ptsd",
    label: "PTSD",
    summary:
      "Post-traumatic stress disorder can develop after experiencing or witnessing trauma. Symptoms may include re-experiencing, avoidance, changes in mood or beliefs, and feeling constantly on guard.",
    experiences: ["Unwanted memories, nightmares, or flashbacks", "Avoidance of reminders", "Being easily startled, watchful, detached, or emotionally overwhelmed"],
    support:
      "Trauma-informed care from a qualified professional can help. If talking about trauma makes someone feel unsafe or overwhelmed, they can pause and seek support at their own pace.",
    publicFigures: [
      { name: "Lady Gaga", note: "Has publicly discussed PTSD related to trauma." },
      { name: "Mick Mulvaney", note: "Has publicly discussed PTSD after military service." },
      { name: "Whoopi Goldberg", note: "Has publicly discussed trauma and PTSD." },
    ],
    sources: [
      { label: "National Center for PTSD", href: "https://www.ptsd.va.gov/understand/what/ptsd_basics.asp" },
      { label: "NHS", href: "https://www.nhs.uk/mental-health/conditions/post-traumatic-stress-disorder-ptsd/overview/" },
    ],
    suggestedCategories: ["Inside", "Outside"],
  },
  {
    id: "bipolar",
    label: "Bipolar disorder",
    summary:
      "Bipolar disorder involves episodes of depression and episodes of mania or hypomania. These mood episodes are more intense and sustained than ordinary day-to-day mood changes.",
    experiences: ["Periods of low mood and reduced energy", "Periods of unusually high or irritable mood", "Changes in sleep, energy, activity, speech, or decision-making"],
    support:
      "A mental health professional can assess mood episodes and help create a treatment and safety plan. Medication decisions should be made with a qualified prescriber.",
    publicFigures: [
      { name: "Catherine Zeta-Jones", note: "Has publicly discussed living with bipolar II disorder." },
      { name: "Carrie Fisher", note: "Publicly discussed living with bipolar disorder." },
      { name: "Stephen Fry", note: "Has publicly discussed bipolar disorder and mental health." },
    ],
    sources: [
      { label: "NIMH", href: "https://www.nimh.nih.gov/health/publications/bipolar-disorder" },
      { label: "NHS", href: "https://www.nhs.uk/mental-health/conditions/bipolar-disorder/overview/" },
    ],
    suggestedCategories: ["Mental", "Inside"],
  },
];

export const conditionById = Object.fromEntries(
  conditionProfiles.map((profile) => [profile.id, profile]),
) as Record<ConditionId, ConditionProfile>;

export function normalizeConditionIds(values: string[] | undefined) {
  return conditionProfiles
    .filter((profile) => values?.includes(profile.id) || values?.includes(profile.label))
    .map((profile) => profile.id);
}

export function selectedConditionProfiles(values: string[] | undefined) {
  const ids = normalizeConditionIds(values);
  return conditionProfiles.filter((profile) => ids.includes(profile.id));
}

/** "OCD", "OCD and anxiety", or "OCD, anxiety, and depression". Empty when nothing is selected. */
export function formatConditionList(labels: string[]) {
  if (labels.length === 0) return "";
  if (labels.length === 1) return labels[0];
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;
  return `${labels.slice(0, -1).join(", ")}, and ${labels[labels.length - 1]}`;
}

/** Names for one or two conditions; a short stand-in once the list gets long. */
export function conditionHeading(labels: string[], generic: string) {
  if (labels.length === 0) return generic;
  if (labels.length <= 2) return formatConditionList(labels);
  return "your conditions";
}
