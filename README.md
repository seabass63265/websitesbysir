# websitesbysir

Next.js 16 (App Router) starter.

## Stack

| Area        | Choice |
| ----------- | ------ |
| Framework   | Next.js 16, App Router, React 19, TypeScript 5 (strict) |
| Styling     | Tailwind CSS v4 — CSS-first, tokens in `app/globals.css` via `@theme`, no `tailwind.config.js` |
| Fonts       | `next/font/google` (Geist / Geist Mono) wired to `--font-geist-*`, consumed by `--font-sans` / `--font-mono` |
| Animation   | `gsap` + `ScrollTrigger` (imported per-component), `lenis` smooth scroll, `lottie-web`, `smooothy` (drag deck) |
| Backend     | `resend` (email), `openai` (AI), `@vercel/kv` (KV store) — clients in `lib/` |
| Analytics   | `@vercel/analytics`, mounted in `app/layout.tsx` |
| Lint        | ESLint + `eslint-config-next` |
| Deploy      | Vercel |

## Structure

```
app/
  layout.tsx                     root layout: Space Mono + local display fonts, <Analytics/>, <SmoothScrollProvider/>
  fonts/                         display.woff2 / display-italic.woff2 — used only by the fullscreen menu
  page.tsx                       homepage — composes the marketing sections
  globals.css                    Tailwind import + @theme tokens + SIR_ design system classes
  api/contact/route.ts           example Resend + KV route handler
  components/
    providers/SmoothScrollProvider.tsx   "use client" — global Lenis instance + context
    animation/ScrollReveal.tsx           "use client" — GSAP ScrollTrigger reveal
    animation/LottiePlayer.tsx           "use client" — lottie-web player
    marketing/
      SiteHeader.tsx                     server — wordmark + <NavMenu/>
      NavMenu.tsx                        "use client" — blob toggle, GSAP wave overlay, fullscreen menu
      Hero.tsx                           server — headline + monitor/mug blueprint graphic
      HeroComputer.tsx                   server — the hero SVG illustration
      ServicesList.tsx                   server — "Select Service Area" rows
      ProcessSection.tsx                 server — approach / investment
      TestimonialsDeck.tsx               "use client" — smooothy drag deck, overlapping-stack testimonial cards
      WorkGrid.tsx                       "use client" — concept cards, set concept basis
      ContactSection.tsx                 "use client" — inquiry form, reads concept basis
      ConceptContext.tsx                 "use client" — shares concept choice card → form
lib/
  resend.ts    getResend()  — lazy, throws if RESEND_API_KEY unset
  openai.ts    getOpenAI()   — lazy, throws if OPENAI_API_KEY unset
  kv.ts        re-exports the @vercel/kv client
reference/     dropped-in design bundles (NOT part of the build — outside app/)
```

Conventions: one PascalCase component per file; `"use client"` only where interactivity
is needed; co-locate a `*.module.css` next to a component only when Tailwind utilities
aren't enough (keyframes, pseudo-elements).

## Develop

```bash
cp .env.example .env.local   # fill in keys as needed
npm run dev                  # http://localhost:3000
```

Verify after changes:

```bash
npx tsc --noEmit             # must be clean
npm run lint
npm run build
```
