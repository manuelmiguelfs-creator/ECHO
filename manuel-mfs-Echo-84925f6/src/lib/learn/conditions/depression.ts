import { commonsPhoto, helplines, wikipedia } from "../shared";
import type { LearnEntry } from "../types";

export const depression: LearnEntry = {
  id: "depression",
  name: "Depression",
  shortName: "Depression",
  tagline: "More than sadness — a real, common and treatable health condition.",
  accent: "sage",
  overview: {
    intro: [
      "Depression (also called major depressive disorder) is a common mental health condition that affects how a person feels, thinks and handles daily life. It is more than feeling sad for a few days: symptoms last for at least two weeks and affect sleep, appetite, work, school and relationships.",
      "Depression can affect anyone, at any age. Women are about 1.5 times more likely to experience it than men. Some people have 'high-functioning' depression — they keep going to work or school while struggling inside — which can make it harder to notice and ask for help.",
    ],
    keyFacts: [
      { label: "How common", value: "About 5 in 100 adults worldwide" },
      { label: "When it starts", value: "At any age, often first appearing in the teens or 20s" },
      { label: "What helps most", value: "Therapy, medication, or a combination of both" },
    ],
    symptoms: [
      "Persistent sadness, emptiness or irritability",
      "Loss of interest or pleasure in activities",
      "Fatigue and low energy",
      "Difficulty concentrating or making decisions",
      "Changes in sleep or appetite",
      "Hopelessness, guilt or thoughts of death",
    ],
    causes: [
      "Genetics and family history",
      "Brain chemistry and other biological factors",
      "Trauma, loss of a loved one or difficult relationships",
      "Ongoing stress and stressful life situations",
    ],
    treatments: [
      {
        name: "Psychotherapy",
        description: "Talking therapies such as CBT help people change negative thinking patterns and build coping skills.",
      },
      {
        name: "Medication",
        description: "Antidepressants can help, especially for moderate or severe depression. A doctor decides if they are right for someone.",
      },
      {
        name: "Lifestyle and peer support",
        description: "Physical activity, regular sleep, routine and connecting with others support recovery alongside treatment.",
      },
    ],
  },
  faq: [
    {
      question: "Is depression just feeling sad?",
      answer: "No. Sadness is a normal emotion that passes. Depression lasts at least two weeks and affects energy, sleep, concentration and interest in life. Some people with depression feel numb or irritable rather than sad.",
    },
    {
      question: "What causes depression? Is it my fault?",
      answer: "It is not your fault. Depression comes from a mix of genetic, biological, psychological and life factors. It is a health condition, not a personal failure.",
    },
    {
      question: "Can depression be treated?",
      answer: "Yes. Depression is one of the most treatable mental health conditions. Most people improve with therapy, medication or both, though finding the right approach can take time.",
    },
    {
      question: "Is depression the same as being lazy?",
      answer: "No. Depression drains energy and motivation as a symptom of the illness. People with depression often want to do things but find it genuinely hard to start.",
    },
    {
      question: "Can someone have depression and still function normally?",
      answer: "Yes. Some people keep up with work, school and social life while struggling inside. This is sometimes called high-functioning depression, and it deserves care just as much.",
    },
    {
      question: "When should someone seek professional help?",
      answer: "If low mood lasts more than two weeks, or it affects daily life, it is worth talking to a doctor or psychologist. If you have thoughts of suicide or self-harm, contact a crisis line or emergency services right away.",
    },
  ],
  resources: {
    helplines: [helplines.sosVozAmiga, helplines.samaritans, helplines.crisisTextLine],
    organizations: [
      {
        name: "NIMH — Depression",
        description: "Research-based information on symptoms, causes and treatment.",
        href: "https://www.nimh.nih.gov/health/topics/depression",
      },
      {
        name: "WHO — Depression fact sheet",
        description: "Global facts, figures and guidance on depression.",
        href: "https://www.who.int/news-room/fact-sheets/detail/depression",
      },
      {
        name: "Psychology Today — Find a therapist",
        description: "Search for therapists and psychologists near you.",
        href: "https://www.psychologytoday.com/us/therapists",
      },
    ],
  },
  testimonials: [
    {
      name: "Dwayne Johnson",
      knownFor: "Actor and former wrestler",
      photo: commonsPhoto("Dwayne_Johnson-1764_(4x5_cropped_with_moderate_headroom).jpg"),
      story: "Has spoken about several periods of depression, including after his football career ended, and has encouraged men in particular to talk about how they feel.",
      learnMoreHref: wikipedia("Dwayne_Johnson"),
    },
    {
      name: "Lady Gaga",
      knownFor: "Singer, songwriter and actor",
      photo: commonsPhoto("Lady_Gaga_at_Joe_Biden's_inauguration_(cropped_5).jpg"),
      story: "Has talked openly about living with depression and anxiety, and co-founded the Born This Way Foundation to support young people's mental health.",
      learnMoreHref: wikipedia("Lady_Gaga"),
    },
    {
      name: "J.K. Rowling",
      knownFor: "Author of Harry Potter",
      photo: commonsPhoto("J._K._Rowling_2010.jpg"),
      story: "Has described experiencing clinical depression in her twenties, getting help through therapy, and how that experience inspired the Dementors in Harry Potter.",
      learnMoreHref: wikipedia("J._K._Rowling"),
    },
    {
      name: "Bruce Springsteen",
      knownFor: "Rock musician",
      photo: commonsPhoto("Bruce_Springsteen_Springsteen-79_(cropped).jpg"),
      story: "Wrote in his memoir Born to Run about decades of struggling with depression, and how therapy and treatment helped him keep going.",
      learnMoreHref: wikipedia("Bruce_Springsteen"),
    },
    {
      name: "Kristen Bell",
      knownFor: "Actor in Frozen and The Good Place",
      photo: commonsPhoto("Kristen_Bell_at_Televerse_2025.jpg"),
      story: "Has written about living with depression and anxiety, taking medication, and wanting to remove the shame that stops people from asking for help.",
      learnMoreHref: wikipedia("Kristen_Bell"),
    },
    {
      name: "Michael Phelps",
      knownFor: "Most decorated Olympian of all time",
      photo: commonsPhoto("Michael_Phelps_Rio_Olympics_2016.jpg"),
      story: "Has described bouts of depression after the Olympics, including a period of suicidal thoughts, and how therapy saved his life. He now campaigns for mental health care.",
      learnMoreHref: wikipedia("Michael_Phelps"),
    },
  ],
};
