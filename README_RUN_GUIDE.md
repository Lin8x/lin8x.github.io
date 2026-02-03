# How to Run & Test Your Website

This guide helps you start the development server, verify features, and prepare for deployment.

## 1. Starting the Server
Open your terminal in the project folder and run:

```bash
npm run dev
```

You should see output like:
```
  ➜  Local:   http://localhost:4321/
  ➜  Network: use --host to expose
```
**Ctrl + Click** the Local link to open the site in your browser.

---

## 2. What to Test (Checklist)

### A. Navigation & Tracks
1.  **Homepage:** ensuring you see the "Select Track" buttons.
2.  **Click "Select Track: Cloud":** URL should change to `/cloud`.
3.  **Check Content:**
    *   Confirm the Page Title says "Cloud Engineering".
    *   Confirm you see projects like "Self-Hosted Homelab" and "Automatic Patreon Integration".
    *   Confirm you **DO NOT** see "Google Developer Student Club" (that belongs to GameDev).
4.  **Click "Game Dev Path" (in footer/nav):**
    *   Confirm URL change to `/gamedev`.
    *   Confirm you see the Unity projects.

### B. Gamification Layer
1.  **HUD:** Look at the top-right corner. You should see `0000 XP`.
2.  **Miku Follower:**
    *   Move your mouse. The pink dot (or Miku image if added) should follow you.
    *   Move mouse to the **Left** of the character -> Character should face Left.
    *   Move mouse to the **Right** -> Character should face Right.
    *   **Stop moving** for 5 seconds. Then move quickly. You should see the "Shock" animation (or placeholder).
3.  **Points:**
    *   Open a project card. You should see a notification toast: `+20 XP`.
    *   Refresh the page. The score should **remain** (it is saved).

### C. Contact Form
1.  Click the round "Contact Me" button in the bottom right.
2.  Fill in the form (you can use fake info).
3.  Click Send.
4.  **Result:** You should see a "Transmission Sent" success screen and get a large XP bonus (`+500 XP`).

---

## 3. Adding Your Images
As detailed in `INSTRUCTIONS_IMAGES.md`, drop your image files into `public/images/`.
*   Effect: The placeholders (pink dots, gray boxes) will instantly update to your real images.

## 4. Building for Production
When you are ready to publish to GitHub Pages:

```bash
npm run build
```
This creates a `dist/` folder with your final static website.
