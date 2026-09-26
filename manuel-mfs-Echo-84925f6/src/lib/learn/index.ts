import type { ConditionId } from "@/lib/conditions";
import { anxiety } from "./conditions/anxiety";
import { bipolar } from "./conditions/bipolar";
import { depression } from "./conditions/depression";
import { ocd } from "./conditions/ocd";
import { ptsd } from "./conditions/ptsd";
import { schizophrenia } from "./conditions/schizophrenia";
import type { LearnEntry } from "./types";

export type { LearnEntry } from "./types";
export { emergencyLines } from "./shared";

/** Every condition offered in the quiz must have a Learn entry. */
export const learnLibrary: Record<ConditionId, LearnEntry> = {
  ocd,
  depression,
  schizophrenia,
  anxiety,
  ptsd,
  bipolar,
};
export const learnSections = [
  { id: "overview", label: "Overview" },
  { id: "faq", label: "FAQ" },
  { id: "resources", label: "Useful resources" },
  { id: "testimonials", label: "Testimonials" },
] as const;

export type LearnSectionId = (typeof learnSections)[number]["id"];
