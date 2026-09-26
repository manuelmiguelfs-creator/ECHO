# Echo

**Say it, Hear it back**

Echo is a responsive educational and support web application focused initially on OCD. It combines clear education, a personalized activity library, a private compulsion journal, public profiles, and a moderated community contribution workflow.

Echo is not an emergency service, diagnostic tool, or replacement for a psychologist, psychiatrist, doctor, or other qualified professional.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the URL printed by Next.js. For a production check:

```bash
npm run lint
npm run build
npm start
```

## Pages

- `/` — homepage, mission, key advice, FAQ, and feature previews
- `/quiz` — category scoring and personalized recommendations
- `/help-now` — recommendations and random activity
- `/solutions` and `/solutions/:id` — searchable library and interactive activities
- `/what-is-ocd` and `/faq` — educational material and trusted sources
- `/journal` — private local journal, filters, pattern counts, and export
- `/community` — reviewed contribution form
- `/testimonials` — public profile gallery
- `/about` — project story and privacy decisions
- `/admin/moderation` — unlinked local moderation prototype

## Data model

- `QuizData`: name, symptom timeline, compulsion duration, and three category scores
- `Solution`: category, duration, instructions, reflections, links, timer, and safety note
- `JournalEntry`: date, description, emotions, activities, notes, and completion
- `Submission`: reviewer-only identity/contact data, source, category, content, and moderation status
- `Testimonial`: display/full name, biography, birth date, nationality, and featured state

## Privacy and current architecture

This version is intentionally backend-free. Quiz results, journal entries, completion state, and community submissions are stored in the current browser through `localStorage`. Nothing is uploaded. Clearing browser data removes it.

The moderation route changes local workflow status only and never publishes automatically. Before accepting real personal data in production, add authenticated accounts, role-based server authorization, encrypted storage, retention controls, and a privacy notice.

## Future-ready areas

- Replace local storage with authenticated, encrypted persistence
- Add role-based moderation and reviewer notes
- Add verified media and properly sourced public stories
- Add content versioning and medical/editorial review dates
- Expand beyond OCD through condition-specific, professionally reviewed modules
- Replace the placeholder brand mark with the final supplied PNG
