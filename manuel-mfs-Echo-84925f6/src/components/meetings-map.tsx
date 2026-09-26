"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, Tooltip, useMap } from "react-leaflet";
import { CalendarDays, Clock, MapPin, UserRound, Users } from "lucide-react";
import { useApp, type Meeting } from "@/components/app-provider";
import { conditionById } from "@/lib/conditions";
import {
  attendeeCount,
  conditionColors,
  conditionPinColors,
  formatMeetingDate,
  geocodeMeeting,
} from "@/lib/meetings";

const PORTUGAL_BOUNDS: L.LatLngBoundsExpression = [
  [36.9, -9.6],
  [42.2, -6.2],
];

function pinIcon(color: string, joined: boolean, past: boolean) {
  return L.divIcon({
    className: "",
    iconSize: [34, 42],
    iconAnchor: [17, 40],
    tooltipAnchor: [0, -38],
    html: `
      <div style="position:relative;width:34px;height:42px;opacity:${past ? 0.45 : 1};filter:drop-shadow(0 6px 10px rgba(41,50,45,.28))">
        <svg width="34" height="42" viewBox="0 0 34 42" fill="none">
          <path d="M17 41C17 41 32 26.5 32 16.5C32 8.2 25.3 1.5 17 1.5C8.7 1.5 2 8.2 2 16.5C2 26.5 17 41 17 41Z" fill="${past ? "#9aa09b" : color}" stroke="#fffdf8" stroke-width="3"/>
        </svg>
        <span style="position:absolute;top:8px;left:9px;width:16px;height:16px;border-radius:999px;background:#fffdf8;display:grid;place-items:center;font:700 10px/1 sans-serif;color:${color}">${joined ? "✓" : ""}</span>
      </div>`,
  });
}

// The hover card is ~260px tall, so pins near the top edge open it below instead of above.
function placeTooltip(event: L.LeafletEvent) {
  const marker = event.target as L.Marker;
  const tooltip = marker.getTooltip();
  const map = (marker as unknown as { _map?: L.Map })._map;
  if (!tooltip || !map) return;
  const { y } = map.latLngToContainerPoint(marker.getLatLng());
  const below = y < 290;
  tooltip.options.direction = below ? "bottom" : "top";
  tooltip.options.offset = below ? L.point(0, 44) : L.point(0, 0);
  if (tooltip.isOpen()) tooltip.update();
}

function FitToMeetings({ meetings }: { meetings: Meeting[] }) {
  const map = useMap();
  const key = meetings.map((meeting) => `${meeting.id}:${meeting.lat}`).join("|");

  useEffect(() => {
    if (!meetings.length) {
      map.fitBounds(PORTUGAL_BOUNDS);
      return;
    }
    const bounds = L.latLngBounds(meetings.map((meeting) => [meeting.lat!, meeting.lng!]));
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
    // Refit only when the set of pinned meetings changes, not on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, map]);

  return null;
}

export default function MeetingsMap({ meetings, pastIds }: { meetings: Meeting[]; pastIds: string[] }) {
  const { joinedMeetings, setMeetingLocation } = useApp();
  const attempted = useRef(new Set<string>());

  const pinned = useMemo(
    () => meetings.filter((meeting) => meeting.lat !== undefined && meeting.lng !== undefined),
    [meetings],
  );
  const unlocated = meetings.filter((meeting) => meeting.lat === undefined);
  const missingKey = unlocated.map((meeting) => meeting.id).join("|");

  useEffect(() => {
    const missing = unlocated.filter((meeting) => !attempted.current.has(meeting.id));
    if (!missing.length) return;
    missing.forEach((meeting) => attempted.current.add(meeting.id));
    (async () => {
      for (const meeting of missing) {
        const coords = await geocodeMeeting(meeting.place, meeting.city);
        if (coords) setMeetingLocation(meeting.id, coords.lat, coords.lng);
        await new Promise((resolve) => setTimeout(resolve, 1100));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [missingKey]);

  return (
    <div className="isolate overflow-hidden rounded-[2rem] border border-ink/10 shadow-[0_20px_50px_rgba(41,50,45,0.06)]">
      <MapContainer
        bounds={PORTUGAL_BOUNDS}
        scrollWheelZoom={false}
        className="echo-map h-[480px] w-full bg-blue-soft/40"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitToMeetings meetings={pinned} />
        {pinned.map((meeting) => {
          const joined = joinedMeetings.includes(meeting.id);
          const past = pastIds.includes(meeting.id);
          return (
            <Marker
              key={meeting.id}
              position={[meeting.lat!, meeting.lng!]}
              icon={pinIcon(conditionPinColors[meeting.condition] ?? "#b85f45", joined, past)}
              eventHandlers={{ mouseover: placeTooltip, tooltipopen: placeTooltip }}
            >
              <Tooltip direction="top" opacity={1} className="echo-map-tooltip">
                <MeetingPreview meeting={meeting} joined={joined} past={past} />
              </Tooltip>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

function MeetingPreview({ meeting, joined, past }: { meeting: Meeting; joined: boolean; past: boolean }) {
  const { day, time } = formatMeetingDate(meeting.dateTime);
  const going = attendeeCount(meeting, joined);

  return (
    <div className="w-64 whitespace-normal p-4 font-sans text-ink">
      <div className="flex items-center justify-between gap-2">
        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${conditionColors[meeting.condition] ?? "bg-cream"}`}>
          {conditionById[meeting.condition]?.label ?? meeting.condition}
        </span>
        <span className="flex items-center gap-1 text-[11px] font-semibold text-ink/60">
          <Users className="size-3" /> {going} going
        </span>
      </div>
      <p className="mt-3 font-display text-lg font-semibold leading-tight">{meeting.place}</p>
      <p className="mt-0.5 flex items-center gap-1 text-xs text-ink/60">
        <MapPin className="size-3 text-terracotta" /> {meeting.city}
      </p>
      <div className="mt-3 flex gap-1.5 text-xs font-medium">
        <span className="flex items-center gap-1 rounded-lg bg-ochre-light/70 px-2 py-1">
          <CalendarDays className="size-3" /> {day}
        </span>
        <span className="flex items-center gap-1 rounded-lg bg-sage-light px-2 py-1">
          <Clock className="size-3" /> {time}
        </span>
      </div>
      {meeting.description && <p className="mt-3 line-clamp-3 text-xs leading-5 text-ink/65">{meeting.description}</p>}
      <p className="mt-3 flex items-center gap-1.5 border-t border-ink/10 pt-2.5 text-[11px] text-ink/55">
        <UserRound className="size-3" />
        {meeting.createdByMe ? "Created by you" : `Hosted by ${meeting.organizer}`}
        {joined && <span className="ml-auto font-semibold text-terracotta">You&apos;re going</span>}
        {past && <span className="ml-auto font-semibold">Already happened</span>}
      </p>
    </div>
  );
}
