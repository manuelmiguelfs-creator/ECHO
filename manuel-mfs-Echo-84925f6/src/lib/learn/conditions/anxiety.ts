import { commonsPhoto, helplines, wikipedia } from "../shared";
import type { LearnEntry } from "../types";

export const anxiety: LearnEntry = {
  id: "anxiety",
  name: "Anxiety Disorders",
  shortName: "Anxiety",
  tagline: "Worry and fear that stay long after the moment has passed — and can be managed.",
  accent: "ochre",
  overview: {
    intro: [
      "Anxiety is a normal response to stress that helps us stay alert. An anxiety disorder is different: the worry or fear is excessive, hard to control and lasts for months, getting in the way of everyday life. The most common form is Generalised Anxiety Disorder (GAD), where a person worries persistently about many different things.",
      "Anxiety affects both the mind and the body. Alongside constant worry, people often feel physical symptoms like a racing heart or muscle tension. Anxiety disorders are among the most common mental health conditions, and women are about twice as likely to be affected as men.",
    ],
    keyFacts: [
      { label: "How common", value: "About 4 in 100 people worldwide" },
      { label: "When it starts", value: "Often in childhood, the teens or early adulthood" },
      { label: "What helps most", value: "CBT therapy, sometimes combined with medication" },
    ],
    symptoms: [
      "Persistent worry that is hard to control",
      "Restlessness or feeling on edge",
      "Trouble sleeping and constant tiredness",
      "Irritability and difficulty concentrating",
      "Muscle tension, sweating or trembling",
      "Racing heart, nausea or shortness of breath",
    ],
    causes: [
      "Genetics and family history",
      "Brain chemistry and how the brain responds to threat",
      "Personality traits, such as being more sensitive to stress",
      "Trauma, chronic stress or major life changes",
    ],
    treatments: [
      {
        name: "Cognitive Behavioural Therapy (CBT)",
        description: "Helps a person recognise anxious thinking patterns and gradually face situations they avoid.",
      },
      {
        name: "Medication",
        description: "Antidepressants such as SSRIs are commonly used. Short-term anti-anxiety medicines are only used under close medical supervision.",
      },
      {
        name: "Everyday coping skills",
        description: "Breathing techniques, regular exercise, good sleep and less caffeine can reduce symptoms alongside treatment.",
      },
    ],
  },
  faq: [
    {
      question: "Is anxiety the same as stress or nerves?",
      answer: "Not exactly. Stress and nerves usually pass once the situation is over. An anxiety disorder involves worry or fear that is out of proportion, lasts for months and makes daily life harder.",
    },
    {
      question: "What causes anxiety disorders?",
      answer: "Usually a combination of factors: genetics, brain chemistry, personality, and life experiences such as trauma or long-term stress. It is never a sign of weakness.",
    },
    {
      question: "Can anxiety be cured, or only managed?",
      answer: "Many people recover fully, and most see major improvement with treatment. Anxiety may return during stressful periods, but the skills learned in therapy help people handle it.",
    },
    {
      question: "Do I need medication, or can therapy be enough?",
      answer: "For many people, therapy such as CBT is enough. Others do best with a combination of therapy and medication. A doctor or psychologist can help decide what fits you.",
    },
    {
      question: "Why does anxiety cause physical symptoms?",
      answer: "Anxiety activates the body's 'fight or flight' response. Stress hormones speed up the heart and breathing and tense the muscles, which is why anxiety can feel so physical.",
    },
    {
      question: "What is the difference between anxiety and a panic attack?",
      answer: "Anxiety tends to build gradually and can last a long time. A panic attack is a sudden wave of intense fear that peaks within minutes, often with a pounding heart, dizziness or a feeling of losing control.",
    },
  ],
  resources: {
    helplines: [helplines.sosVozAmiga, helplines.anxietyUk, helplines.namiHelpline],
    organizations: [
      {
        name: "ADAA — Anxiety & Depression Association of America",
        description: "Educational articles, webinars and a directory of therapists.",
        href: "https://adaa.org",
      },
      {
        name: "Anxiety Canada",
        description: "Free tools, worksheets and the MindShift CBT app.",
        href: "https://www.anxietycanada.com",
      },
      {
        name: "NIMH — Anxiety Disorders",
        description: "Research-based information on symptoms, causes and treatment.",
        href: "https://www.nimh.nih.gov/health/topics/anxiety-disorders",
      },
    ],
  },
  testimonials: [
    {
      name: "Jennifer Lawrence",
      knownFor: "Oscar-winning actor",
      photo: commonsPhoto("Causeway_02_(52359107768)_(cropped).jpg"),
      story: "Has said she was diagnosed with social anxiety as a child and that finding acting gave her a sense of purpose that helped her cope.",
      learnMoreHref: wikipedia("Jennifer_Lawrence"),
    },
    {
      name: "Emma Stone",
      knownFor: "Oscar-winning actor",
      photo: commonsPhoto("Emma_Stone_at_the_2025_Venice_Film_Festival-6313_(cropped).jpg"),
      story: "Has described having her first panic attack at age seven and living with anxiety through childhood. She credits therapy and acting classes with helping her.",
      learnMoreHref: wikipedia("Emma_Stone"),
    },
    {
      name: "Mardy Fish",
      knownFor: "Former top-10 tennis player",
      photo: commonsPhoto("Mardy_Fish_2010-08-03.JPG"),
      story: "Withdrew from a 2012 US Open match because of an anxiety disorder and panic attacks, and later spoke openly about his recovery to help other athletes.",
      learnMoreHref: wikipedia("Mardy_Fish"),
    },
    {
      name: "John Mayer",
      knownFor: "Grammy-winning musician",
      photo: commonsPhoto("JohnMayerin2019.jpg"),
      story: "Has talked about experiencing panic attacks and anxiety early in his career, and how understanding what was happening made it less frightening.",
      learnMoreHref: wikipedia("John_Mayer"),
    },
    {
      name: "Lena Dunham",
      knownFor: "Creator of the TV series Girls",
      photo: commonsPhoto("Lena_Dunham_at_Berlinale_2024.jpg"),
      story: "Has written about living with anxiety and OCD since childhood, and how therapy and medication have helped her manage it.",
      learnMoreHref: wikipedia("Lena_Dunham"),
    },
    {
      name: "Ryan Reynolds",
      knownFor: "Actor in Deadpool",
      photo: commonsPhoto("Deadpool_2_Japan_Premiere_Red_Carpet_Ryan_Reynolds_(cropped).jpg"),
      story: "Has spoken about living with anxiety since he was young, including nerves before public appearances, and encourages people to be kind to themselves and talk about it.",
      learnMoreHref: wikipedia("Ryan_Reynolds"),
    },
  ],
};
