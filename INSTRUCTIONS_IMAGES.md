# Asset instruction guide for DanielJalaliWebsite

This document lists all the image assets required for your portfolio to look complete.
Please modify the `src/content/projects/*.md` files if you change filenames.

## 1. Miku Widget (Gamification)
**Location:** `/public/images/`
These control the animated character following the cursor.

| Filename | Description | Type |
| :--- | :--- | :--- |
| `miku-idle.gif` | (or `.png`) The default standing animation. | **Required** |
| `miku-run.gif` | (or `.png`) Shown when the mouse moves. | **Required** |
| `miku-shock.png` | (or `.gif`) Shown when waking up from 5s+ idle. | **Required** |

> **Note:** If these files are missing, the website uses a pink placeholder dot.

---

## 2. Project Thumbnails & Personal Modules
**Location:** `/public/images/projects/`
These appear on the project cards and personal module entries.

| Filename | Used in Project / Module |
| :--- | :--- |
| `patreon-front-page.png` | `src/content/projects/patreon-integration.md` |
| `minecraft-server.png` | `src/data/personal.ts` (Example) |
| `3ds-mod.png` | `src/data/personal.ts` (Example) |
| `unixporn.png` | `src/data/personal.ts` (Example) |

---

## 3. Skill, Cert & Logo Assets
**Location:** `/public/images/logos/` or `/public/images/certs/`

Currently, the site uses Lucide Icons (code-based SVGs) for some skills, but relies on images for:
- **Certifications:** (e.g. `aws-cp.png`)
- **Education/Udemy:** (e.g. `udemy.png`)
- **Tech Stack:** (e.g. `unity.png`, `python.png`)

Please ensure these files exist to avoid broken image icons.

---

## How to add new images
1. Drag and drop the file into the `public/images/` folder.
2. If it's a project image: Update the `image: "/images/your-file.png"` line in the corresponding `.md` file in `src/content/projects/`.
