export type Category = "Outside" | "Inside" | "Mental";

export type ReflectionField = {
  id: string;
  label: string;
  type?: "text" | "number" | "textarea";
};

export type Solution = {
  id: string;
  name: string;
  shortName?: string;
  category: Category;
  duration: string;
  durationMinutes: number;
  description: string;
  instructions: string[];
  reflectionFields?: ReflectionField[];
  timerSeconds?: number;
  special?: "observations" | "bus" | "grounding" | "sudoku";
  safetyNote?: string;
  links?: { label: string; href: string }[];
};

export const solutions: Solution[] = [
  {
    id: "twenty-minute-walk",
    name: "Take a 20 minute walk outside",
    category: "Outside",
    duration: "20 min",
    durationMinutes: 20,
    description: "Move gently and reconnect with the world around you.",
    instructions: [
      "Take a comfortable 20-minute walk in a safe area.",
      "Notice trees, plants, animals, sounds, people, and interesting details.",
      "If it feels safe, put your phone away and attend to your breathing, movement, and surroundings.",
    ],
    safetyNote: "Choose a safe, familiar route and turn back at any time.",
  },
  {
    id: "count-what-you-see",
    name: "Choose a spot outside and count all the things you can see",
    shortName: "Count what you can see",
    category: "Outside",
    duration: "15 min",
    durationMinutes: 15,
    description: "Turn observation into a gentle present-moment challenge.",
    instructions: [
      "Choose a comfortable outdoor spot.",
      "Slowly notice objects, colors, shapes, and small details.",
      "Keep finding one more thing at a time, without rushing.",
    ],
    special: "observations",
  },
  {
    id: "touch-living-being",
    name: "Go outside and touch the first living being you see that is not human",
    shortName: "Notice a living thing",
    category: "Outside",
    duration: "15 min",
    durationMinutes: 15,
    description: "Safely notice the texture and temperature of a tree or plant.",
    instructions: [
      "Go outside and slowly approach a tree or plant that is clearly safe to touch.",
      "Notice its texture and temperature for a few breaths.",
      "An animal is only appropriate if it is known to you, calm, and safe to approach.",
    ],
    reflectionFields: [{ id: "touched", label: "What did you touch?" }],
    safetyNote:
      "Never touch an unfamiliar animal, unknown plant, or anything unsafe. Observing without touching still completes the activity.",
  },
  {
    id: "watch-a-cloud",
    name: "Go outside, focus on a cloud and describe what it looks like",
    shortName: "Watch a cloud",
    category: "Outside",
    duration: "15 min",
    durationMinutes: 15,
    description: "Let shapes appear without deciding whether they are right or wrong.",
    instructions: [
      "Find a comfortable place and choose one cloud.",
      "Notice shapes that resemble animals, objects, faces, or anything else.",
      "Observe without judging your interpretation.",
    ],
    reflectionFields: [{ id: "cloud", label: "What did you see?", type: "textarea" }],
  },
  {
    id: "walk-until-bus",
    name: "Walk outside until you see a bus",
    shortName: "Spot a bus",
    category: "Outside",
    duration: "15 min",
    durationMinutes: 15,
    description: "Make a short, safe walk feel like a small mission.",
    instructions: [
      "Walk in a safe and comfortable direction.",
      "Look for a bus on the road, at a stop, or parked.",
      "Notice streets, buildings, and people along the way.",
      "Stop after 15 minutes even if no bus appears—the walk still counts.",
    ],
    special: "bus",
    safetyNote: "Stay on safe routes and do not cross roads or extend the walk just to complete the goal.",
  },
  {
    id: "bin-five-things",
    name: "Put 5 things in the bin",
    category: "Inside",
    duration: "5 min",
    durationMinutes: 5,
    description: "Let go of five small things you clearly no longer need.",
    instructions: [
      "Choose five small objects that are definitely rubbish or recycling.",
      "Discard each one slowly, noticing the simple decision.",
      "Do not throw away anything valuable or uncertain.",
    ],
    reflectionFields: Array.from({ length: 5 }, (_, i) => ({
      id: `item-${i + 1}`,
      label: `Item ${i + 1}`,
    })),
  },
  {
    id: "movement-repetitions",
    name: "Do 20–30 squats, push-ups, or wall-pushes",
    shortName: "Try gentle movement",
    category: "Inside",
    duration: "10 min",
    durationMinutes: 10,
    description: "Use comfortable movement to shift your attention to your body.",
    instructions: [
      "Choose squats, push-ups, or wall-pushes.",
      "Do up to 20–30 repetitions at your own comfortable pace.",
      "Focus on breathing, posture, and how your muscles feel.",
    ],
    safetyNote: "Stop if you feel pain, dizziness, or discomfort. Fewer repetitions are completely fine.",
  },
  {
    id: "cold-water",
    name: "Splash cold water on your face or hands",
    category: "Inside",
    duration: "5 min",
    durationMinutes: 5,
    description: "Notice a clear, cool sensation for a few moments.",
    instructions: [
      "Splash comfortably cool—not painfully cold—water on your face or hands.",
      "Notice the temperature and sensation on your skin.",
      "Take a natural breath afterward.",
    ],
  },
  {
    id: "hold-something-cold",
    name: "Hold something cold",
    category: "Inside",
    duration: "10 min",
    durationMinutes: 10,
    description: "Follow temperature and texture as an object gradually warms.",
    instructions: [
      "Hold a cool object such as a chilled water bottle or cold spoon.",
      "If using an ice pack, wrap it in cloth first.",
      "Notice its temperature, texture, and gradual change.",
    ],
    safetyNote: "Avoid direct ice contact and stop if your skin hurts or becomes numb.",
  },
  {
    id: "shake-it-off",
    name: "Shake your arms and legs",
    category: "Inside",
    duration: "1 min",
    durationMinutes: 1,
    description: "Move loosely for one minute and notice how your body feels.",
    instructions: [
      "Stand where you have space and support if needed.",
      "Gently shake your arms and legs as if shaking off water.",
      "Continue for up to 60 seconds.",
    ],
    timerSeconds: 60,
    safetyNote: "Move gently and stop if you feel pain, dizzy, or unsteady.",
  },
  {
    id: "room-laps",
    name: "Stand up and walk around the room 20 times",
    shortName: "Walk around the room",
    category: "Inside",
    duration: "10 min",
    durationMinutes: 10,
    description: "Follow a safe indoor route and notice ordinary details.",
    instructions: [
      "Choose a clear, safe route around the room.",
      "Walk up to 20 laps with relaxed posture and natural arm movement.",
      "Notice sounds, light, and objects as you move.",
    ],
    safetyNote: "Reduce the number of laps or stop if you feel uncomfortable.",
  },
  {
    id: "read-pages",
    name: "Read a few pages of a book or comic",
    category: "Inside",
    duration: "15 min",
    durationMinutes: 15,
    description: "Give your attention to words, pictures, and page layout.",
    instructions: [
      "Choose a book or comic and read a few pages.",
      "Notice the words, images, layout, and movement of your eyes.",
      "The material does not need to be especially interesting.",
    ],
    reflectionFields: [
      { id: "favorite-line", label: "Your favorite line from the text", type: "textarea" },
    ],
  },
  {
    id: "random-search",
    name: "Do a quick search for something random",
    category: "Inside",
    duration: "10 min",
    durationMinutes: 10,
    description: "Turn a curious question into a tiny discovery.",
    instructions: [
      "Search for something unrelated and curious.",
      "Try “How do jellyfish sleep?” or “What is the history of chessboxing?”",
      "Follow one interesting fact, then finish when the time is up.",
    ],
    links: [{ label: "Explore Google Trends", href: "https://trends.google.com/" }],
  },
  {
    id: "funny-desk",
    name: "Arrange your desk items in a funny order",
    category: "Inside",
    duration: "5 min",
    durationMinutes: 5,
    description: "Make your space briefly playful or unusual.",
    instructions: [
      "Rearrange a few desk items by color, size, shape, or pure silliness.",
      "Notice how the space looks different.",
      "Leave anything important easy to find.",
    ],
  },
  {
    id: "grounding-54321",
    name: "5-4-3-2-1 grounding exercise",
    category: "Mental",
    duration: "15 min",
    durationMinutes: 15,
    description: "Name what your senses notice in the present moment.",
    instructions: [
      "Slowly name five things you see.",
      "Name four things you can touch, three sounds, two smells, and one taste.",
      "There is no perfect answer—simply notice what is available.",
    ],
    special: "grounding",
  },
  {
    id: "sudoku",
    name: "Solve this Sudoku",
    category: "Mental",
    duration: "10 min",
    durationMinutes: 10,
    description: "Focus on one cell, row, column, and square at a time.",
    instructions: [
      "Select an empty cell and choose a number.",
      "Work slowly, checking rows, columns, and 3×3 squares.",
      "Use Check puzzle when you are ready.",
    ],
    special: "sudoku",
  },
  {
    id: "count-backward",
    name: "Count backward from 100 to 0",
    category: "Mental",
    duration: "5 min",
    durationMinutes: 5,
    description: "Keep gentle attention on numbers and natural breathing.",
    instructions: [
      "Start at 100 and count backward slowly.",
      "If you lose your place, resume from the last number you remember.",
      "Keep breathing naturally—accuracy is not the goal.",
    ],
  },
  {
    id: "alphabet-both-ways",
    name: "Recite the alphabet forward, then backward",
    category: "Mental",
    duration: "5 min",
    durationMinutes: 5,
    description: "Move through a familiar sequence in two directions.",
    instructions: [
      "Say the alphabet from A to Z.",
      "Pause, then try from Z to A.",
      "Take your time and restart only if you want to.",
    ],
  },
  {
    id: "text-a-friend",
    name: "Text a friend something random or silly",
    category: "Mental",
    duration: "5 min",
    durationMinutes: 5,
    description: "Create a small moment of ordinary connection.",
    instructions: [
      "Message a trusted friend with a silly question, meme, or absurd observation.",
      "Keep the message unrelated to OCD.",
      "Respect their boundaries and do not worry about an immediate reply.",
    ],
  },
  {
    id: "listen-to-song",
    name: "Listen to one song",
    category: "Mental",
    duration: "5 min",
    durationMinutes: 5,
    description: "Follow either the lyrics or the instruments from start to finish.",
    instructions: [
      "Choose one song and listen from beginning to end.",
      "Focus on either the lyrics or the beat and instruments.",
      "When your attention wanders, gently return to the sound.",
    ],
    links: [
      { label: "Find a song on YouTube", href: "https://www.youtube.com/" },
      { label: "Read lyrics on Genius", href: "https://genius.com/" },
    ],
  },
  {
    id: "delay-compulsion",
    name: "Refuse the compulsion for five minutes",
    shortName: "Delay the compulsion for five minutes",
    category: "Mental",
    duration: "5 min",
    durationMinutes: 5,
    description: "Practice a brief, self-chosen pause without demanding certainty.",
    instructions: [
      "Notice the urge without arguing with it.",
      "Tell yourself: “I will not do this compulsion for the next 5 minutes.”",
      "Use the timer, and choose what to do next when it ends.",
    ],
    timerSeconds: 300,
    safetyNote:
      "This is a support exercise, not treatment. If distress feels intense or unsafe, stop and seek support from a qualified professional.",
  },
  {
    id: "breathing-4812",
    name: "4-8-12 breathing",
    category: "Mental",
    duration: "1–2 min",
    durationMinutes: 2,
    description: "Try a paced breathing pattern only while it feels comfortable.",
    instructions: [
      "Inhale gently for 4 seconds.",
      "Hold only if comfortable for up to 8 seconds.",
      "Exhale gently for up to 12 seconds.",
      "Repeat up to five times, without forcing the breath.",
    ],
    timerSeconds: 120,
    safetyNote:
      "Stop immediately if you feel dizzy, short of breath, or uncomfortable. Return to normal breathing; shorter counts are fine.",
  },
];

export const categoryMeta: Record<
  Category,
  { emoji: string; label: string; color: string; description: string }
> = {
  Outside: {
    emoji: "🌳",
    label: "Outside Activities",
    color: "sage",
    description: "Gentle movement and attention in a safe outdoor space.",
  },
  Inside: {
    emoji: "🏠",
    label: "Inside Activities",
    color: "ochre",
    description: "Simple sensory, movement, and curiosity activities at home.",
  },
  Mental: {
    emoji: "🧠",
    label: "Mental Exercises",
    color: "blue",
    description: "Attention exercises, puzzles, connection, and brief pauses.",
  },
};

export const recommendationLabels = [
  "❌ Not for today",
  "🟡 Average, try if you want",
  "✅ Good, it may help",
  "🌟 Priority for today",
] as const;

export function recommendationFor(score?: number) {
  if (score === undefined) return "Take the quiz to personalize";
  return recommendationLabels[Math.max(0, Math.min(3, score))];
}
