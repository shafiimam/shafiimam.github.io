# Shafi Imam — Portfolio Site Design Spec

**Date:** 2026-08-06
**Owner:** Shafi Imam
**Status:** Approved design, spec for build

---

## 1. Goal

Replace the current Notion portfolio (`shafi-imam.notion.site`) with a custom, high-converting website that works for three audiences at once:

- **Cold outreach** — the link Shafi drops in DMs/emails to store owners; must convert a cold lead into a reply/call.
- **Inbound / Upwork** — prospects who find him elsewhere, then check the site to justify hiring at a premium rate.
- **Premium repositioning** — look high-end enough to raise rates and attract bigger stores.

Primary conversion action (site-wide): **"Get a free 5-min store audit."** This mirrors Shafi's existing outreach offer, so portfolio + outreach + Upwork all funnel to one low-risk yes.

## 2. Positioning

**Headline direction:** *Full-stack Shopify partner*, every claim tied to revenue/outcomes rather than a tech list.

- H1: "Your full-stack Shopify partner."
- Sub: "I build, fix, and scale Shopify stores that load fast and convert better — from theme to headless to custom apps."
- Skills (40+ list today) are demoted to supporting evidence, not the headline.

## 3. Current-site problems this fixes

1. "Get Notion free" banner → kills premium credibility. Removed (own domain).
2. Empty "No results" project sections → replaced with real case studies + proof.
3. Broken contact `shafidev96#gmail.com` (# not @) → corrected working email everywhere.
4. Commodity positioning + 40-skill wall → sharp partner positioning, outcome-led.
5. Stock cover + monospace-everything → intentional premium visual system.

## 4. Tech

- **Astro + Vercel**, own domain (TBD — no domain yet; ship on Vercel subdomain first, wire custom domain later).
- Rationale is also marketing: Shafi sells speed + CRO, so the site itself must score ~100 Lighthouse and load instantly. "The dev whose own site is faster than your store."
- Static, no backend. Audit CTA points to email/calendar/form link (exact target TBD with Shafi).
- **All copy — metrics, testimonials, case-study text — lives in one content module** (`src/data/content.ts` or Astro content collections) so placeholders are swapped in a single place.

## 5. Page structure (single scroll)

1. **Hero** — H1 + sub + primary CTA + trust stat bar (20,000+ hrs · 100+ projects · 40+ clients · 3 published apps).
2. **Trust strip** — client store names/wordmarks: A Ma Maniere, Social Status, APB, Galt Sand, Byrna (naming approved).
3. **Case studies (core)** — 3 deep, each anchored on one of Shafi's real asset types:
   - **Speed → A Ma Maniere** — load time before→after, mobile speed score gain. *(placeholder metrics)*
   - **Conversion lift → Byrna** — +% conversion after CRO + custom features. *(placeholder)*
   - **AI shopping → Social Status** — AI product discovery, +% add-to-cart. *(placeholder)*
   Each card: Problem → What I did → Result metric. APB + Galt Sand appear in the "More work" grid.
4. **More work** — compact grid of remaining stores/brands + published Shopify apps (WIP.LY/Scratch Card, SAPP Quora Pixel, SAPP Subscription) + custom builds (slide cart, scarcity timer, free-shipping bar, custom shipping method, discount-in-cart, email deliverability fix).
5. **Services** — full-stack partner menu: Store design & build · Speed & CRO · Headless & Shopify Plus · Custom apps & integrations · Ongoing care/retainer.
6. **Process** — 4 steps: Audit → Plan → Build → Optimize. Reduces "is this risky?" fear.
7. **Testimonials** — 3 cards, real quote + name + store. *(placeholder text, user updates later.)*
8. **About** — short, human. 20k hrs, Dhaka serving global brands, headshot. Current roles: The Whitaker Grp / Arm5 Formula Co.
9. **Final CTA** — "Get a free 5-min store audit" + secondary "Hire me".
10. **Footer** — working email, phone (+8801779-584929), LinkedIn, Upwork. Fixed/correct contact.

## 6. Content status (per Shafi)

- **Featured stores:** A Ma Maniere, Social Status, APB, Galt Sand, Byrna — all safe to name publicly.
- **Real assets exist** for: speed optimization, conversion lift, AI shopping conversion → become the 3 case studies. Exact numbers = **placeholder now**, Shafi swaps real data later via the content module.
- **Testimonials:** placeholder now, updated later.
- **Headshot:** available (to be provided).
- **Domain:** not purchased yet — launch on Vercel subdomain, attach domain when ready.

## 7. Visual direction

- Premium, intentional, not templated. Strong type hierarchy, generous whitespace, one confident accent color, real dark/light discipline.
- Fast: system/near-system fonts or one subset webfont, no heavy libs. Motion minimal and purposeful.
- Case-study screenshots of the live stores as primary visual proof.

## 8. Out of scope (YAGNI)

- CMS, blog, auth, database, contact-form backend.
- Multi-page routing beyond the single scroll (+ optional standalone case-study pages later).
- Analytics can be added post-launch (lightweight, e.g. Vercel Analytics).

## 9. Success criteria

- Lighthouse ~100 across the board; instant load.
- Every section has real proof or an honest placeholder clearly swappable in one file.
- One primary CTA repeated; contact info correct.
- Reads as a premium studio, not a free template.
