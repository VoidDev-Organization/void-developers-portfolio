# Team VoidDev — 3D Developer Portfolio

The 3D developer portfolio from the JavaScript Mastery tutorial
("Build and Deploy an Amazing 3D Web Developer Portfolio in React JS"),
rebuilt as the **Team VoidDev** portfolio on **Vite 8 + React 19 + Tailwind CSS v4 +
React Three Fiber v9 / drei v10**.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # preview the production build
npm run lint     # oxlint
```

## Sections

| Section | Anchor | File |
| --- | --- | --- |
| Hero + 3D PC | — | `src/components/Hero.jsx`, `canvas/Computers.jsx` |
| About | `#about` | `src/components/About.jsx` |
| Our Journey | `#journey` | `src/components/Journey.jsx` |
| Tech | — | `src/components/Tech.jsx` + `canvas/Ball.jsx` |
| Projects | `#projects` | `src/components/Works.jsx` |
| **Meet the Team** | `#team` | `src/components/Members.jsx` |
| Contact | `#contact` | `src/components/Contact.jsx` + `canvas/Earth.jsx`, `canvas/Stars.jsx` |

Navbar links come from `navLinks` in `src/constants/index.js`.

## Editing content

**Almost everything lives in `src/constants/index.js`:**

- `navLinks` — navbar items
- `contactInfo` — email, phone numbers, GitHub, Instagram (used in Hero, Contact
  and as the contact form delivery address)
- `services` — the four About cards
- `technologies` — the tech spheres (each needs an icon in `src/assets/tech/`)
- `journey` — the timeline entries (`date` drives the label on the right;
  the three focus areas are dated `2023 — 2026`, the degree `2023 — 2027`)
- `members` — the team cards (name, role, focus tags, bio, GitHub URL)
- `projects` — project cards (`live_url` renders the **Live demo** button,
  `source_code_link` renders the **Code** button)

Project screenshots live in `src/assets/` (`amazon.jpg`, `v-commerce.png`,
`void-media-preview.png`, `void-cast.png`, `ember-bite.jpg`, `ember-plate.jpg`)
and are imported through `src/assets/index.js`.

### Responsive behaviour

Measured with a headless-browser harness at 320 / 375 / 430 / 768 / 1024 / 1440.
Breakpoints:

| Range | Layout |
| --- | --- |
| < lg (1024px) | hamburger menu, single-column everywhere |
| lg+ | inline nav links (`gap-5`, `xl:gap-10`) |
| < sm (640px) | section padding drops from 64px to 24px |

Typography uses `clamp()` (`.section-title`, `styles.heroHeadText` /
`heroSubText`) so headings scale continuously instead of stepping at breakpoints.

**The `whileInView` trap:** `SectionWrapper` originally triggered on
`amount: 0.25`. Any section taller than ~4x the viewport can never satisfy
that — the 3324px project grid in a 780px phone viewport needs 831px visible,
so the animation never fired and every child stayed at `opacity: 0`
(invisible content). It now uses a pixel `margin`, which triggers as soon as
any part enters at any height.

### Scroll behaviour

Two pieces, because neither alone is enough:

1. `index.html` runs a tiny inline script in `<head>` setting
   `history.scrollRestoration = "manual"`. Browsers default to `"auto"`, which
   re-applies the previous offset on refresh - the page then reopens halfway
   down. This has to run before the document loads; the module script is
   deferred and would be too late.
2. `src/components/ScrollManager.jsx` (rendered inside `<BrowserRouter>`)
   decides where the page sits: top on a fresh open or refresh, top on a route
   change (instant, not animated), and the target section for a `#hash` deep
   link on a non-refresh visit. Refreshes always return to the page top.

Both use a *previous-value* comparison rather than a "first render" boolean:
`React.StrictMode` invokes effects twice on mount, which flips a boolean guard
and fires a second scroll. The gallery auto-scroll in `Works.jsx` follows the
same rule, so changing a category filter still scrolls while mounting never does.

### Reduced motion

`<MotionConfig reducedMotion='user'>` in `App.jsx` covers framer-motion, and a
`prefers-reduced-motion` block in `src/index.css` neutralises every CSS
transition and animation.

### Section heading system

Every section uses one shared heading component, `SectionHeading.jsx`:
a small letterspaced **kicker**, an oversized **display title**, then optional
supporting copy.

```jsx
<SectionHeading
  kicker='What we've built'
  title='Projects.'
  subtitle="Hover any card for the full description..."
  align='center'   // optional
/>
```

The type lives in `.section-kicker` / `.section-title` in `src/index.css`
(30px → 60px across breakpoints). Used by About, Journey, Tech, Projects,
Members and Contact — change it once and every section follows.

### Project categories and filtering

`projectCategories` in `src/constants/index.js` lists the filter pills; each
project carries a `categories` array (a project can be in more than one). Counts
are derived from the project data at render time, so a pill can never drift out
of sync with the gallery.

Current mapping:

| Category | Projects |
| --- | --- |
| All Projects | all 7 |
| E-commerce | Amazon Clone, V-Commerce |
| Restaurant & Food | Ember & Bite, Ember & Plate |
| Landing Pages | Ember & Bite, Ember & Plate, Void Cast |
| Education | Smart Antenna |
| Social & Community | Void Media |

Filtering uses `aria-pressed` buttons inside a `role="group"`, Arrow/Home/End
keys move between them, and the gallery is `aria-live="polite"` so the change is
announced. Re-filtering is wrapped in `AnimatePresence` and honours
`prefers-reduced-motion`.

