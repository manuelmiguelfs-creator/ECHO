"use client";

import { LockKeyhole } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApp, type Submission } from "@/components/app-provider";

const statuses: Submission["status"][] = ["Submitted", "Under review", "Approved", "Rejected"];

export default function ModerationPage() {
  const { submissions, updateSubmissionStatus } = useApp();
  return (
    <>
      <PageHero eyebrow="Administrative prototype" title="Community moderation" description="Review locally stored submissions and move them through a moderation workflow. This route is not linked from the public navigation." tone="blue" />
      <div className="page-shell py-12">
        <div className="mb-8 flex gap-3 rounded-2xl bg-ochre-light p-5 text-sm leading-6"><LockKeyhole className="mt-0.5 size-5 shrink-0" /><p><strong>Privacy boundary:</strong> this first version stores submissions only in this browser. Production deployment requires authenticated, role-based server access before accepting real personal data. Approval changes status only; it does not automatically publish content.</p></div>
        {submissions.length ? <div className="space-y-5">{submissions.map((submission) => <article key={submission.id} className="rounded-2xl bg-paper p-6 shadow-sm"><div className="flex flex-wrap items-start justify-between gap-4"><div><Badge>{submission.status}</Badge><h2 className="mt-3 font-display text-2xl font-semibold">{submission.solutionName}</h2><p className="mt-1 text-sm text-ink/50">Submitted by {submission.fullName} · {submission.ageRange}</p></div><p className="text-sm text-ink/50">{new Date(submission.submittedAt).toLocaleDateString()}</p></div><p className="mt-5 leading-7 text-ink/70">{submission.description}</p><div className="mt-4 flex flex-wrap gap-2">{submission.source.map((item) => <Badge key={item} variant="outline">{item}</Badge>)}{submission.category.map((item) => <Badge key={item} variant="outline">{item}</Badge>)}</div><details className="mt-5 rounded-xl bg-cream p-4 text-sm"><summary className="cursor-pointer font-semibold">Private reviewer data</summary><p className="mt-3">{submission.email}</p></details><div className="mt-5 flex flex-wrap gap-2">{statuses.map((status) => <Button key={status} type="button" size="sm" variant={submission.status === status ? "default" : "outline"} className="rounded-full" onClick={() => updateSubmissionStatus(submission.id, status)}>{status}</Button>)}</div></article>)}</div> : <div className="rounded-3xl border border-dashed border-ink/20 p-12 text-center"><p className="text-4xl">📭</p><h2 className="mt-4 font-display text-3xl font-semibold">No local submissions</h2><p className="mt-2 text-ink/60">Community suggestions made on this device will appear here.</p></div>}
      </div>
    </>
  );
}
