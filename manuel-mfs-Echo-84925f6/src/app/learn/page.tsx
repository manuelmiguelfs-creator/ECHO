import { Suspense } from "react";
import { LearnExperience } from "@/components/learn/learn-experience";

export const metadata = { title: "Learn" };

export default function LearnPage() {
  return (
    <Suspense>
      <LearnExperience />
    </Suspense>
  );
}
