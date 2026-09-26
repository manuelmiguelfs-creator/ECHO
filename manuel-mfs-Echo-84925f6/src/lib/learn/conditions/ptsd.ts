import { commonsPhoto, helplines, wikipedia } from "../shared";
import type { LearnEntry } from "../types";

export const ptsd: LearnEntry = {
  id: "ptsd",
  name: "Post-Traumatic Stress Disorder",
  shortName: "PTSD",
  tagline: "When the mind stays on alert long after a trauma — and how healing is possible.",
  accent: "pink",
  overview: {
    intro: [
      "Post-traumatic stress disorder (PTSD) can develop after experiencing or witnessing a traumatic event, such as violence, abuse, sexual assault, a serious accident, combat or the sudden loss of a loved one. It is diagnosed when symptoms last for more than a month and seriously affect daily life.",
      "Most people have strong reactions after a trauma, and many recover naturally. In PTSD, the brain stays stuck in 'danger mode'. Women are about twice as likely to develop PTSD as men. Repeated or long-lasting trauma can lead to complex PTSD, which also affects emotions and relationships.",
    ],
    keyFacts: [
      { label: "How common", value: "About 6 in 100 people at some point in life" },
      { label: "When it starts", value: "Usually within 3 months of a trauma, sometimes years later" },
      { label: "What helps most", value: "Trauma-focused therapy such as CPT, PE or EMDR" },
    ],
    symptoms: [
      "Reliving the trauma through flashbacks or intrusive memories",
      "Nightmares and trouble sleeping",
      "Avoiding reminders, places or conversations about the event",
      "Negative changes in mood, beliefs or feelings of guilt",
      "Feeling constantly on guard or easily startled",
      "Irritability, anger or difficulty concentrating",
    ],
    causes: [
      "The severity and type of the traumatic event",
      "Lack of social support after the trauma",
      "Previous trauma or mental health history",
      "Genetics and family history of mental health problems",
    ],
    treatments: [
      {
        name: "Trauma-focused talk therapy",
        description: "Cognitive Processing Therapy (CPT) and Prolonged Exposure (PE) help people process the trauma and reduce fear.",
      },
      {
        name: "EMDR",
        description: "Eye Movement Desensitisation and Reprocessing helps the brain reprocess traumatic memories so they feel less overwhelming.",
      },
      {
        name: "Medication",
        description: "Antidepressants such as SSRIs can reduce symptoms. A doctor decides if they are right for someone.",
      },
    ],
  },
  faq: [
    {
      question: "Does everyone who experiences trauma develop PTSD?",
      answer: "No. Most people who go through a trauma do not develop PTSD. Risk depends on the type of trauma, how severe it was, past experiences and how much support a person has afterwards.",
    },
    {
      question: "What is the difference between a normal reaction to trauma and PTSD?",
      answer: "Fear, shock and trouble sleeping are normal in the first weeks after a trauma. When symptoms last longer than a month and seriously affect daily life, it may be PTSD.",
    },
    {
      question: "Can PTSD appear years after the event?",
      answer: "Yes. Symptoms usually begin within three months, but sometimes they appear months or even years later, often triggered by a reminder or a new stressful event.",
    },
    {
      question: "Are flashbacks always like in the movies?",
      answer: "Not usually. Flashbacks can be vivid scenes, but they can also be sudden feelings, body sensations, sounds or smells that make a person feel as if the trauma is happening again.",
    },
    {
      question: "Does PTSD only happen to war veterans?",
      answer: "No. PTSD can affect anyone who has lived through trauma, including survivors of abuse, assault, accidents, disasters or violence. Veterans are just one group at higher risk.",
    },
    {
      question: "Can children develop PTSD?",
      answer: "Yes. Children can develop PTSD, and it may show up as bad dreams, clinginess, acting out the trauma in play, or changes in behaviour. Trauma-focused therapy can be adapted for them.",
    },
  ],
  resources: {
    helplines: [helplines.apav, helplines.rainn, helplines.veteransCrisisLine],
    organizations: [
      {
        name: "National Center for PTSD",
        description: "Guides, self-help tools and the free PTSD Coach app from the U.S. Department of Veterans Affairs.",
        href: "https://www.ptsd.va.gov",
      },
      {
        name: "NIMH — Post-Traumatic Stress Disorder",
        description: "Research-based information on symptoms, causes and treatment.",
        href: "https://www.nimh.nih.gov/health/topics/post-traumatic-stress-disorder-ptsd",
      },
      {
        name: "RAINN",
        description: "Support and information for survivors of sexual violence.",
        href: "https://www.rainn.org",
      },
    ],
  },
  testimonials: [
    {
      name: "Lady Gaga",
      knownFor: "Singer, songwriter and actor",
      photo: commonsPhoto("Lady_Gaga_at_Joe_Biden's_inauguration_(cropped_5).jpg"),
      story: "Revealed in 2016 that she lives with PTSD connected to being sexually assaulted at 19, and has spoken about therapy and the importance of kindness.",
      learnMoreHref: wikipedia("Lady_Gaga"),
    },
    {
      name: "Gabrielle Union",
      knownFor: "Actor and author",
      photo: commonsPhoto("Gabrielle_Union_at_the_2024_Toronto_International_Film_Festival_3_(cropped).jpg"),
      story: "Has spoken about living with PTSD after being raped at gunpoint at 19, and wrote about her healing and therapy in her memoir.",
      learnMoreHref: wikipedia("Gabrielle_Union"),
    },
    {
      name: "Prince Harry",
      knownFor: "Duke of Sussex and founder of the Invictus Games",
      photo: commonsPhoto("Prince_Harry_launching_the_2020_Invictus_Games_(cropped).jpg"),
      story: "Has talked about the unresolved trauma of losing his mother at 12, years of panic and anxiety, and showed an EMDR therapy session in a mental health documentary.",
      learnMoreHref: wikipedia("Prince_Harry,_Duke_of_Sussex"),
    },
    {
      name: "Terry Crews",
      knownFor: "Actor and former NFL player",
      photo: commonsPhoto("Terry_Crews_by_Gage_Skidmore_5.jpg"),
      story: "Has spoken about growing up with violence at home and being sexually assaulted as an adult, and about how therapy helped him face that trauma.",
      learnMoreHref: wikipedia("Terry_Crews"),
    },
    {
      name: "Ariana Grande",
      knownFor: "Singer and actor",
      photo: commonsPhoto("Ariana_Grande_promoting_Wicked_(2024).jpg"),
      story: "Shared that she developed PTSD after the 2017 bombing at her concert in Manchester, and has spoken about anxiety and the long process of healing.",
      learnMoreHref: wikipedia("Ariana_Grande"),
    },
    {
      name: "Darrell Hammond",
      knownFor: "Comedian, Saturday Night Live",
      photo: commonsPhoto("Darrell_Hammond_by_Gage_Skidmore.jpg"),
      story: "Was misdiagnosed for years before learning he had PTSD from severe childhood abuse. He shared his journey to recovery in his memoir and the documentary Cracked Up.",
      learnMoreHref: wikipedia("Darrell_Hammond"),
    },
  ],
};
