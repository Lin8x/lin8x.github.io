# Managing Website Content

This guide explains how to add skills, certifications, degrees, and update project information.

## 1. Central Data File
Most of the "Resume" style data is stored in **`src/data/portfolio.ts`**.
Open this file to make edits.

### A. Adding / Removing Skills
Find the `skillMap` object.
Add to the specific track list:
```typescript
'cloud': [
    // ... existing
    { name: 'New Tool', icon: '/images/logos/new-tool.png' },
]
```
**Important:** You must place the image file in `public/images/logos/`.

### B. Adding Certifications & Courses
Find the `certMap` object.
You can now distinguish between official certs and courses (like Udemy) using the `type` field.
```typescript
{ 
  name: 'Certification Name', 
  provider: 'Provider (e.g. AWS)', 
  image: '/images/certs/cert-logo.png', 
  status: 'completed',
  type: 'certification' // or 'course'
}
```
**Important:** Place the logo in `public/images/certs/` or `/images/logos/`.

### C. Resume Linking
You can define specific resumes per track in the `trackConfig` object at the top of `portfolio.ts`.

### D. Updating Degrees
Find the `degrees` object. Relevant coursework is currently handled via `courseMap` and automatically injected into the degree card on each track page.

---

## 2. Managing Personal Modules 
Open `src/data/personal.ts`.
You can now add images to personal projects by adding an `images` array to the item:
```typescript
{
    text: "My Project Name",
    images: ["/images/projects/my-project.png"]
}
```

## 3. Managing Projects
Projects are managed as individual files in `src/content/projects/`.

1.  **Create a new file:** e.g., `my-new-app.md`.
2.  **Frontmatter:**
    ```markdown
    ---
    title: "My New App"
    description: "Brief summary."
    date: "2024-01-01"
    featured: true
    image: "/images/projects/app-preview.png"
    tags: ["React", "TypeScript"]
    tracks: ["software-engineer", "cloud"]  <-- IMPORTANT: Controls which page it appears on.
    links:
      demo: "https://..."
      repo: "https://..."
    ---
    ```
3.  **Body:** Write your description in Markdown below the dashes.

## 4. Quizzes
Quizzes are defined in `src/components/game/Quiz.tsx`.
To change questions, edit the `QUESTIONS` object. Supports multiple randomized questions per track.
