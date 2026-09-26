import { commonsPhoto, helplines, wikipedia } from "../shared";
import type { LearnEntry } from "../types";

export const ocd: LearnEntry = {
  id: "ocd",
  name: "Obsessive-Compulsive Disorder",
  shortName: "OCD",
  tagline: "Unwanted thoughts and repetitive rituals that are hard to stop — and very treatable.",
  accent: "blue",
  overview: {
    intro: [
      "Obsessive-compulsive disorder (OCD) is a mental health condition in which a person has obsessions — unwanted, intrusive thoughts, images or urges that cause intense distress — and compulsions, which are repetitive actions or mental rituals done to reduce that distress or prevent something bad from happening.",
      "Compulsions bring short-term relief, but they keep the cycle going. OCD is not about being tidy or organised: it can take up hours each day and affect school, work and relationships. Having an intrusive thought does not mean a person wants it or will act on it.",
    ],
    keyFacts: [
      { label: "How common", value: "About 2 in 100 people at some point in life" },
      { label: "When it starts", value: "Usually by age 19, often in childhood or the teens" },
      { label: "What helps most", value: "ERP therapy, sometimes combined with medication" },
    ],
    symptoms: [
      "Intrusive, unwanted thoughts, images or urges",
      "Intense doubt or a strong need for certainty",
      "Fear of contamination, causing harm or making a mistake",
      "Repetitive checking, washing, counting or ordering",
      "Seeking reassurance or mentally reviewing events",
      "Avoiding places, people or objects that trigger obsessions",
    ],
    causes: [
      "Genetics and family history",
      "Differences in brain circuits involved in threat and habits",
      "Learned patterns, where rituals bring short-term relief",
      "Stress and major life changes, which can make symptoms worse",
    ],
    treatments: [
      {
        name: "Exposure and Response Prevention (ERP)",
        description: "A type of CBT where a person gradually faces their fears while resisting the urge to perform compulsions.",
      },
      {
        name: "Medication",
        description: "Antidepressants called SSRIs can reduce symptoms. A psychiatrist or doctor decides if they are right for someone.",
      },
      {
        name: "Family support",
        description: "Helping family members understand OCD and stop joining in with rituals or giving constant reassurance.",
      },
    ],
  },
  faq: [
    {
      question: "Is OCD just being very neat or tidy?",
      answer: "No. Liking order is a preference. OCD involves distressing obsessions and compulsions that feel necessary, take up a lot of time and interfere with daily life. Many people with OCD have no concerns about tidiness at all.",
    },
    {
      question: "Do intrusive thoughts mean I want to act on them?",
      answer: "No. Almost everyone has strange or upsetting thoughts sometimes. In OCD, these thoughts feel especially disturbing precisely because they go against a person's values. Thoughts are not intentions.",
    },
    {
      question: "What causes OCD?",
      answer: "There is no single cause. Research points to a mix of genetics, differences in how certain brain circuits work, and learned patterns. Stressful life events can trigger or worsen symptoms, but they are not the only cause.",
    },
    {
      question: "Can OCD be cured?",
      answer: "OCD is usually described as manageable rather than cured. With the right treatment, most people see a big reduction in symptoms and many reach a point where OCD no longer controls their life.",
    },
    {
      question: "Is medication necessary?",
      answer: "Not always. ERP therapy works well on its own for many people. Others benefit from combining it with medication. This is a personal decision to make with a qualified professional.",
    },
    {
      question: "Can children and teenagers have OCD?",
      answer: "Yes. OCD often starts in childhood or adolescence. A family doctor, paediatrician or child mental health professional is a good first step, and ERP can be adapted for young people.",
    },
  ],
  resources: {
    helplines: [helplines.sosVozAmiga, helplines.ocdAction, helplines.namiHelpline],
    organizations: [
      {
        name: "International OCD Foundation",
        description: "Guides, a therapist directory and support groups for people with OCD and their families.",
        href: "https://iocdf.org/about-ocd/",
      },
      {
        name: "NIMH — Obsessive-Compulsive Disorder",
        description: "Research-based information on symptoms, causes and treatment.",
        href: "https://www.nimh.nih.gov/health/topics/obsessive-compulsive-disorder-ocd",
      },
      {
        name: "NHS — OCD",
        description: "Clear overview of symptoms, diagnosis and how to get help.",
        href: "https://www.nhs.uk/mental-health/conditions/obsessive-compulsive-disorder-ocd/overview/",
      },
    ],
  },
  testimonials: [
    {
      name: "David Beckham",
      knownFor: "Former England football captain",
      photo: commonsPhoto("David_Beckham_UNICEF_(cropped2).jpg"),
      story: "Has spoken about living with OCD, describing a need to arrange things in straight lines or in pairs and to clean and order his surroundings, and how hard it is to stop.",
      learnMoreHref: wikipedia("David_Beckham"),
    },
    {
      name: "Howie Mandel",
      knownFor: "Comedian and TV host",
      photo: commonsPhoto("Howie_Mandel_and_Trevor_Doerksen_on_America's_Got_Talent_(cropped).jpg"),
      story: "Has talked openly about OCD and his intense fear of germs, which is why he greets people with a fist bump. He wrote about it in his memoir Here's the Deal: Don't Touch Me.",
      learnMoreHref: wikipedia("Howie_Mandel"),
    },
    {
      name: "John Green",
      knownFor: "Author of The Fault in Our Stars",
      photo: commonsPhoto("Let's_Talk_about_Money_-_Vlogbrothers_YouTube_at_0009_(cropped).png"),
      story: "Has lived with OCD since childhood and drew on his own thought spirals to write Turtles All the Way Down, a novel about a teenager with OCD.",
      learnMoreHref: wikipedia("John_Green"),
    },
    {
      name: "Amanda Seyfried",
      knownFor: "Actor in Mamma Mia! and Les Misérables",
      photo: commonsPhoto("Amanda_Seyfried_at_the_2025_Toronto_International_Film_Festival._02_(cropped).jpg"),
      story: "Has shared that she has OCD and takes medication for it, saying mental health conditions should be treated as seriously as any other illness.",
      learnMoreHref: wikipedia("Amanda_Seyfried"),
    },
    {
      name: "Camila Cabello",
      knownFor: "Singer and songwriter",
      photo: commonsPhoto("Camila_Cabello_Sundance_2024_Cropped_(cropped).jpg"),
      story: "Has written about her experience with OCD and anxiety, how therapy helped her, and why she wants to talk about mental health without shame.",
      learnMoreHref: wikipedia("Camila_Cabello"),
    },
    {
      name: "Leonardo DiCaprio",
      knownFor: "Oscar-winning actor",
      photo: commonsPhoto("LeoPTABFI191125-28_(cropped).jpg"),
      story: "Has said he has lived with mild OCD since childhood, and that playing Howard Hughes, who had severe OCD, in The Aviator made his own urges harder to control for a while.",
      learnMoreHref: wikipedia("Leonardo_DiCaprio"),
    },
  ],
};
