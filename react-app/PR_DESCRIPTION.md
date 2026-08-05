# PR: Integrate React app (Vite)

Title: Integrate React app (Vite) — add services + hooks + example components

Body:
This pull request adds a small Vite + React application under the `react-app/` directory to demonstrate integrating a frontend SPA into the existing static site repository.

What I added:
- `react-app/` (Vite + React scaffold)
- `react-app/src/services/api.js` — axios instance reading `VITE_API_BASE_URL`
- `react-app/src/hooks/useItems.js` — custom hook for GET/POST/PUT/DELETE of `/items`
- `react-app/src/components` — `ListPage.jsx`, `ItemForm.jsx` (UI wired to the hook)
- `react-app/.env.example` — shows `VITE_API_BASE_URL`
- `react-app/SECURITY-SCAN-REPORT.md` — short scan summary

How to run locally:
1. git fetch origin && git checkout feature/react-integration
2. cd react-app
3. npm install
4. Copy `.env.example` to `.env.local` and set `VITE_API_BASE_URL` (e.g. mockapi.io URL)
5. npm run dev

Notes & next steps:
- Quick static scans found no committed secrets. `script.js` uses `innerHTML` for a static dropdown template — it is not user-supplied content, but be careful about injecting user content directly.
- Edit + delete flows wired; UI disables inputs while loading and delete asks for confirmation.
- After review, merge and configure deployment (Vercel or GitHub Pages).
