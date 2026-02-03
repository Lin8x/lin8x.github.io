[BLOCK 5: CONTACT / CONVERSION / EMAIL FORM REQUIREMENTS]

PRIMARY CONVERSION GOAL (LOCKED)
- The #1 action the website must drive: employers contact me for a job through an on-site email form.

DESTINATION (LOCKED)
- The email form must send submissions to: lin8x.github@gmail.com

SPAM + SAFETY REQUIREMENTS (LOCKED)
- The contact system must include spam protection.
  - Required: honeypot (at minimum)
  - Also acceptable/encouraged: captcha or other anti-bot mechanism (must be compatible with a static site)
- The solution must not expose the destination email address in a way that makes it easy for scrapers to harvest.

CONFIRMATION COPY (LOCKED)
- After successful submission, the user must see a confirmation message (on-page or success screen).
- The plan must include the exact confirmation copy (or ask me to approve a draft).

ERROR / EDGE CASE UX (REQUIREMENTS)
- Provide clear user-facing error states:
  - validation errors (missing email, invalid email format, empty message, etc.)
  - submission failed / network error
- Prevent duplicate submissions (e.g., disable button while sending, show sending state).
- Include a basic privacy note near the form (what info is collected and what it’s used for).

GITHUB PAGES CONSTRAINT (LOCKED)
- Hosting is GitHub Pages (static hosting).
- Therefore, the form implementation must be compatible with static hosting.
- If an external service or serverless endpoint is needed, you must:
  - explain the options clearly
  - ask me which approach I want
  - ensure the chosen approach is realistic for GitHub Pages

CONTACT SURFACE AREA (CONVERSION-DRIVEN REQUIREMENT)
- The contact CTA must be easy to find from:
  - the homepage
  - each track page (/cloud, /dataengineer, /gamedev)
  - project pages (if they exist)
- The plan should recommend whether contact is:
  - a dedicated /contact page
  - a modal
  - embedded sections on key pages
  - or a combination
  (but must respect professionalism and avoid intrusive popups)

DO-NOT-ASSUME NOTES
- Do not assume which form provider to use (or whether to use a provider at all); ask me and propose the best options for GitHub Pages.
- Do not assume whether I want to collect company name, role, or other fields—ask, then propose a default minimal set.
