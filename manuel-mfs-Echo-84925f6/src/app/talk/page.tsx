import type { Metadata } from "next";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { TalkChat } from "@/components/talk-chat";

export const metadata: Metadata = { title: "Talk" };

export default function TalkPage() {
  return (
    <>
      <PageHero
        eyebrow="Say it, hear it back"
        title="Talk to Echo."
        description="Tap the microphone or type how you are feeling. Echo will listen and suggest a resource from this site that could help. Echo is an AI guide, not a therapist."
        tone="blue"
      />
      <div className="page-shell py-12">
        <TalkChat />

        <div className="mt-10 flex gap-3 rounded-2xl bg-ochre-light p-5 text-sm leading-6">
          <ShieldAlert className="mt-0.5 size-5 shrink-0 text-terracotta" />
          <p>
            <strong>If you are in immediate danger or crisis:</strong> call 112, or SNS 24 on 808 24 24 24 (option 4).
            See <Link href="/help-now" className="font-bold text-terracotta">Help now</Link> for more options.
            Conversations are processed by ElevenLabs.
          </p>
        </div>
      </div>
    </>
  );
}
