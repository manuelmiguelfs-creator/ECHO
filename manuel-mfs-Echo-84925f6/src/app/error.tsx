"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="page-shell grid min-h-[60vh] place-items-center py-20">
      <div className="max-w-lg rounded-[2rem] bg-paper p-10 text-center shadow-sm">
        <span className="text-5xl">🌧️</span>
        <h1 className="mt-5 font-display text-4xl font-semibold">Something did not load.</h1>
        <p className="mt-3 text-ink/60">Your local journal and quiz data have not been sent anywhere. Try loading this page again.</p>
        <Button type="button" onClick={reset} className="mt-6 rounded-full bg-ink text-white">Try again</Button>
      </div>
    </div>
  );
}