### Project card hover

Project cards reveal on hover: the image zooms, a dark veil fades in, and a
panel slides up from the bottom with the full description plus the **Live demo**
and **Code** buttons. `group-focus-within` covers keyboard users, and
`.project-reveal` in `src/index.css` forces the panel open on touch devices
(where `hover: none`) — it needs `!important` because those utilities live in
the `utilities` cascade layer, and `translate: none` because Tailwind v4 uses
the individual `translate` property rather than `transform`. On touch the
description is hidden (`.project-reveal-desc`) so only the action bar shows.

### Adding a technology icon

Drop a `.png`/`.svg` into `src/assets/tech/`, import it in
`src/assets/index.js`, add it to `technologies`. (Python, Django and PostgreSQL
have no icons yet — add them if you want them in the spheres.)

### Member cards

Each card is a gallery-style card with two faces:

- **Front** — full-width photo that zooms on hover, a caption panel that slides
  up from the bottom, the name, role, top 3 skills, and a **"Hover to see CV"**
  badge in the top-right corner (it fades out on hover once the CV is open).
  No links here — hover is what opens the CV.
- **Back** — education, languages, frameworks, databases, skills, projects, then
  the contact row: **GitHub button, email button and the CV download**

The faces swap on hover (or keyboard focus) with a cross-fade plus a slight 3D
tilt, and each card plays a one-shot reveal the first time it scrolls into view.
A glossy light sweep runs across the card on hover.

#### Member photos

Each member has a `profile` image in `src/assets/members/`, cropped to
1120x560 (2:1, matching the card's photo area) with a smart "attention" crop so
the face lands in frame. Regenerate them with a resize of
`fit: 'cover', position: sharp.strategy.attention` if you swap the photos out.
`Members.jsx` falls back to a gradient block when a member has no `profile`.

#### CVs

Drop PDFs in `public/cv/` and set a member's `cv` field to the filename, e.g.
`cv: "Saeed-Hassan_CV.pdf"`. Members with no `cv` show "CV coming soon".
Fadi's CV is already wired up.

## Contact form

`src/components/Contact.jsx` sends the visitor's name, email, and message to
`contactInfo.email` through FormSubmit's AJAX endpoint. No project environment
variables are needed. The first submission triggers an address confirmation
email to the team inbox; confirm it once to activate delivery. Later successful
sends show an on-page confirmation, and delivery errors appear inline.

## Brand colours

Defined in the `@theme` block in `src/index.css` and matched to the previous
VoidDev site:

| Token | Value |
| --- | --- |
| `--color-accent` | `#7c3aed` |
| `--color-accent-bright` | `#a78bfa` |
| `--color-accent-soft` | `#ede9fe` |
| `--color-accent-dim` | `#4c1d95` |
| `--color-primary` | `#050507` |
| `--color-secondary` | `#d7d4df` |
| `--color-tertiary` | `#151030` |
| `--color-muted` | `#9b96a8` |

### Logo

| File | Used for |
| --- | --- |
| `src/assets/logo.png` | navbar (160x160, transparent) |
| `public/favicon.png` | browser tab (64x64) |
| `public/apple-touch-icon.png` | iOS home screen (180x180) |

Regenerate from the master image with
`.trim({ background: '#00000000' })` then resize — the source already has a
transparent background.

The mark's slash is black, so on the dark navbar the `<img>` carries
`drop-shadow-[0_0_2px_rgba(255,255,255,0.85)]`; without it the slash vanishes
into the background.

## 3D models — attribution required

Both models are **CC-BY-4.0**, so credit the authors if you publish this.

| Model | Author | Source |
| --- | --- | --- |
| Gaming Desktop PC | [Yolala1232](https://sketchfab.com/Yolala1232) | [sketchfab.com](https://sketchfab.com/3d-models/gaming-desktop-pc-d1d8282c9916438091f11aeb28787b66) |
| Stylized planet | [cmzw](https://sketchfab.com/cmzw) | [sketchfab.com](https://sketchfab.com/3d-models/stylized-planet-789725db86f547fc9163b00f302c3e70) |

The original `license.txt` files are kept next to each model in `public/`.

## Notes on the original port

Changes made while porting the tutorial's v3-era stack:

- **Tailwind v3 -> v4**: `tailwind.config.cjs` moved into `@theme` in
  `src/index.css`; `@tailwind` directives replaced by `@import "tailwindcss"`.
  The global `* { margin: 0; padding: 0 }` reset is now inside `@layer base` —
  in v4 unlayered CSS beats every layered rule, so leaving it unlayered silently
  kills all margin/padding utilities.
- **Hero background**: `herobg.png` moved to `public/` and applied by a
  `@utility bg-hero-pattern`, so it resolves in production builds too (the
  original `/src/assets/...` URL breaks after `vite build`).
- **react-tilt v1** no longer has a default export, so `import Tilt from` became
  `import { Tilt } from`. The `options` prop also moved onto `<Tilt>` itself
  (it was on an inner `div` in the tutorial, so the tilt effect never applied).
- **maath/random** import now points at the real `.esm.js` filename.
- The tutorial's testimonial section was removed rather than kept with invented
  quotes; `src/components/Feedbacks.jsx` is still on disk if you want it back.
- Member cards use a cross-fade between two faces instead of a CSS 3D flip,
  because `backface-visibility` is not honoured in this page's subtree (see
  "Member cards" above).
