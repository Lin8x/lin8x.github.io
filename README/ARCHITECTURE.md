[BLOCK 3: ROUTES / INFORMATION ARCHITECTURE / NAVIGATION RULES]

DOMAIN + CORE ROUTING (LOCKED)
- The root domain `danieljalali.com` must load a Home page at `/`.
- The site must be multi-page (not a single-page-only portfolio).
- The Home page must link clearly into multiple “career target” pages that live at specific routes.

LAUNCH TRACK ROUTES (LOCKED)
- `/cloud`
- `/dataengineer`
- `/gamedev`

FUTURE TRACKS (REQUIREMENT)
- The architecture must make it easy to add new tracks later (example: `/machinelearning`).
- Adding a new track must not require rewriting the whole site; it should mainly be:
  - adding a new track entry/config
  - tagging existing content for that track
  - optionally adding a few track-specific sections or ordering rules

CONTENT-TO-TRACK RELEVANCY RULE (LOCKED INTENT)
- The site must showcase skills, projects, courses (Udemy), and certifications based on relevance to the selected job target/track.
- Track pages must present a coherent story; avoid mixing unrelated content in ways that dilute the target.

HOMEPAGE FOCUS RULE (LOCKED INTENT)
- Home page must emphasize the current main focus: AWS / Cloud / Data / Data Engineering.
- GameDev must be treated as a strong secondary track:
  - it should be accessible via navigation and track routing
  - it should not dominate the homepage or cause “equal-weight chaos”
- The UI must support highlighting “current main focus” so visitors instantly understand what you’re focused on now.

NAVIGATION EXPECTATIONS (BEHAVIORAL REQUIREMENTS)
- Visitors should be able to switch tracks easily from anywhere (e.g., a track switcher in header/nav).
- The selected track should influence what content is surfaced most prominently (projects, skills, proof).
- The site should always preserve a global identity (“Daniel Jalali portfolio”) even when browsing a specific track page.

REQUIRED PAGE TYPES (MINIMUM EXPECTATION)
- At minimum: Home + the three track pages above.
- The plan should include additional supporting pages that make sense for an employer portfolio, such as:
  - Projects index and/or individual project detail pages
  - Certifications
  - Courses taken
  - Contact page (or persistent contact CTA)
  - About page (optional but recommended if it strengthens hiring narrative)
- You must ask me (in later phases) which of these should exist as separate pages vs sections, but the architecture must support them.

URL + CONTENT DESIGN CONSTRAINTS
- Track pages must feel like “purpose-built landing pages” for that career target, not just filtered lists.
- Track pages should make it obvious why I fit that target (proof-first).
- The system must support both:
  - curated “featured content” per track (top items)
  - a broader “view all / browse more” experience without cluttering the landing.

DO-NOT-ASSUME NOTES
- If you need exact nav labels, ordering, or whether to include a global `/projects` page, ask instead of guessing.
- If you need to know whether I want “Software Engineer” as its own route or only as an umbrella concept, ask explicitly (do not assume).
