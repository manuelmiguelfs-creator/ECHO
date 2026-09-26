import { emergencyLines, learnLibrary } from "@/lib/learn";
import type { Helpline } from "@/lib/learn/types";
import { solutions } from "@/lib/solutions";

const helpline = (h: Helpline) => `- ${h.name} (${h.region}): ${h.contact}. ${h.description}`;

export function GET() {
  const sections: string[] = [
    "# Echo website knowledge base",
    "## Emergency and crisis lines",
    ...emergencyLines.map(helpline),
  ];

  for (const c of Object.values(learnLibrary)) {
    sections.push(
      `## ${c.name}`,
      c.tagline,
      ...c.overview.intro,
      "### Key facts",
      ...c.overview.keyFacts.map((f) => `- ${f.label}: ${f.value}`),
      "### Symptoms",
      ...c.overview.symptoms.map((s) => `- ${s}`),
      "### Causes",
      ...c.overview.causes.map((s) => `- ${s}`),
      "### Treatments",
      ...c.overview.treatments.map((t) => `- ${t.name}: ${t.description}`),
      "### FAQ",
      ...c.faq.map((f) => `Q: ${f.question}\nA: ${f.answer}`),
      "### Helplines",
      ...c.resources.helplines.map(helpline),
      "### Organizations",
      ...c.resources.organizations.map((o) => `- ${o.name}: ${o.description} (${o.href})`),
      "### Public figures who have spoken about it",
      ...c.testimonials.map((t) => `- ${t.name} (${t.knownFor}): ${t.story}`),
    );
  }

  sections.push("## Support activities on the Solutions page");
  for (const s of solutions) {
    sections.push(
      `### ${s.name} (${s.category}, ${s.duration}) — page: /solutions/${s.id}`,
      s.description,
      ...s.instructions.map((i) => `- ${i}`),
      ...(s.safetyNote ? [`Safety note: ${s.safetyNote}`] : []),
    );
  }

  return new Response(sections.join("\n\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
