"use client";

import { CalendarDays, Check, Clock, MapPin, UserRound, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp, type Meeting } from "@/components/app-provider";
import { conditionById } from "@/lib/conditions";
import { attendeeCount, conditionColors, formatMeetingDate, mapsLink } from "@/lib/meetings";

export function MeetingCard({ meeting, isPast = false }: { meeting: Meeting; isPast?: boolean }) {
  const { joinedMeetings, toggleMeeting } = useApp();
  const joined = joinedMeetings.includes(meeting.id);
  const going = attendeeCount(meeting, joined);
  const { day, time } = formatMeetingDate(meeting.dateTime);
  const conditionLabel = conditionById[meeting.condition]?.label ?? meeting.condition;

  return (
    <article
      className={`flex flex-col rounded-[1.75rem] border bg-paper p-6 transition ${
        joined ? "border-terracotta/50 shadow-md ring-1 ring-terracotta/20" : "border-ink/10 hover:-translate-y-1 hover:shadow-lg"
      } ${isPast ? "opacity-60" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${conditionColors[meeting.condition] ?? "bg-cream text-ink"}`}>
          {conditionLabel}
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-cream px-3 py-1 text-xs font-semibold text-ink/70">
          <Users className="size-3.5" />
          {going} {going === 1 ? "person" : "people"} going
        </span>
      </div>

      <a
        href={mapsLink(meeting)}
        target="_blank"
        rel="noreferrer"
        className="mt-5 font-display text-2xl font-semibold leading-tight hover:text-terracotta"
      >
        {meeting.place}
      </a>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-ink/60">
        <MapPin className="size-3.5 text-terracotta" /> {meeting.city}
      </p>

      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <span className="flex items-center gap-1.5 rounded-xl bg-ochre-light/60 px-3 py-1.5 font-medium">
          <CalendarDays className="size-4 text-ink/60" /> {day}
        </span>
        <span className="flex items-center gap-1.5 rounded-xl bg-sage-light/70 px-3 py-1.5 font-medium">
          <Clock className="size-4 text-ink/60" /> {time}
        </span>
      </div>

      {meeting.description && <p className="mt-4 line-clamp-3 text-sm leading-6 text-ink/65">{meeting.description}</p>}

      <div className="min-h-6 flex-1" />
      <div className="flex items-center justify-between gap-3 border-t border-ink/10 pt-5">
        <span className="flex items-center gap-2 text-xs text-ink/55">
          <UserRound className="size-4" />
          {meeting.createdByMe ? "Created by you" : `Hosted by ${meeting.organizer}`}
        </span>
        {isPast ? (
          <span className="text-xs font-semibold text-ink/50">Already happened</span>
        ) : (
          <Button
            type="button"
            onClick={() => toggleMeeting(meeting.id)}
            className={`h-10 rounded-full px-5 ${
              joined ? "bg-sage-light text-ink hover:bg-pink-soft" : "bg-terracotta text-white hover:bg-ink"
            }`}
          >
            {joined ? (
              <>
                <Check className="size-4" /> Going
              </>
            ) : (
              "Join"
            )}
          </Button>
        )}
      </div>
    </article>
  );
}
