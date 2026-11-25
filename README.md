# Oni Abiodun Ebenezer — Portfolio Website

An exclusive single-page portfolio website for **Oni Abiodun Ebenezer** — Nigerian keyboardist, music producer, and official keyboardist of the Odunayo Akintomide Band.

Built with **Next.js 16 · TypeScript · Tailwind CSS 4 · shadcn/ui · Framer Motion**.

---

## Quick Deploy to Render

You need a free [GitHub](https://github.com) account and a free [Render](https://render.com) account. No coding required.

### Step 1 — Push this project to GitHub

1. Sign in to GitHub and create a new empty repository, e.g. `oni-portfolio`. Do **not** add a README or `.gitignore` (this repo already has them).
2. Unzip this folder on your computer.
3. Open a terminal in the unzipped folder and run:

```bash
git init
git add .
git commit -m "Oni Abiodun Ebenezer portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/oni-portfolio.git
git push -u origin main
```

(Replace `YOUR_USERNAME` with your GitHub username, and `oni-portfolio` with whatever you named the repo.)

### Step 2 — Create the Render service

1. Sign in to [render.com](https://dashboard.render.com).
2. Click **New +** → **Blueprint**.
3. Connect your GitHub account if you haven't already.
4. Select the repository you just pushed.
5. Render will automatically detect the `render.yaml` file in this repo and pre-fill everything: build command, start command, Node version, env vars.
6. Click **Apply**.
7. Wait 3–6 minutes for the build to finish. Render will give you a live URL like `https://oni-abiodun-ebenezer-portfolio.onrender.com`.

That's it. Every time you `git push` to GitHub, Render automatically redeploys.

### (Alternative) Manual Render setup without render.yaml

If you'd rather configure Render by hand:

1. **New +** → **Web Service** → pick your GitHub repo.
2. Fill in:
   - **Name**: `oni-portfolio` (or anything you like)
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Plan**: Free
3. Under **Environment**, add:
   - `NODE_VERSION` = `20.11.1`
   - `NODE_ENV` = `production`
   - `NEXT_TELEMETRY_DISABLED` = `1`
4. Click **Create Web Service**.

---

## Run it locally

Requires Node.js 20+ and npm.

```bash
npm install
npm run dev      # http://localhost:3000
```

To build and run the production version locally:

```bash
npm run build
npm run start
```

---

## Project structure

```
.
├── render.yaml              # Render Blueprint (one-click deploy)
├── .nvmrc                   # Node version pin (20.11.1)
├── package.json             # npm scripts (dev / build / start)
├── next.config.ts           # Next.js config
├── public/
│   └── portfolio/           # 5 compressed photos (~360 KB total)
└── src/
    ├── app/
    │   ├── layout.tsx       # Root layout + metadata
    │   ├── page.tsx         # The entire single-page portfolio
    │   ├── globals.css      # Cream + wine + gold luxury theme
    │   └── api/route.ts     # Health-check endpoint
    ├── components/ui/       # shadcn/ui component library
    ├── hooks/
    └── lib/
```

---

## What's on the page

1. **Hero** — full-screen portrait + name + UK Tour CTA
2. **Stats bar** — DOB · Osun State · 10 Band Members · March 2022 debut · 4 genres
3. **About** — bio narrative + floating quote card
4. **Journey Timeline** — church → 2009 school → March 2022 debut → present → UK Tour 2027
5. **Specialties** — Afrobeats, Gospel, Highlife, Fuji
6. **Production Credits** — T Dollar, Oluwadollarz, Dammie Fire, Otega, Mohbad, Portable, Gb Flex Camaro, Qdot
7. **Notable Productions** — Alfa and Omega · Big Wave · Fuchor Me
8. **The Band** — Odunayo Akintomide Band, 10 members
9. **UK Tour 2027** — venues, dates, band manager Mr. Lawal Taiwo Tomiwa
10. **Education & Personal Life**
11. **Contact / Booking**
12. **Footer**

---

## Customising

- **Phone / email / social links** — open `src/app/page.tsx` and search for `booking@oniabiodunebenezer.com`, `tel:+2340000000000`, and the `Instagram` / `Youtube` icon links.
- **Tour venues** — edit the `UK_VENUES` array near the top of `src/app/page.tsx`.
- **Photos** — replace files in `public/portfolio/` (keep the same names, or update the paths in `page.tsx`).
- **Colours** — edit the CSS variables at the top of `src/app/globals.css` (`--background`, `--primary`, `--gold`, `--wine`).

---

## Tech notes

- This is a **pure front-end portfolio** — no database required at runtime. The Prisma/NextAuth dependencies in `package.json` are leftover from the scaffold and can be ignored; the build does not invoke them.
- All 5 photos are pre-compressed with sharp + mozjpeg (98% size reduction vs. originals), so the page loads in ~550ms.
- Free Render plan sleeps after 15 min of inactivity; first request after sleep takes ~30s to wake up. Upgrade to a paid plan for always-on.
