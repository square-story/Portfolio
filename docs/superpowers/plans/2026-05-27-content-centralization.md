# Content Centralization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move all portfolio content (gallery items + project showcase) into `app/data.ts` so updates require editing one file only.

**Architecture:** Add `GalleryItem` type and `GALLERY_ITEMS` constant to the existing `app/data.ts`. Update `app/gallery/page.tsx` and `components/ui/project-showcase.tsx` to import from `data.ts` instead of using hardcoded local arrays. Remove dummy projects from showcase, wire up real `PROJECTS`.

**Tech Stack:** Next.js 15, TypeScript, `next/image`

---

### Task 1: Add GalleryItem type and GALLERY_ITEMS to data.ts

**Files:**
- Modify: `app/data.ts`

- [ ] **Step 1: Add GalleryItem type and GALLERY_ITEMS constant**

Open `app/data.ts`. Add after the existing type definitions (after `SocialLink` type, before `PROJECTS`):

```ts
export type GalleryItem = {
  id: number
  image: string
  title: string
  subtitle?: string
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    image: '/assets/workspace_setup.png',
    title: 'Desk Setup',
    subtitle: 'Where ideas turn into code',
  },
  {
    id: 2,
    image: '/assets/misty_mountains.png',
    title: 'Misty Mountains',
    subtitle: 'Chasing the quiet morning sun',
  },
  {
    id: 3,
    image: '/assets/neon_street.png',
    title: 'Neon Streets',
    subtitle: 'Midnight wanders through rain-washed lanes',
  },
  {
    id: 4,
    image: '/assets/abstract_shapes.png',
    title: 'Abstract Worlds',
    subtitle: 'Exploring geometric structures',
  },
]
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/muhammedsadiq/Developer/portfolio-next.js && pnpm tsc --noEmit 2>&1 | head -20
```

Expected: no output (zero errors).

- [ ] **Step 3: Commit**

```bash
git add app/data.ts
git commit -m "feat(data): add GalleryItem type and GALLERY_ITEMS constant"
```

---

### Task 2: Update gallery page to import from data.ts

**Files:**
- Modify: `app/gallery/page.tsx`

- [ ] **Step 1: Replace hardcoded galleryItems with import**

Replace the entire `const galleryItems = [...]` block with an import. The top of the file should become:

```ts
'use client'
import { motion } from 'motion/react'
import Link from 'next/link'
import { CoverFlow } from '@/components/ui/coverflow'
import { GALLERY_ITEMS } from '@/app/data'
```

Delete these lines entirely (the local array):
```ts
const galleryItems = [
  { id: 1, image: '/assets/workspace_setup.png', title: 'Desk Setup', subtitle: 'Where ideas turn into code' },
  { id: 2, image: '/assets/misty_mountains.png', title: 'Misty Mountains', subtitle: 'Chasing the quiet morning sun' },
  { id: 3, image: '/assets/neon_street.png', title: 'Neon Streets', subtitle: 'Midnight wanders through rain-washed lanes' },
  { id: 4, image: '/assets/abstract_shapes.png', title: 'Abstract Worlds', subtitle: 'Exploring geometric structures' },
]
```

- [ ] **Step 2: Update CoverFlow usage**

Change `items={galleryItems}` to `items={GALLERY_ITEMS}`:

```tsx
<CoverFlow
  items={GALLERY_ITEMS}
  itemWidth={290}
  itemHeight={350}
  initialIndex={0}
  enableScroll={true}
  scrollThreshold={60}
  centerGap={180}
  stackSpacing={60}
  enableReflection={false}
  enableClickToSnap={true}
/>
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/muhammedsadiq/Developer/portfolio-next.js && pnpm tsc --noEmit 2>&1 | head -20
```

Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add app/gallery/page.tsx
git commit -m "refactor(gallery): source items from data.ts"
```

---

### Task 3: Update ProjectShowcase to use real PROJECTS from data.ts

**Files:**
- Modify: `components/ui/project-showcase.tsx`

The component currently has:
- A local `Project` interface (different from `app/data.ts`'s `Project` type)
- A hardcoded `projects` array with 4 dummy projects (Lumina, Flux, Prism, Vertex) using Unsplash images
- A year badge in the row UI

All three must be replaced.

Field mapping from `app/data.ts` `Project` type:
- `project.name` → displayed as title
- `project.thumbnail` → hover preview image
- `project.link` → href on the row
- `project.description` → description text

- [ ] **Step 1: Update imports**

Replace the top of `components/ui/project-showcase.tsx`:

```ts
"use client"

