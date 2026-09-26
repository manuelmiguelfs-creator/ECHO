"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/logo-mark";
import { useApp } from "@/components/app-provider";

const links = [
  { href: "/learn", label: "Learn" },
  { href: "/solutions", label: "Solutions" },
  { href: "/journal", label: "Journal" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { quiz } = useApp();
  const [open, setOpen] = useState(false);
  const hasQuiz = Boolean(quiz?.conditions?.length);
  const visibleLinks = hasQuiz ? links : [];

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <LogoMark className="size-11 shrink-0 drop-shadow-sm transition-transform group-hover:rotate-3" />
          <span>
            <span className="block font-display text-2xl font-semibold leading-none text-ink">Echo</span>
            <span className="block text-[10px] font-bold uppercase tracking-[.18em] text-ink/55">
              Say it, hear it back
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {visibleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                pathname.startsWith(link.href)
                  ? "bg-white text-terracotta shadow-sm"
                  : "text-ink/70 hover:bg-white/70 hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" className="rounded-full">
            <Link href="/quiz">Take the quiz</Link>
          </Button>
          {hasQuiz && <Button asChild className="rounded-full bg-ink text-white hover:bg-terracotta">
            <Link href="/help-now">I need help now</Link>
          </Button>}
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="grid size-11 place-items-center rounded-full border border-ink/15 bg-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-ink/10 bg-cream px-5 py-5 lg:hidden" aria-label="Mobile navigation">
          <div className="mx-auto grid max-w-7xl gap-1">
            {visibleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-semibold text-ink hover:bg-white"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button asChild variant="outline" className="rounded-full bg-white">
                <Link href="/quiz" onClick={() => setOpen(false)}>Take the quiz</Link>
              </Button>
              <Button asChild className="rounded-full bg-ink text-white">
                <Link href="/help-now" onClick={() => setOpen(false)}>Help now</Link>
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
