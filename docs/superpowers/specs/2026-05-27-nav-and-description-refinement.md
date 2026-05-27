# Nav + Landing Description Refinement

**Date:** 2026-05-27

## Changes

### 1. `app/header.tsx` — Add /work nav link

Insert `<Link href="/work">work</Link>` between `gallery` and `writing`.
Active state: `pathname === '/work'` → `text-black dark:text-white font-medium`.
Same haptic + sound handlers as existing links.

Nav order: `home · gallery · work · writing`

### 2. `app/home-page-client.tsx` — Prose fixes

Para 1 — replace:
> "I am currently working as a Founding Engineer at [Creeto.ai], currently working on the agentic workflow, managing the backend architecture and ensuring the scalable solution is shipped.. Previously, I created [Blipko] to help users track balances and expenses via telegram, and worked on [Inspecto] to streamline vehicle checks."

With:
> "I'm a Founding Engineer at [Creeto.ai], working on the agentic workflow and backend architecture to ship scalable solutions. Previously, I created [Blipko] to help users track expenses and balances via Telegram, and built [Inspecto] to streamline vehicle inspections."

Para 2 — replace:
> "Apart from my professional life, I am passionate about photography, open-source development, and exploring new technologies."

With:
> "Outside work, I'm passionate about photography, open-source, and exploring new technologies."

All inline link chips (`<a>` with favicon + Cursor hover card) stay untouched — only the surrounding prose text changes.

## Non-goals
- No layout changes
- No new components
- No changes to hover cards, haptics, or sound handlers
