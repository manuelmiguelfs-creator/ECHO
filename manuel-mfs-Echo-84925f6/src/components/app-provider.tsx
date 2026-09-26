"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Category } from "@/lib/solutions";
import { normalizeConditionIds, type ConditionId } from "@/lib/conditions";

export type QuizData = {
  fullName: string;
  conditions: string[];
  symptomsDuration: string;
  attackDuration: string;
  outsideScore: number;
  insideScore: number;
  mentalScore: number;
  updatedAt: string;
};

export type JournalEntry = {
  id: string;
  date: string;
  description: string;
  emotions: string[];
  activities: string[];
  notes?: string;
  completed: boolean;
  createdAt: string;
};

export type Submission = {
  id: string;
  fullName: string;
  ageRange: string;
  email: string;
  source: string[];
  category: string[];
  solutionName: string;
  description: string;
  status: "Submitted" | "Under review" | "Approved" | "Rejected";
  submittedAt: string;
};

export type Meeting = {
  id: string;
  organizer: string;
  condition: ConditionId;
  city: string;
  place: string;
  dateTime: string;
  description?: string;
  attendees: number;
  createdByMe?: boolean;
  createdAt: string;
  lat?: number;
  lng?: number;
};

type AppState = {
  quiz: QuizData | null;
  setQuiz: (quiz: QuizData) => void;
  scores: Record<Category, number> | null;
  journal: JournalEntry[];
  addJournalEntry: (entry: Omit<JournalEntry, "id" | "createdAt">) => void;
  updateJournalEntry: (entry: JournalEntry) => void;
  deleteJournalEntry: (id: string) => void;
  completedSolutions: string[];
  toggleSolution: (id: string) => void;
  submissions: Submission[];
  addSubmission: (submission: Omit<Submission, "id" | "status" | "submittedAt">) => void;
  updateSubmissionStatus: (id: string, status: Submission["status"]) => void;
  meetings: Meeting[];
  joinedMeetings: string[];
  addMeeting: (meeting: Omit<Meeting, "id" | "attendees" | "createdByMe" | "createdAt">) => void;
  toggleMeeting: (id: string) => void;
  setMeetingLocation: (id: string, lat: number, lng: number) => void;
  hydrated: boolean;
};

const AppContext = createContext<AppState | null>(null);

const starterJournal: JournalEntry[] = [
  {
    id: "example-1",
    date: "2026-04-20",
    description: "Example entry: a difficult moment recorded for reflection.",
    emotions: ["Loneliness", "Confusion", "Frustration", "Anger"],
    activities: ["sudoku", "breathing-4812"],
    completed: true,
    createdAt: "2026-04-20T12:00:00.000Z",
  },
  {
    id: "example-2",
    date: "",
    description: "Example entry without a date.",
    emotions: ["Guilt", "Anxiety"],
    activities: ["breathing-4812", "delay-compulsion"],
    completed: false,
    createdAt: "2026-04-19T12:00:00.000Z",
  },
  {
    id: "example-3",
    date: "2026-04-14",
    description: "Example entry: used an outdoor and an indoor activity.",
    emotions: ["Frustration", "Relief (brief)"],
    activities: ["touch-living-being", "funny-desk"],
    completed: true,
    createdAt: "2026-04-14T12:00:00.000Z",
  },
];

const starterMeetings: Meeting[] = [
  {
    id: "meet-1",
    organizer: "Marta Silva",
    condition: "ocd",
    city: "Seixal",
    place: "Parque Urbano do Seixal",
    dateTime: "2026-10-10T10:30",
    description: "A relaxed walk and chat by the river. Come as you are — no need to share more than you want.",
    attendees: 6,
    createdAt: "2026-09-20T12:00:00.000Z",
    lat: 38.6378,
    lng: -9.1036,
  },
  {
    id: "meet-2",
    organizer: "João Ferreira",
    condition: "anxiety",
    city: "Lisboa",
    place: "Jardim da Estrela",
    dateTime: "2026-10-12T17:00",
    description: "Small picnic group. We'll bring tea and some card games to keep things light.",
    attendees: 9,
    createdAt: "2026-09-21T12:00:00.000Z",
    lat: 38.7141,
    lng: -9.1597,
  },
  {
    id: "meet-3",
    organizer: "Inês Costa",
    condition: "depression",
    city: "Almada",
    place: "Jardim do Castelo de Almada",
    dateTime: "2026-10-18T15:00",
    description: "Sunday afternoon coffee and conversation about the small things that help us get through the week.",
    attendees: 4,
    createdAt: "2026-09-22T12:00:00.000Z",
    lat: 38.6868,
    lng: -9.1562,
  },
  {
    id: "meet-4",
    organizer: "Rui Almeida",
    condition: "ocd",
    city: "Lisboa",
    place: "Parque Eduardo VII",
    dateTime: "2026-10-24T11:00",
    description: "Open circle to talk about living with OCD day to day, and what has worked for each of us.",
    attendees: 11,
    createdAt: "2026-09-23T12:00:00.000Z",
    lat: 38.7292,
    lng: -9.1545,
  },
  {
    id: "meet-5",
    organizer: "Sofia Martins",
    condition: "ptsd",
    city: "Setúbal",
    place: "Parque do Bonfim",
    dateTime: "2026-10-25T16:00",
    description: "Quiet, gentle meetup in a calm spot. Leaving early is always fine.",
    attendees: 3,
    createdAt: "2026-09-24T12:00:00.000Z",
    lat: 38.5285,
    lng: -8.8876,
  },
  {
    id: "meet-6",
    organizer: "Tiago Rocha",
    condition: "bipolar",
    city: "Porto",
    place: "Parque da Cidade do Porto",
    dateTime: "2026-10-17T10:00",
    description: "Morning walk towards the sea, then a coffee. A space to share how we keep balance through the ups and downs.",
    attendees: 5,
    createdAt: "2026-09-24T15:00:00.000Z",
    lat: 41.1685,
    lng: -8.6776,
  },
  {
    id: "meet-7",
    organizer: "Beatriz Lopes",
    condition: "schizophrenia",
    city: "Seixal",
    place: "Quinta da Princesa",
    dateTime: "2026-10-31T15:30",
    description: "Calm conversation under the trees of the park. Family members and friends are welcome too.",
    attendees: 4,
    createdAt: "2026-09-25T10:00:00.000Z",
    lat: 38.6335,
    lng: -9.1306,
  },
];

