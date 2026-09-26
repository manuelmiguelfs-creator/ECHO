import { commonsPhoto, helplines, wikipedia } from "../shared";
import type { LearnEntry } from "../types";

export const schizophrenia: LearnEntry = {
  id: "schizophrenia",
  name: "Schizophrenia",
  shortName: "Schizophrenia",
  tagline: "A serious but treatable condition that changes how a person experiences reality.",
  accent: "blue",
  overview: {
    intro: [
      "Schizophrenia is a serious mental health condition that affects how a person thinks, feels and perceives the world. It can cause psychosis — periods where a person loses touch with reality, such as hearing voices or holding strong beliefs that are not based on facts.",
      "Symptoms are often grouped into positive symptoms (experiences that are added, like hallucinations) and negative symptoms (abilities that are reduced, like motivation or emotional expression). Schizophrenia is not the same as having a 'split personality', and with treatment many people live meaningful, independent lives.",
    ],
    keyFacts: [
      { label: "How common", value: "About 1 in 300 people worldwide" },
      { label: "When it starts", value: "Late teens to early 30s, usually earlier in men" },
      { label: "What helps most", value: "Medication combined with psychological and social support" },
    ],
    symptoms: [
      "Delusions — strong beliefs that are not based in reality",
      "Hallucinations, such as hearing voices",
      "Disorganised thinking or speech",
      "Very disorganised or unusual behaviour",
      "Reduced emotional expression and speech",
      "Social withdrawal and loss of motivation or pleasure",
    ],
    causes: [
      "Genetics and family history",
      "Complications or infections during pregnancy or birth",
      "Brain chemistry involving dopamine and glutamate",
      "Heavy cannabis use in adolescence and social adversity",
    ],
    treatments: [
      {
        name: "Antipsychotic medication",
        description: "Reduces symptoms like hallucinations and delusions. A psychiatrist works with the person to find the right option.",
      },
      {
        name: "Psychological therapy",
        description: "CBT for psychosis and family therapy help people cope with symptoms and support relationships.",
      },
      {
        name: "Community and social support",
        description: "Help with education, work, housing and daily skills supports long-term recovery.",
      },
    ],
  },
  faq: [
    {
      question: "Can schizophrenia be cured?",
      answer: "There is no cure yet, but schizophrenia is treatable. Many people see their symptoms greatly reduced, and some recover to the point of living with few or no symptoms.",
    },
    {
      question: "Is schizophrenia hereditary?",
      answer: "Genes play a role — having a close relative with schizophrenia increases the risk — but most people with a family history never develop it. Environmental factors matter too.",
    },
    {
      question: "What are the first signs?",
      answer: "Early signs can include withdrawing from friends, falling behind at school or work, trouble sleeping, unusual thoughts or suspiciousness. Getting help early leads to better outcomes.",
    },
    {
      question: "Can someone work or study with schizophrenia?",
      answer: "Yes. With treatment and the right support, many people with schizophrenia study, work and have close relationships.",
    },
    {
      question: "Can alcohol and drugs make it worse?",
      answer: "Yes. Heavy cannabis use, especially in the teenage years, is linked to a higher risk, and drugs and alcohol can trigger relapses and make treatment less effective.",
    },
    {
      question: "Is schizophrenia the same as 'split personality'?",
      answer: "No. That is a common myth. Having separate identities is a different condition called dissociative identity disorder. Schizophrenia affects perception and thinking, not identity.",
    },
  ],
  resources: {
    helplines: [helplines.sosVozAmiga, helplines.saneline, helplines.namiHelpline],
    organizations: [
      {
        name: "Schizophrenia & Psychosis Action Alliance",
        description: "Advocacy, education and resources for people affected by schizophrenia and psychosis.",
        href: "https://sczaction.org",
      },
      {
        name: "NIMH — Schizophrenia",
        description: "Research-based information on symptoms, causes and treatment.",
        href: "https://www.nimh.nih.gov/health/topics/schizophrenia",
      },
      {
        name: "WHO — Schizophrenia fact sheet",
        description: "Global facts, figures and guidance on schizophrenia.",
        href: "https://www.who.int/news-room/fact-sheets/detail/schizophrenia",
      },
    ],
  },
  testimonials: [
    {
      name: "Elyn Saks",
      knownFor: "Law professor and MacArthur Fellow",
      photo: commonsPhoto("Elyn_Saks_at_Yale_Law_School.jpg"),
      story: "Wrote the memoir The Center Cannot Hold about living with schizophrenia while building a successful academic career, and advocates for the rights of people with mental illness.",
      learnMoreHref: wikipedia("Elyn_Saks"),
    },
    {
      name: "John Nash",
      knownFor: "Nobel Prize-winning mathematician",
      photo: commonsPhoto("John_Forbes_Nash,_Jr._by_Peter_Badge.jpg"),
      story: "Lived with schizophrenia for decades and later returned to his work. His life inspired the book and film A Beautiful Mind.",
      learnMoreHref: wikipedia("John_Forbes_Nash_Jr."),
    },
    {
      name: "Lionel Aldridge",
      knownFor: "Two-time Super Bowl champion",
      photo: commonsPhoto("Lionel_Aldridge_1962.jpg"),
      story: "After his football career he was diagnosed with schizophrenia and spent a period homeless. Once stable, he became a well-known speaker about mental illness.",
      learnMoreHref: wikipedia("Lionel_Aldridge"),
    },
    {
      name: "Peter Green",
      knownFor: "Founder of Fleetwood Mac",
      photo: commonsPhoto("Fleetwood_Mac_peter_green.jpg"),
      story: "Left music in 1970 and was later diagnosed with schizophrenia. After years of treatment he returned to recording and touring in the late 1990s.",
      learnMoreHref: wikipedia("Peter_Green_(musician)"),
    },
    {
      name: "Brian Wilson",
      knownFor: "Co-founder of The Beach Boys",
      photo: commonsPhoto("Brian_Wilson_1964.jpg"),
      story: "Spoke openly about hearing voices since the 1960s. He was diagnosed with schizoaffective disorder, which combines symptoms of schizophrenia and a mood disorder.",
      learnMoreHref: wikipedia("Brian_Wilson"),
    },
    {
      name: "Tom Harrell",
      knownFor: "Jazz trumpeter and composer",
      photo: commonsPhoto("Tom_Harrell_2011.jpg"),
      story: "Has lived with schizophrenia since his early twenties and, with treatment, built a decades-long career as one of jazz's most respected trumpeters and composers.",
      learnMoreHref: wikipedia("Tom_Harrell"),
    },
  ],
};
