# DesignPulse — Master Project Context

## What This Project Is
DesignPulse is a Next.js 15 web app for designers with five core pages:
1. **Feed** — aggregates design articles from 50+ RSS sources, filterable by discipline
2. **Resources** — curated design tools directory, categorised and filterable
3. **Events** — design conferences, workshops, webinars, meetups with calendar view
4. **Opinion** — (planned) aggregated design opinions from social media
5. **Newsletter** — (planned)

Live at: localhost:3000
Repo: GitHub (designpulse)
Design reference: design-ref/ folder (Figma Make export — Vite/React, reference only)

---

## Current Build Status

### ✅ Completed
- Project setup (Next.js 15, TypeScript, Tailwind v4, shadcn/ui)
- Database (Supabase PostgreSQL via Prisma 6)
- Seed data (articles from RSS, 60 resources, 12 events)
- Navbar with theme toggle
- Homepage (Feed) — article grid, sidebar filters, pagination, right rail
- Resources page — category grid, resource cards, filters, recently added
- Events page — calendar, event cards, modal, live stream player with chat
- RSS feed ingestion (lib/rss.ts)
- API routes: /api/articles, /api/resources, /api/categories, /api/events

### 🔄 In Progress
- Events page EventCard styling — needs to match Figma Make design-ref
- Events page visual polish

### ❌ Not Started
- Auth (Supabase Auth — login, onboarding, discipline selection)
- Bookmarks page (requires auth)
- Opinion page (social media scraping)
- Newsletter page
- Inngest scheduled jobs (auto RSS refresh, event scraping)
- Vercel deployment
- Luma/Eventbrite event scraper

---

## Tech Stack (never suggest alternatives)
- Framework:    Next.js 15, App Router, TypeScript
- Styling:      Tailwind CSS v4 only — no separate CSS files, no inline styles
- Components:   shadcn/ui — import from @/components/ui/
- Database:     Supabase (PostgreSQL) via Prisma 6 ORM
- Auth:         Supabase Auth with @supabase/ssr (not yet implemented)
- Animation:    Framer Motion
- Icons:        lucide-react only
- Theme:        next-themes (dark/light, default dark)
- Fonts:        Geist Sans + Geist Mono (already configured in layout.tsx)
- Email:        Resend (not yet configured)
- Background:   Inngest (not yet configured)
- Cache:        Upstash Redis (not yet configured)
- Feed parsing: rss-parser

---

## Critical Coding Rules
- App Router only — no pages/ directory
- Server Components by default — add 'use client' only when needed
  (useState, useEffect, onClick, useRouter, usePathname etc.)
- All API routes → app/api/[name]/route.ts
- All TypeScript types → types/index.ts (never redefine inline)
- All DB queries → Prisma via lib/prisma.ts (never raw SQL)
- Component names: PascalCase
- Function names: camelCase  
- File names: kebab-case
- Always handle loading states (Skeleton) and error states
- Validate API inputs with Zod
- JSDoc on every exported function
- next/image for every image (never plain <img>)
- Never use localStorage — use Supabase for persistent data
- light: is NOT a valid Tailwind prefix — use plain classes for light, dark: for dark
- Never import Button from card.tsx — always from @/components/ui/button

---

## Tailwind v4 Notes
- No tailwind.config.ts — config lives in globals.css
- Use @import "tailwindcss" at top of globals.css
- CSS variables defined in :root and .dark blocks in globals.css
- grid-cols-7 may not work — use style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }} instead
- Dynamic color classes don't work — use style={{ backgroundColor: color }} for dynamic colors

---

## Design System

