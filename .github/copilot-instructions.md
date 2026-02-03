# Daniel Jalali - Gamified Portfolio (Master Plan)

## 1. Project Overview & Strategy
**User:** Daniel Jalali (Software Engineer, Cloud & Data Specialist).
**Goal:** Persuade employers to contact Daniel via an email form.
**Vibe:** Professional, Credible, "Premium Portfolio" with a Gamified Overlay.
**Key Twist:** Gamification is ON by default but subtle. It serves as a secondary engagement layer (Points, Secrets, Unlocks) without blocking the primary hiring narrative.

---

## 2. Tech Stack (Locked)
- **Framework:** [Astro](https://astro.build/) (Static Site Generation for performance).
- **Interactivity:** React (for Gamification HUD, Toasts, Modals, "Miku" widget).
- **Styling:** Tailwind CSS (Dark theme default: `#000000` bg).
- **Hosting:** GitHub Pages.
- **Forms:** EmailJS (Client-side submission).
- **State Management:** `nanostores` (recommended for Astro<->React state sharing) or React Context within islands.

---

## 3. Site Architecture & Navigation

### URL Structure
- `/` (Home): "Hub" page. Brief intro, high-level navigation to tracks.
- `/cloud` (Track): AWS, Self-Hosted Lab, Patreon Integration.
- `/dataengineer` (Track): Pipelines, ETL, Vendor Data Analysis, SQL.
- `/gamedev` (Track): INIT, GDSC, Unity/C# Team Projects.
- `/software-engineer` (Track): General coding projects + "Catch-all".
- `/resume` (Direct download or redirect to PDF).

### Navigation Bar
**Layout:** [Home] | [Tracks (Dropdown)] | [Projects] | [Resume] | [Contact]
- **Tracks Dropdown:** Cloud Engineer, Data Engineer, Game Developer, Software Engineer.
- **Contact:** Opens Modal or scrolls to footer form.
- **Gamification HUD:** Top-right (Points, Level, Notifications).

### Page Content Strategy
1.  **Home:**
    *   **Hero:** "Hi, I'm Daniel. Software Engineer specializing in Cloud, Data, and Scalable Systems." + [Press Start / Select Track] primary CTA.
    *   **Highlights:** 3 top cards (one from each track).
2.  **Track Pages (e.g., /cloud):**
    *   **Hero:** specific headline ("Building Resilient Cloud Infrastructure").
    *   **Featured Projects:** Cards specific to this track (e.g., Self-Hosted Lab).
    *   **Skill Stack:** Icons relevant to this track (AWS, Docker).
    *   **Relevant Proof:** Certs/Courses filtered for this track.

---

## 4. Content Model (Tagging System)

**Entities:** `Project`, `Experience`, `Certification`, `Skill`.
**Filter Logic:** Items have a `tags` array. Tracks function as filtered views.

| Item | Tags (Routes where it appears) |
| :--- | :--- |
| **Self-Hosted Lab** | `cloud`, `dataengineer` |
| **Vendor Data Analysis** | `dataengineer` |
| **Patreon Integration** | `cloud`, `software-engineer` |
| **INIT / Game Projects** | `gamedev` |
| **Automated Pipeline** | `software-engineer`, `dataengineer` |

**Anonymization Rules:**
- **Employers:** Keep real names (Hash Studios, MiniDrink).
- **Schools/Locations:** Generic/Region only (e.g., "Florida University", "Miami Area").

---

## 5. Gamification Specification

### Core Mechanics
*   **Economy:** "Completionist". Points are scarce & meaningful.
*   **Persistence:** `localStorage` save (Key: `jalali_save_v1`).
*   **Toggle:** User can turn off "Game Mode" in settings (removes HUD/Miku).

### Scoring Events
| Action | Points | Notification Text |
| :--- | :--- | :--- |
| **Visit Track** | 50 | "Track Discovered: [Name]" |
| **Find Secret** | 100 | "Secret Found: [Name]" |
| **Send Contact** | 500 | "Connection Established!" |
| **Toggle Theme** | 10 | "System Customized" |
| **Open Project** | 20 | "Data Accessed" |

### Unlockables (The "Shop")
1.  **Color Themes:** Matrix Mode (Green), Retro Terminal (Amber), Cyber (Purple).
2.  **Cursor Effects:** Flame Trail, Sparkle.
3.  **UI Sound Pack:** Clicks/Hovers (muted by default).
4.  **Miku Follower (Legendary):**
    *   **Behavior:** Follows cursor with slight delay.
    *   **States:** `idle` (rest), `run` (moving), `shock` (sudden move after >5s idle).
    *   **Assets:** Code must check `/images/miku-idle.png`, `/images/miku-shock.png`, etc.

---

## 6. Implementation Guidelines (Phase-by-Phase)

### Phase 1: Skeleton & Astro Setup
- Initialize Astro project.
- Install Tailwind, React, Lucide Icons.
- Create `Layout.astro` (Head, Nav, Footer).
- Create content collections (`src/content/projects/...`).

### Phase 2: Core Pages & Content
- Build `/src/pages/index.astro` (Hub).
- Build `/src/pages/[track].astro` (Dynamic routing for tracks).
- Implement "Project Card" component (Modal view).
- Integrate EmailJS form in a React component (`ContactForm.jsx`).

### Phase 3: Gamification Layer
- Create `GameContext` (React) or Nano Stores module for points/inventory.
- Build `HUD.jsx` (Score display).
- Build `Toaster.jsx` (Achievement popups).
- Build `MikuWidget.jsx` (The follower logic).

### Phase 4: Polish & Assets
- Add "Konami Code" listener.
- Add secret clickable areas.
- Optimize images.
- Verify Accessibility (ARIA labels, Reduced Motion).

---

## 7. Developer Instructions (User Preferences)
- **Do not assume info:** If missing copy or details, ask.
- **Modularity:** Keep game logic separate from content (`/components/game/`).
- **SEO:** Title default `Daniel Jalali | Portfolio`.
- **Socials:** GitHub, LinkedIn, Itch.io.
- **Resume:** Public download button.