function mergeStarterMeetings(saved: Meeting[]) {
  const starterById = new Map(starterMeetings.map((meeting) => [meeting.id, meeting]));
  const merged = saved.map((meeting) => starterById.get(meeting.id) ?? meeting);
  const savedIds = new Set(saved.map((meeting) => meeting.id));
  return [...merged, ...starterMeetings.filter((meeting) => !savedIds.has(meeting.id))];
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [quiz, setQuizState] = useState<QuizData | null>(null);
  const [journal, setJournal] = useState<JournalEntry[]>(starterJournal);
  const [completedSolutions, setCompletedSolutions] = useState<string[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>(starterMeetings);
  const [joinedMeetings, setJoinedMeetings] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const raw = localStorage.getItem("echo-app-state");
        if (raw) {
          const saved = JSON.parse(raw);
          const savedQuiz = saved.quiz;
          setQuizState(
            savedQuiz
              ? {
                  ...savedQuiz,
                  conditions: normalizeConditionIds(
                    savedQuiz.conditions ??
                      (savedQuiz.condition ? [savedQuiz.condition] : []),
                  ),
                }
              : null,
          );
          setJournal(saved.journal ?? starterJournal);
          setCompletedSolutions(saved.completedSolutions ?? []);
          setSubmissions(saved.submissions ?? []);
          setMeetings(saved.meetings ? mergeStarterMeetings(saved.meetings) : starterMeetings);
          setJoinedMeetings(saved.joinedMeetings ?? []);
        }
      } catch {
        // Keep safe local defaults when stored data is malformed.
      }
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      "echo-app-state",
      JSON.stringify({ quiz, journal, completedSolutions, submissions, meetings, joinedMeetings }),
    );
  }, [quiz, journal, completedSolutions, submissions, meetings, joinedMeetings, hydrated]);

  const value = useMemo<AppState>(
    () => ({
      quiz,
      setQuiz: setQuizState,
      scores: quiz
        ? {
            Outside: quiz.outsideScore,
            Inside: quiz.insideScore,
            Mental: quiz.mentalScore,
          }
        : null,
      journal,
      addJournalEntry: (entry) =>
        setJournal((current) => [
          {
            ...entry,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
          },
          ...current,
        ]),
      updateJournalEntry: (entry) =>
        setJournal((current) => current.map((item) => (item.id === entry.id ? entry : item))),
      deleteJournalEntry: (id) =>
        setJournal((current) => current.filter((entry) => entry.id !== id)),
      completedSolutions,
      toggleSolution: (id) =>
        setCompletedSolutions((current) =>
          current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
        ),
      submissions,
      addSubmission: (submission) =>
        setSubmissions((current) => [
          {
            ...submission,
            id: crypto.randomUUID(),
            status: "Submitted",
            submittedAt: new Date().toISOString(),
          },
          ...current,
        ]),
      updateSubmissionStatus: (id, status) =>
        setSubmissions((current) =>
          current.map((submission) => (submission.id === id ? { ...submission, status } : submission)),
        ),
      meetings,
      joinedMeetings,
      addMeeting: (meeting) => {
        const id = crypto.randomUUID();
        setMeetings((current) => [
          { ...meeting, id, attendees: 0, createdByMe: true, createdAt: new Date().toISOString() },
          ...current,
        ]);
        setJoinedMeetings((current) => [...current, id]);
      },
      toggleMeeting: (id) =>
        setJoinedMeetings((current) =>
          current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
        ),
      setMeetingLocation: (id, lat, lng) =>
        setMeetings((current) => current.map((meeting) => (meeting.id === id ? { ...meeting, lat, lng } : meeting))),
      hydrated,
    }),
    [quiz, journal, completedSolutions, submissions, meetings, joinedMeetings, hydrated],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}
