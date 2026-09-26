"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Category } from "@/lib/solutions";

export type QuizData = {
  fullName: string;
  yearsWithOCD: string;
  compulsionDuration: string;
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

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [quiz, setQuizState] = useState<QuizData | null>(null);
  const [journal, setJournal] = useState<JournalEntry[]>(starterJournal);
  const [completedSolutions, setCompletedSolutions] = useState<string[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const raw = localStorage.getItem("echo-app-state");
        if (raw) {
          const saved = JSON.parse(raw);
          setQuizState(saved.quiz ?? null);
          setJournal(saved.journal ?? starterJournal);
          setCompletedSolutions(saved.completedSolutions ?? []);
          setSubmissions(saved.submissions ?? []);
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
      JSON.stringify({ quiz, journal, completedSolutions, submissions }),
    );
  }, [quiz, journal, completedSolutions, submissions, hydrated]);

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
      hydrated,
    }),
    [quiz, journal, completedSolutions, submissions, hydrated],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}
