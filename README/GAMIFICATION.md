[BLOCK 4: GAMIFICATION LAYER (GAME-STYLED PORTFOLIO RULES)]

CORE INTENT (LOCKED)
- The website must feel “game-styled” while remaining highly professional and employer-friendly.
- Gamification must increase engagement without harming credibility.
- Gamification must never block access to core portfolio content.

REQUIRED GAME MECHANICS (LOCKED FEATURES)
1) Notifications / Toasts
   - The site must display small, polished notification-style popups for events such as:
     - points earned
     - secret found
     - quiz completed
     - upgrade unlocked
   - These must be subtle and not disruptive.

2) Points / Score HUD
   - A score system must exist and be visible at the top-right (HUD-style).
   - The HUD must update as the user earns points.

3) Secrets / Easter Eggs
   - The site must include hidden “secrets” that a user can discover.
   - Discovering a secret awards points.
   - Secrets must be optional; missing them should not reduce the core portfolio experience.

4) Quizzes
   - The site must include small quizzes “here and there” throughout the site.
   - Quizzes award points.
   - Quizzes should be quick and lightweight (not long exams).
   - Quiz content should not require external sign-in.

5) Upgrades / Unlockables
   - Points must unlock upgrades that add cosmetic/visual enhancements to the site experience.
   - Example upgrade: a tiny dog companion in the corner.
   - Upgrades must be extensible so I can add more later (new cosmetics / effects / HUD items).

USER EXPERIENCE CONSTRAINTS (ANTI-ANNOYANCE)
- Gamification must not feel spammy, childish, or distracting.
- Toasts should have rate-limits / cooldowns so multiple actions don’t flood the screen.
- The HUD must be tasteful and compact.
- Quizzes and secrets must not interrupt reading flow.

ACCESSIBILITY + CONTROL REQUIREMENTS (LOCKED)
- Gamification must be optional and toggleable (user can disable it).
- The toggle state must persist (e.g., stored locally).
- All gamification interactions must be accessible:
  - keyboard navigable
  - readable contrast
  - supports `prefers-reduced-motion` (animations reduced/disabled)
- Secrets and quizzes must not rely solely on mouse-only interactions.

DATA / PERSISTENCE REQUIREMENTS
- Points and unlock progress must persist across visits (local persistence expected).
- The plan must include a simple storage schema to track:
  - current points/score
  - discovered secrets
  - completed quizzes
  - unlocked upgrades
- The system should support resetting progress (recommended) without breaking the site.

EXTENSIBILITY (VERY IMPORTANT)
- It must be easy for me to add:
  - new quizzes
  - new secrets
  - new upgrades
  - new point rules
- The gamification system should be built as a modular layer on top of the portfolio content (not intertwined so deeply that changes are painful).

DO-NOT-ASSUME NOTES
- Do not assume exact point values, quiz formats, or upgrade list; ask me in later phases and propose a default system.
- Do not assume the dog upgrade is the only upgrade; it is an example of an unlockable cosmetic.
