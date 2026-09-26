import type { Meeting } from "@/components/app-provider";

export const conditionColors: Record<string, string> = {
  ocd: "bg-terracotta-light text-[#713a2d]",
  depression: "bg-blue-soft text-[#1f424b]",
  schizophrenia: "bg-pink-soft text-[#6b2f3a]",
  anxiety: "bg-ochre-light text-[#543b0d]",
  ptsd: "bg-sage-light text-[#304529]",
  bipolar: "bg-cream text-ink",
};

export const conditionPinColors: Record<string, string> = {
  ocd: "#b85f45",
  depression: "#719faa",
  schizophrenia: "#c7848f",
  anxiety: "#d9a63e",
  ptsd: "#7f9a72",
  bipolar: "#29322d",
};

// Nominatim's usage policy allows at most one request per second.
export async function geocodeMeeting(place: string, city: string) {
  for (const query of [`${place}, ${city}`, city]) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=pt&q=${encodeURIComponent(query)}`;
    try {
      const response = await fetch(url, { headers: { "Accept-Language": "pt,en" } });
      const [hit] = (await response.json()) as { lat: string; lon: string }[];
      if (hit) return { lat: Number(hit.lat), lng: Number(hit.lon) };
    } catch {
      return null;
    }
    await new Promise((resolve) => setTimeout(resolve, 1100));
  }
  return null;
}

export function attendeeCount(meeting: Meeting, joined: boolean) {
  return meeting.attendees + (joined ? 1 : 0);
}

export function formatMeetingDate(dateTime: string) {
  const date = new Date(dateTime);
  return {
    day: date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }),
    time: date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
  };
}

export function mapsLink(meeting: Meeting) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${meeting.place}, ${meeting.city}`)}`;
}