### Colors
Dark mode:
  bg-[#1A1A2E]   page background
  bg-[#16213E]   cards, surfaces
  bg-[#1F2B4A]   elevated surfaces, hover
  bg-[#0F3460]   navbar, deep panels
  text-white      primary text
  text-[#A8AABC] muted text
  border-[#0F3460] borders
  #E94560        accent (CTAs, active states) — same in both modes

Light mode:
  bg-[#F5F6FA]   page background
  bg-white       cards
  bg-[#F0F4FF]   elevated surfaces
  text-[#1A1A2E] primary text
  text-[#6B7280] muted text
  border-[#E5E7EB] borders

### Discipline Badge Colors
  product:     #8B5CF6   ai:          #06B6D4
  graphic:     #F97316   visual:      #EC4899
  motion:      #10B981   interaction: #FBBF24
  ux:          #EF4444   ui:          #14B8A6

### Pricing Badge Colors
  FREE:      #22C55E    FREEMIUM:  #F59E0B    PAID:  #3B82F6

### Event Type Colors
  CONFERENCE: #6C63FF   WORKSHOP:  #00B894
  WEBINAR:    #00D2FF   MEETUP:    #F97316
  HACKATHON:  #E94560   AWARD:     #FDCB6E

### Typography
  Fonts: Geist Sans (body), Geist Mono (code)
  Headings: font-bold text-4xl/3xl/2xl/xl/lg
  Body: text-base leading-relaxed
  Muted: text-sm text-muted-foreground

### Border Radius
  Badges/pills: rounded-full
  Cards: rounded-xl
  Modals: rounded-2xl
  Inputs/buttons: rounded-md (shadcn default)

### Shadows
  Dark card: shadow-lg shadow-black/30
  Light card: shadow-sm hover:shadow-md
  Card hover: hover:scale-[1.02] hover:border-[#E94560] transition-all duration-200

---

## Breakpoints
  Mobile:           375px  — single col, bottom tab bar
  Tablet portrait:  768px  — 2-col grid, no sidebar (md:)
  Tablet landscape: 1024px — 3-col grid, slim sidebar (lg:)
  Desktop:          1440px — 3-col grid, full sidebar + right rail (xl:)

---

## Layout Specifications

### Homepage / Feed
  Navbar:      h-16 sticky top-0 z-50
  Left sidebar: w-60 fixed left-0 top-16 h-[calc(100vh-4rem)] — hidden below lg:
  Main:        lg:ml-60 xl:mr-[280px] p-6
  Right rail:  w-[280px] fixed right-0 top-16 — hidden below xl:
  Card grid:   grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6

### Resources Page
  No left sidebar — full width with xl:mr-[280px]
  Right rail: RecentlyAdded + Submit CTA
  Card grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4

### Events Page
  No sidebar — two column: lg:w-[340px] calendar + flex-1 event list
  No right rail

---

## File Structure
```
app/
  layout.tsx              ← Geist fonts, ThemeProvider, BottomTabBar
  page.tsx                ← Feed homepage (client, filters + pagination)
  resources/page.tsx      ← Resource directory
  events/page.tsx         ← Events with calendar
  bookmarks/page.tsx      ← (not built)
  login/page.tsx          ← (not built)
  onboarding/page.tsx     ← (not built)
  api/
    articles/route.ts     ← GET with discipline/search/date/sort filters
    resources/route.ts    ← GET with category/pricing/search filters
    categories/route.ts   ← GET all categories with resource counts
    events/route.ts       ← GET with status/type/month filters

components/
  layout/
    Navbar.tsx            ← sticky top nav, search, theme toggle, sign in
    Sidebar.tsx           ← discipline + date + sort + tag filters (Feed)
    RightRail.tsx         ← trending articles + featured tools (Feed)
    BottomTabBar.tsx      ← mobile fixed bottom nav (4 tabs)
  article/
    ArticleCard.tsx       ← horizontal card with bookmark
  resource/
    ResourceCard.tsx      ← grid card with logo letter + badges
    CategoryGrid.tsx      ← category icon tiles grid
    RecentlyAdded.tsx     ← right rail panel for resources page
  events/
    EventCard.tsx         ← horizontal card (needs visual polish)
    EventCalendar.tsx     ← 7-column calendar with event dots
    EventModal.tsx        ← event detail modal
    LiveStreamPlayer.tsx  ← full screen player with live chat
  shared/
    DisciplineBadge.tsx   ← colored discipline pill
    PricingBadge.tsx      ← colored pricing pill
    Pagination.tsx        ← numbered pagination with ellipsis

lib/
  supabase/client.ts      ← browser client
  supabase/server.ts      ← server client
  prisma.ts               ← Prisma singleton
  rss.ts                  ← fetchAndParseFeeds() from 9 RSS sources
  utils.ts                ← cn() helper

types/index.ts            ← ALL shared interfaces (Article, Resource, Event, etc.)

prisma/
  schema.prisma           ← source of truth — edit this, never generated/
  seed.ts                 ← run with: npm run seed
  seeds/                  ← (planned) split seed files

generated/prisma/         ← auto-generated, never edit
design-ref/               ← Figma Make export (reference only, never import from here)
```

---

## Database Schema Summary
Models: User, Article, Source, ArticleDiscipline, Discipline,
        Resource, Category, Bookmark, UserDiscipline, Event

Key unique fields:
  Article.url @unique
  Resource.url @unique
  Event.title @unique
  Category.slug @unique
  Source.name @unique

Enums: Pricing (FREE/FREEMIUM/PAID), EventType, EventStatus

Generator output: ../generated/prisma
Import client from: generated/prisma (NOT @prisma/client directly)

---

## Prisma Import Pattern
```typescript
// Always import from generated path:
import { PrismaClient, Pricing, EventType, EventStatus } from '../../generated/prisma';
// Or relatively from the file location
```

---

## RSS Sources (lib/rss.ts)
  Nielsen Norman Group: https://www.nngroup.com/feed/rss/
  Smashing Magazine:    https://www.smashingmagazine.com/feed/
  UX Design CC:         https://uxdesign.cc/feed
  Figma Blog:           https://www.figma.com/blog/feed/atom.xml
  A List Apart:         https://alistapart.com/main/feed
  Codrops:              https://tympanus.net/codrops/feed/
  Prototypr:            https://prototypr.io/feed/
  UX Planet:            https://uxplanet.org/feed
  UX Bootcamp:          https://bootcamp.uxdesign.cc/feed

---

## Environment Variables (.env.local)
  NEXT_PUBLIC_SUPABASE_URL=
  NEXT_PUBLIC_SUPABASE_ANON_KEY=
  SUPABASE_SERVICE_ROLE_KEY=
  DATABASE_URL=          ← transaction pooler (port 6543)
  DIRECT_URL=            ← session pooler (port 5432)
  UPSTASH_REDIS_REST_URL=
  UPSTASH_REDIS_REST_TOKEN=
  INNGEST_EVENT_KEY=
  INNGEST_SIGNING_KEY=
  RESEND_API_KEY=
  NEXT_PUBLIC_SITE_URL=http://localhost:3000

---

## Common Commands
  npm run dev            ← start dev server (stop before prisma commands)
  npm run build          ← check for TS errors
  npm run seed           ← seed all data (articles + resources + events)
  npx prisma migrate dev --name [name]   ← create + apply migration
  npx prisma generate    ← regenerate client after schema changes
  npx prisma studio      ← visual DB browser

## Important Windows Notes
  Always stop npm run dev before running prisma commands
  The generated/prisma/query_engine-windows.dll.node gets locked by dev server

---

## Design Reference (design-ref/)
Figma Make exported a Vite + React SPA — use as visual reference only.
Never import from design-ref/ in the actual app.
To use a component as reference: read the file, convert inline styles
to Tailwind arbitrary values, convert dark/light string variables to
dark: Tailwind prefix, rewrite for Next.js App Router (no RouterProvider).

Key reference files:
  design-ref/src/app/components/ui/  ← shadcn components (already copied)
  Figma Make EventCard               ← EventCard visual reference

---

## shadcn Components Available
accordion, alert-dialog, alert, aspect-ratio, avatar, badge,
breadcrumb, button, calendar, card, carousel, chart, checkbox,
collapsible, command, context-menu, dialog, drawer, dropdown-menu,
form, hover-card, input-otp, input, label, menubar, navigation-menu,
pagination, popover, progress, radio-group, resizable, scroll-area,
select, separator, sheet, sidebar, skeleton, slider, sonner, switch,
table, tabs, textarea, toggle-group, toggle, tooltip

Import pattern: import { Button } from '@/components/ui/button'
Never import Button from card.tsx — it doesn't export Button.

---

## Next Steps (in order)
1. Polish EventCard to match Figma Make design-ref
2. Build Auth — Supabase login page + onboarding
3. Build Bookmarks page
4. Set up Inngest cron for RSS auto-refresh
5. Set up Luma/Eventbrite event scraper
6. Deploy to Vercel