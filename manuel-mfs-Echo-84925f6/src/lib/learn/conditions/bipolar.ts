import { commonsPhoto, helplines, wikipedia } from "../shared";
import type { LearnEntry } from "../types";

export const bipolar: LearnEntry = {
  id: "bipolar",
  name: "Bipolar Disorder",
  shortName: "Bipolar",
  tagline: "Intense shifts between highs and lows — and how stability is possible.",
  accent: "ochre",
  overview: {
    intro: [
      "Bipolar disorder, once called manic-depressive illness, causes marked shifts in mood, energy, activity and concentration. People experience episodes of mania or hypomania (unusually high or irritable mood) and episodes of depression, which are much more intense than everyday ups and downs.",
      "There are two main types. Bipolar I involves at least one full manic episode. Bipolar II involves milder hypomanic episodes and more frequent or longer depressive episodes. Bipolar disorder is often misdiagnosed at first, so it can take years to get the right diagnosis and treatment.",
    ],
    keyFacts: [
      { label: "How common", value: "About 2 in 100 people at some point in life" },
      { label: "When it starts", value: "Usually between the late teens and mid-20s" },
      { label: "What helps most", value: "Mood stabilisers combined with ongoing therapy" },
    ],
    symptoms: [
      "Elevated or irritable mood with much more energy",
      "Needing much less sleep than usual",
      "Racing thoughts and fast speech",
      "Impulsive or risky decisions, such as overspending",
      "Depressive episodes with sadness, fatigue and loss of interest",
      "Difficulty concentrating and, in severe episodes, thoughts of suicide",
    ],
    causes: [
      "Genetics and family history",
      "Brain structure and chemistry",
      "Stress and trauma",
      "Major life changes and disrupted sleep",
    ],
    treatments: [
      {
        name: "Mood stabilisers",
        description: "Medicines such as lithium help prevent extreme highs and lows. A psychiatrist monitors them closely.",
      },
      {
        name: "Psychotherapy",
        description: "CBT, psychoeducation and routine-based therapy help people spot warning signs and manage episodes.",
      },
      {
        name: "Ongoing care",
        description: "Regular check-ins, a steady sleep schedule and a relapse-prevention plan support long-term stability.",
      },
    ],
  },
  faq: [
    {
      question: "Is bipolar disorder just having mood swings?",
      answer: "No. Everyday mood swings are brief. Bipolar episodes last days to weeks, involve big changes in energy, sleep and behaviour, and can seriously affect daily life.",
    },
    {
      question: "Does mania always feel happy?",
      answer: "Not always. Mania can feel exciting at first, but it often includes irritability, agitation, anxiety or paranoia, and can lead to risky decisions a person later regrets.",
    },
    {
      question: "What is the difference between bipolar I and bipolar II?",
      answer: "Bipolar I involves at least one full manic episode. Bipolar II involves hypomania, a milder form of mania, together with depressive episodes that are often longer and more frequent.",
    },
    {
      question: "Can someone with bipolar disorder live a stable, successful life?",
      answer: "Yes. With consistent treatment and support, many people with bipolar disorder have long periods of stability, careers and healthy relationships.",
    },
    {
      question: "Why do some people stop taking their medication?",
      answer: "Side effects, feeling better, or missing the energy of manic periods are common reasons. Stopping suddenly can trigger a relapse, so any change should be discussed with a doctor.",
    },
    {
      question: "Is bipolar disorder the same as schizophrenia?",
      answer: "No. Bipolar disorder is mainly a mood condition. Schizophrenia mainly affects thinking and perception. Severe mood episodes can sometimes include psychosis, which is why they are occasionally confused.",
    },
  ],
  resources: {
    helplines: [helplines.vozDeApoio, helplines.samaritans, helplines.crisisTextLine],
    organizations: [
      {
        name: "Depression and Bipolar Support Alliance (DBSA)",
        description: "Peer support groups, wellness tools and education.",
        href: "https://www.dbsalliance.org",
      },
      {
        name: "International Bipolar Foundation",
        description: "Webinars, guides and resources for people with bipolar disorder and their families.",
        href: "https://ibpf.org",
      },
      {
        name: "NIMH — Bipolar Disorder",
        description: "Research-based information on symptoms, causes and treatment.",
        href: "https://www.nimh.nih.gov/health/topics/bipolar-disorder",
      },
    ],
  },
  testimonials: [
    {
      name: "Carrie Fisher",
      knownFor: "Actor and author, Princess Leia in Star Wars",
      photo: commonsPhoto("Carrie_Fisher_2013-a_straightened.jpg"),
      story: "Was one of the first celebrities to speak openly about bipolar disorder, writing about it with honesty and humour in books such as Wishful Drinking.",
      learnMoreHref: wikipedia("Carrie_Fisher"),
    },
    {
      name: "Catherine Zeta-Jones",
      knownFor: "Oscar-winning actor",
      photo: commonsPhoto("Catherine_Zeta-Jones_2025.png"),
      story: "Shared in 2011 that she had sought treatment for bipolar II disorder, hoping to reduce the stigma and encourage others to get help.",
      learnMoreHref: wikipedia("Catherine_Zeta-Jones"),
    },
    {
      name: "Mariah Carey",
      knownFor: "Singer and songwriter",
      photo: commonsPhoto("Mariah_Carey_Library_of_Congress_2023_1_Cropped_3.png"),
      story: "Revealed in 2018 that she had been diagnosed with bipolar II years earlier, and that therapy and medication now help her feel stable.",
      learnMoreHref: wikipedia("Mariah_Carey"),
    },
    {
      name: "Stephen Fry",
      knownFor: "Actor, writer and presenter",
      photo: commonsPhoto("Stephen_Fry_at_Berlinale_2024_Ausschnitt.jpg"),
      story: "Made the documentary The Secret Life of the Manic Depressive about his own bipolar disorder, and has campaigned for better mental health care.",
      learnMoreHref: wikipedia("Stephen_Fry"),
    },
    {
      name: "Kanye West",
      knownFor: "Rapper and producer",
      photo: commonsPhoto("Kanye_West_at_the_2009_Tribeca_Film_Festival_(crop_2).jpg"),
      story: "Said in 2018 that he had been diagnosed with bipolar disorder, and has discussed his experience of the condition publicly and in his music.",
      learnMoreHref: wikipedia("Kanye_West"),
    },
    {
      name: "Selena Gomez",
      knownFor: "Singer, actor and founder of Rare Beauty",
      photo: commonsPhoto("Selena_Gomez_at_the_2024_Toronto_International_Film_Festival_10_(cropped).jpg"),
      story: "Revealed in 2020 that she had been diagnosed with bipolar disorder, and shared her experience in the documentary My Mind & Me to help others feel less alone.",
      learnMoreHref: wikipedia("Selena_Gomez"),
    },
  ],
};
