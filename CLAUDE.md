# CLAUDE.md — Project Rules

## Project Goal
Build a high-performance, accessible community hub for Spotland and Falinge using Astro and Sanity.io.  
The site must prioritize people-first usability, clarity, and long-term maintainability.

---

## Non-Negotiable Priorities (in order)
1. **Accessibility (A11y)** — elderly users and ESL users are primary audiences.
2. **Clarity & Readability** — simple language, obvious navigation, content-first layouts.
3. **Performance** — fast loads on older devices and slow connections.
4. **Maintainability** — predictable patterns, minimal dependencies.
5. **Visual Consistency** — strict adherence to the design system.

When tradeoffs are required, earlier items always win.

---

## Target Audiences
- **Elderly residents** — require high contrast, large touch targets, clear typography.
- **ESL users (Urdu, Punjabi, Arabic)** — require simple English (≈ Grade 6) and visual cues.
- **Local partners & funders** — require professional presentation and social proof.

---

## Technical Constraints & Assumptions
- **Framework:** Astro (static-first; avoid runtime JS unless justified).
- **CMS:** Sanity.io (all dynamic content originates from Sanity).
- **Data Fetching:** GROQ queries only; no hard-coded business data in UI components.
- **Styling:** Tailwind CSS + existing shadcn/ui components.
- **Design Tokens:**
  - Primary: Teal `#26a1ab`
  - Accent: Terracotta `#d97706`
  - Radius: `rounded-3xl` for cards and buttons

---

## Coding & Architectural Rules
- **Component Structure:** Small, reusable Astro components in `src/components/`.
- **Routing:** Use file-based routing; `[slug].astro` for dynamic content.
- **HTML Semantics:** Always prefer semantic elements (`section`, `article`, `nav`, `header`).
- **Data Access:** Centralize GROQ queries; never duplicate fetch logic across pages.
- **Type Safety:** Use strict TypeScript for Sanity schemas and component props.
- **Simplicity Bias:** Prefer explicit, readable code over abstraction.

---

## Accessibility Rules (Explicit)
- **Reading Level:** Target ≈ Grade 6. Short sentences. Plain language.
- **Typography:** Minimum body font size 18px.
- **Contrast:** Meet or exceed WCAG AA contrast ratios.
- **Touch Targets:** Minimum interactive height 44px.
- **Images:** 
  - Informative images require descriptive `alt`.
  - Decorative images must use `alt=""`.
- **Language Awareness:** Acknowledge multilingual users explicitly in UI copy (e.g. “We speak Urdu”).

Accessibility is never optional and must not be deferred.

---

## Workflow Rules
- **Small Diffs:** Make the smallest change necessary to achieve the goal.
- **No Surprise Rewrites:** Do not refactor unrelated code without approval.
- **Commits:** Use conventional commits (`feat:`, `fix:`, `docs:`, `style:`).
- **Dependencies:** 
  - Prefer existing project dependencies.
  - Check for existing shadcn/ui components before adding new libraries.
- **Validation:** Always confirm GROQ queries match Sanity schemas before committing.
- **Explain Testing:** Every change must include how to verify it works.

### Clarification Rules
- Ask questions only when a decision would significantly affect:
  - architecture
  - accessibility
  - content structure
  - data modeling
- Limit clarification questions to a maximum of **three** at a time.
- If information is missing but low risk, proceed with sensible defaults and state assumptions.
- Never block progress on minor uncertainties.

---

## What “Done” Means
- Code passes linting and type checks.
- Layouts work at mobile, tablet, and desktop widths.
- Lighthouse accessibility audits pass at a basic level.
- All content is sourced from Sanity (no placeholders).
- Tone is warm, welcoming, and aligned with the Spotland style guide.
