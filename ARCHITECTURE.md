# Vanene Portfolio - Architecture

**Status:** Source of truth. Both the frontend build (this chat) and the backend build (separate chat) must follow this document. If something isn't in here, stop and ask rather than guessing - do not invent conventions that could conflict with the other side of the build.

**Owner:** Kennedy Vanene
**Last updated:** 2026-07-19

---

## 1. What this project is

A personal portfolio site positioned as a data scientist and backend engineer who ships full-stack production systems. The differentiating concept is "case files" - every project is presented as a decision investigation (rejected approach -> shipped approach -> measurable business outcome), not a features list. See `frontend/DESIGN.md` for the full visual language.

This is being built once, properly - not a "v1 now, features later" plan. Everything listed below ships together:
- Resume download (PDF)
- Contact form that sends Kennedy a real email
- Ratings/testimonials with an approval queue (public submits, Kennedy approves before it's visible)
- Admin dashboard (visitor analytics summary, ratings approval)
- Hidden/obscured admin entry point (no visible "Admin" nav link)
- Social links: Email, LinkedIn, GitHub, Medium, X
- Full light and dark mode support

---

## 2. Repo structure

One repository, two top-level folders. Two separate Claude chats work on this project - one per folder - so folder boundaries must stay clean and neither side should edit files under the other's folder without flagging it here first.

```
vanene-portfolio/
├── ARCHITECTURE.md          <- this file, source of truth for both sides
├── README.md                <- top-level, human-facing project overview
├── .gitignore
│
├── frontend/
│   ├── DESIGN.md            <- visual language, tokens, component conventions
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── index.html
│   ├── public/
│   │   └── resume/
│   │       └── kennedy-vanene-resume.pdf
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── components/
│       ├── pages/
│       ├── styles/
│       ├── api/             <- typed fetch wrappers calling the backend API
│       └── assets/
│           └── evidence/    <- real SHAP/feature-importance exports etc.
│
└── backend/
    ├── BACKEND.md            <- backend-specific implementation notes (owned by backend chat)
    ├── requirements.txt
    ├── .env.example
    ├── alembic/
    ├── alembic.ini
    └── app/
        ├── main.py
        ├── core/             <- config, security, settings
        ├── api/v1/endpoints/ <- route handlers
        ├── db/                <- SQLAlchemy models, session
        ├── models/            <- Pydantic schemas
        └── services/          <- email sending, analytics query logic, etc.
```

**Rule:** the frontend never talks to Supabase directly. All data flows through the FastAPI backend. This keeps one clear contract (the API) between the two chats instead of both touching the database independently.

---

## 3. Tech stack (confirmed, do not deviate without updating this doc)

| Layer | Choice | Why |
|---|---|---|
| Frontend | React + Vite + TypeScript | Kennedy has used this before. Fast dev server, no framework lock-in like Next.js SSR would add. |
| Backend | FastAPI (Python) | Matches Kennedy's existing production projects (FraudGuard, Dr. Jacob Advisory). |
| Database | Supabase Postgres | Already used on 2 other projects. Free tier pauses only after 7 days of zero project activity - not per-request like Render's web service sleep, so this is not the same problem Kennedy hit before. |
| Backend hosting | Railway | Does not force-sleep on inactivity the way Render's free tier does. Usage-based pricing, ~$5/mo. |
| Frontend hosting | Vercel | Already used across Kennedy's other projects, zero-config for Vite. |
| Domain | vanene.online (Namecheap) | Not yet purchased at time of writing. Required before Resend can send real (non-sandbox) email - Resend needs domain verification via DNS records. |
| Email delivery | Resend | Simpler API than SendGrid, generous free tier (3,000 emails/month), sufficient for a single contact-form use case. |
| Visitor analytics | Umami (Cloud, free tier) | Gets summary stats (today / 7-day / 30-day, country, growth) with zero custom backend work. Kennedy has seen this style of dashboard before (Dr. Jacob Advisory) and wants the same clarity here. |
| ORM / migrations | SQLAlchemy (async) + Alembic | Matches Kennedy's existing projects. |

**Explicitly rejected:**
- Render (backend hosting) - free tier sleeps on inactivity, already caused frustration.
- Next.js - no SSR/SEO requirement strong enough to justify the added complexity over Vite.
- Building custom analytics into FastAPI - unnecessary backend surface area for a solved problem; Umami covers the exact stated goal (daily/weekly/30-day visitor summaries by country) with no maintenance cost.
- SendGrid - more setup friction than Resend for a single transactional email use case.

---

## 3a. Environment handling (both local dev and production, required)

No hardcoded URLs, API base paths, or secrets anywhere in either codebase. Every environment-dependent value comes from env files, never inline.

**Frontend:**
- `.env.local` - used during local dev (`npm run dev`), points `VITE_API_BASE_URL` at `http://localhost:8000` (or whatever port the local backend runs on)
- `.env.production` - used for the real Vercel deploy, points `VITE_API_BASE_URL` at the real Railway backend URL
- All API calls go through a single wrapper module (`frontend/src/api/client.ts`) that reads `import.meta.env.VITE_API_BASE_URL` once - no component ever constructs a URL itself
- Vite automatically picks the right `.env` file based on build mode, no manual switching needed

**Backend:**
- `.env` (local, gitignored) and Railway's own environment variable settings (production) hold: `DATABASE_URL` (Supabase connection string), `ADMIN_SECRET`, `RESEND_API_KEY`, `ALLOWED_ORIGINS` (CORS - localhost in dev, vanene.online in production)
- `.env.example` in the repo documents every required variable name with a placeholder value, so either chat (or Kennedy) can set up a fresh environment without guessing what's needed
- Config loaded once via `backend/app/core/config.py` (e.g. `pydantic-settings`), never read directly with `os.environ` scattered across files

---

## 4. Content and copy conventions

- **No em dashes anywhere** - not in UI copy, not in code comments, not in commit messages. Use a hyphen ( - ) instead. This applies to both frontend and backend chats.
- Brand name on-site: **Kennedy Vanene**. Never "Munene" anywhere public-facing (real surname, kept private to avoid discrimination risk - see project history).
- Domain: vanene (TLD tbd, Kennedy is purchasing separately).
- Tone: editorial, understated, evidence-first. No hype language, no "passionate about," no emoji in body copy. See `frontend/DESIGN.md` for full voice guidance.

---

## 5. Pages / routes (frontend)

| Route | Purpose |
|---|---|
| `/` | Home - hero statement, case-file preview stat, case files, evidence (real SHAP/feature-importance images), process, stack, ratings, contact |
| `/admin` | Hidden admin dashboard entry (see section 7) |

Single-page for v1 - all sections are anchors on `/`, matching the MVP structure. No separate routed pages needed yet (no blog on-site; Medium is linked externally).

---

## 6. Data model (draft - backend chat owns final schema)

Minimum tables needed to support v1 features:

**`ratings`**
| column | type | notes |
|---|---|---|
| id | uuid, pk | |
| name | text | submitter name |
| role_company | text | e.g. "Product Lead, Company" |
| rating | int | 1-5 |
| quote | text | the testimonial text |
| email | text, nullable | optional - only visible to Kennedy in admin, never public. Lets him follow up or edit on the submitter's behalf if they request a change after submitting. |
| status | enum | `pending`, `approved`, `rejected` |
| created_at | timestamptz | |

**`contact_messages`**
| column | type | notes |
|---|---|---|
| id | uuid, pk | |
| name | text | |
| email | text | |
| message | text | |
| sent_at | timestamptz | |
| email_delivered | boolean | whether the Resend call succeeded |

No `users` table needed - admin auth is a single hardcoded secret (see section 7), not a login system.

---

## 7. Admin dashboard

**Auth:** simplest possible approach per Kennedy's explicit choice - a single password checked against an environment variable (`ADMIN_SECRET`), no user table, no JWT. Session can be a signed short-lived cookie or a simple token stored in localStorage after successful password check - backend chat's call on implementation, but no multi-user auth system is needed here.

**Entry point:** no visible "Admin" link in navigation or footer. Instead: a small, deliberately unstyled element at the bottom of the footer (e.g. a single low-contrast character or the copyright year itself) that links to `/admin`. It should not look interactive - no hover state, no cursor pointer styling that gives it away. Kennedy will know where it is; nobody else should notice it.

**Ratings edit/revision flow:** ratings have an optional `email` field (see section 6). If a submitter wants to revise or retract their rating after submitting, they email Kennedy directly (their email is visible only to him in the admin panel, never public) and he edits the rating's text/rating value himself from the admin dashboard before re-approving it. No self-service edit link is sent to submitters - this mirrors the Dr. Jacob Advisory pattern Kennedy already uses.

**Spam protection:** honeypot field on the public ratings submission form (a hidden input real users never fill in; bots that auto-fill every field trip it). Honeypot-flagged submissions are silently discarded server-side - they should never even reach the `pending` queue, so Kennedy's admin panel only ever shows genuine submissions to review.

**Dashboard contents:**
- Ratings queue: list of `pending` ratings with approve/reject buttons, submitter email visible only here
- Visitor summary: a real dashboard view built into `/admin` (same look and feel as Dr. Jacob Advisory) - sessions today, this week, this month, daily page views (last 30 days), unique session trend, top pages, top countries, device breakdown. Data comes from Umami's API, fetched server-side by FastAPI and rendered with Recharts on the frontend - not an external link-out.

---

## 8. API contract (backend chat implements, frontend chat consumes)

Draft endpoints - backend chat should treat this as a starting point, not a locked spec, but should update this doc if it changes something here.

```
POST   /api/v1/contact              submit contact form -> stores in Supabase AND sends email via Resend
POST   /api/v1/ratings              submit a new rating (goes to pending). Includes honeypot field - if filled, silently discard, never reaches pending queue.
GET    /api/v1/ratings/approved     public - list of approved ratings for the homepage (never includes email field)
POST   /api/v1/admin/login          check password against ADMIN_SECRET, return session token
GET    /api/v1/admin/ratings        admin-only - list all ratings regardless of status, includes email field
PATCH  /api/v1/admin/ratings/{id}   admin-only - approve/reject/edit a rating
GET    /health                      liveness check
```

---

## 9. Design system reference

Full visual language (type, spacing, component patterns) lives in `frontend/DESIGN.md`, derived from the approved MVP. Color system below is locked - both light and dark mode ship together, not dark-mode-later.

**Core principle:** one honest background tone per mode, used everywhere (body, cards, header - no separate white/cream card surfaces). Visual weight and hierarchy come from shadow, border, and spacing, not from introducing a second background color. This was a hard-won decision after the MVP phase surfaced a cream/gray/white inconsistency - do not reintroduce it.

**Light mode**
| Token | Value | Use |
|---|---|---|
| `--bg` | `#E9E9E7` | body, cards, header - everywhere. Exact hex, not an approximation. |
| `--ink` | `#17181C` | primary text |
| `--ink-soft` | `#4C4B47` | secondary text |
| `--muted` | `#87877F` | tertiary/label text |
| `--rust` | `#B8452F` | "rejected/cost" semantic accent |
| `--pine` | `#1F6E52` | "chosen/saved" semantic accent |
| `--line` | `#CFCFCA` | borders |

**Dark mode**
| Token | Value | Use |
|---|---|---|
| `--bg` | `#1C1C1E` | body, cards, header - everywhere. Warm charcoal, same neutral family as light mode's gray - not blue-black, not pure black. |
| `--ink` | `#EDECE8` | primary text - warm off-white, mirrors light mode's base tone |
| `--ink-soft` | `#B5B3AC` | secondary text |
| `--muted` | `#7E7C76` | tertiary/label text |
| `--rust` | `#D9694A` | brightened for dark-background contrast |
| `--pine` | `#3A9973` | brightened for dark-background contrast |
| `--line` | `#333335` | borders |

**Elevation:** in light mode, shadow does the work (soft, warm-toned drop shadows). In dark mode, shadows barely read against a dark background, so elevation shifts to a lighter border plus a subtle inner glow instead of relying on shadow alone.

**Mode switching:** defaults to the user's OS preference (`prefers-color-scheme`), with a small, understated toggle in the header (not floating, not prominent) that overrides it. The override is remembered (localStorage) across visits.

**Evidence images (SHAP waterfall, feature importance):** these are real matplotlib exports with a white/light background - they do not automatically adapt to dark mode. Kennedy's VA will produce two versions of each: a light-background version and a dark-background/transparent version, named with a `-light` / `-dark` suffix (e.g. `shap-waterfall-light.png`, `shap-waterfall-dark.png`). The frontend swaps the image `src` when the theme changes, same trigger as the color token switch.

- **Type:** Fraunces (display/serif), Inter (body), IBM Plex Mono (data/labels).
- **Signature concept:** the case-file / rejected-vs-shipped decision framing, used consistently across the hero and every project card.
- **No tech-wallpaper backgrounds, no glowing/gradient-mesh decoration.**
- **Real evidence over decoration:** actual SHAP/feature-importance exports embedded as real proof, not recreated as illustrations.

---

## 10. Mobile responsiveness rule (important, explicit)

**Content goes edge-to-edge on mobile.** Desktop layout uses a centered `.wrap` container with left/right margins:contentReference[oaicite:0]{index=0}. On mobile, that margin convention gets dropped for most content - side padding should be minimal (just enough to keep text readable, not a decorative margin). Exception: specific elements that need breathing room for aesthetic/legibility reasons (e.g. card padding, image frames) - those are deliberate, not a default margin applied everywhere.

Do not carry over the desktop "some sections edge-to-edge, others margined" inconsistency that was flagged and rejected during the MVP phase. The rule is: **consistent treatment within a breakpoint.** Desktop = consistent `.wrap` margins throughout (deliberate rhythm-breaks aside). Mobile = consistent edge-to-edge throughout.

---

## 11. Resolved decisions log (for traceability)

Everything below was an open question during planning and is now settled:

- **Umami embed method:** built as a real in-app dashboard view under `/admin`, matching the Dr. Jacob Advisory pattern - FastAPI fetches from Umami's API server-side, frontend renders with Recharts. Not a link-out to an external Umami page.
- **Contact form storage:** both - stored in Supabase (`contact_messages` table) AND emailed via Resend, so a failed email send never loses the message. Store first, then send.
- **Domain:** vanene.online, purchased on Namecheap (not yet purchased at time of writing - required before Resend can send non-sandbox email).
- **Ratings spam protection:** honeypot field, silent server-side discard.
- **Ratings edit flow:** optional email field on submission, visible only to Kennedy in admin, used for manual follow-up/edit - no self-service edit link.
- **Dark mode:** in scope for the real build, not deferred. Full color system specified in section 9.

## 12. Remaining implementation details (decided, not open)

- **Admin session mechanism:** signed HTTP-only cookie, set on successful `/api/v1/admin/login`. More secure than localStorage (not readable by JS, not exposed to XSS), and this is a security-sensitive area so the more secure option wins outright - no further discussion needed.
- **Umami in the admin dashboard:** built the same way as Dr. Jacob Advisory - a real dashboard view inside `/admin`, not a link out to an external site. Backend exposes a small endpoint that calls Umami's API server-side and returns the numbers (sessions today/week/month, daily page views, top pages, top countries, device breakdown); frontend renders it with Recharts, matching the Dr. Jacob screenshots Kennedy shared. This is a solved pattern from an existing project, not new design work.