import type React from "react"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"
import { PROJECTS, type Project } from "@/app/data"
```

- [ ] **Step 2: Remove local Project interface and projects array**

Delete these lines entirely:

```ts
interface Project {
  title: string
  description: string
  year: string
  link: string
  image: string
}

const projects: Project[] = [
  {
    title: "Lumina",
    description: "AI-powered design system generator.",
    year: "2024",
    link: "#",
    image: "https://plus.unsplash.com/premium_photo-1723489242223-865b4a8cf7b8?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D$0",
  },
  {
    title: "Flux",
    description: "Real-time collaboration for creative teams.",
    year: "2024",
    link: "#",
    image: "https://images.unsplash.com/photo-1530435460869-d13625c69bbf?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D$0",
  },
  {
    title: "Prism",
    description: "Color palette extraction from any image.",
    year: "2023",
    link: "#",
    image: "https://i.pinimg.com/1200x/99/ca/5c/99ca5cf82cf12df8801f7b2bef38d325.jpg",
  },
  {
    title: "Vertex",
    description: "3D modeling toolkit for the web.",
    year: "2023",
    link: "#",
    image: "https://i.pinimg.com/736x/7c/15/39/7c1539cf7ff0207cb49ce0d338de1e5f.jpg",
  },
]
```

- [ ] **Step 3: Update hover preview image panel**

The floating image panel maps over `projects`. Replace `projects` with `PROJECTS` and `project.image` with `project.thumbnail`, `project.title` with `project.name`:

```tsx
<div className="relative w-70 h-45 bg-secondary rounded-xl overflow-hidden">
  {PROJECTS.map((project, index) => (
    <div
      key={project.id}
      className="absolute inset-0 transition-all duration-500 ease-out"
      style={{
        opacity: hoveredIndex === index ? 1 : 0,
        scale: hoveredIndex === index ? 1 : 1.1,
        filter: hoveredIndex === index ? "none" : "blur(10px)",
      }}
    >
      <Image
        src={project.thumbnail}
        alt={project.name}
        fill
        sizes="280px"
        className="object-cover"
      />
    </div>
  ))}
  <div className="absolute inset-0 bg-linear-to-t from-background/20 to-transparent" />
</div>
```

Note: replaced `<img>` with `<Image fill>` inside a positioned `<div>`. The `<div>` takes the transition styles that were previously on `<img>`.

- [ ] **Step 4: Update project rows**

Replace `projects.map(...)` with `PROJECTS.map(...)` and update field references. Remove the year badge entirely. The row becomes:

```tsx
<div className="space-y-0">
  {PROJECTS.map((project, index) => (
    <a
      key={project.id}
      href={project.link}
      className="group block"
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative py-5 border-t border-border transition-all duration-300 ease-out">
        <div
          className={`
            absolute inset-0 -mx-4 px-4 bg-secondary/50 rounded-lg
            transition-all duration-300 ease-out
            ${hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-95"}
          `}
        />
        <div className="relative flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-2">
              <h3 className="text-foreground font-medium text-lg tracking-tight">
                <span className="relative">
                  {project.name}
                  <span
                    className={`
                      absolute left-0 -bottom-0.5 h-px bg-foreground
                      transition-all duration-300 ease-out
                      ${hoveredIndex === index ? "w-full" : "w-0"}
                    `}
                  />
                </span>
              </h3>
              <ArrowUpRight
                className={`
                  w-4 h-4 text-muted-foreground
                  transition-all duration-300 ease-out
                  ${hoveredIndex === index
                    ? "opacity-100 translate-x-0 translate-y-0"
                    : "opacity-0 -translate-x-2 translate-y-2"
                  }
                `}
              />
            </div>
            <p
              className={`
                text-muted-foreground text-sm mt-1 leading-relaxed
                transition-all duration-300 ease-out
                ${hoveredIndex === index ? "text-foreground/70" : "text-muted-foreground"}
              `}
            >
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </a>
  ))}
  <div className="border-t border-border" />
</div>
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
cd /Users/muhammedsadiq/Developer/portfolio-next.js && pnpm tsc --noEmit 2>&1 | head -20
```

Expected: no output.

- [ ] **Step 6: Commit**

```bash
git add components/ui/project-showcase.tsx
git commit -m "refactor(project-showcase): use real PROJECTS from data.ts, drop dummy data"
```
