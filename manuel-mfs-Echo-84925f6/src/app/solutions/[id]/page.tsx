import { notFound } from "next/navigation";
import { ActivityExperience } from "@/components/activity-experience";
import { solutions } from "@/lib/solutions";

export function generateStaticParams() {
  return solutions.map((solution) => ({ id: solution.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const solution = solutions.find((item) => item.id === id);
  return { title: solution?.name ?? "Activity" };
}

export default async function SolutionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const solution = solutions.find((item) => item.id === id);
  if (!solution) notFound();
  return <ActivityExperience solution={solution} />;
}
