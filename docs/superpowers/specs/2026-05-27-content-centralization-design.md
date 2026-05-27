# Content Centralization Design

**Date:** 2026-05-27  
**Scope:** Move gallery and project showcase content into `app/data.ts` as single source of truth.

## Problem

Content is scattered across components:
- `app/gallery/page.tsx` has a hardcoded `galleryItems` array
- `components/ui/project-showcase.tsx` has a hardcoded dummy `projects` array (Lumina, Flux, Prism, Vertex) — not connected to real projects in `data.ts`

Updating portfolio content requires hunting down component files. Adding a photo or project means touching implementation code.

## Goal

All portfolio content lives in `app/data.ts`. Components are purely presentational — they import and display, never own data.

## Changes

### 1. `app/data.ts`

Add `GalleryItem` type and `GALLERY_ITEMS` constant:

```ts
export type GalleryItem = {
  id: number
  image: string
  title: string
  subtitle?: string
}

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, image: '/assets/workspace_setup.png', title: 'Desk Setup', subtitle: 'Where ideas turn into code' },
  { id: 2, image: '/assets/misty_mountains.png', title: 'Misty Mountains', subtitle: 'Chasing the quiet morning sun' },
  { id: 3, image: '/assets/neon_street.png', title: 'Neon Streets', subtitle: 'Midnight wanders through rain-washed lanes' },
  { id: 4, image: '/assets/abstract_shapes.png', title: 'Abstract Worlds', subtitle: 'Exploring geometric structures' },
]
```

No new fields added to `Project` type.

### 2. `app/gallery/page.tsx`

- Remove local `galleryItems` array
- Import `GALLERY_ITEMS` from `@/app/data`
- Pass to `<CoverFlow items={GALLERY_ITEMS} />`

### 3. `components/ui/project-showcase.tsx`

- Remove local `Project` interface and `projects` array (Lumina, Flux, Prism, Vertex)
- Import `PROJECTS` from `@/app/data`
- Field mapping: `name → title`, `thumbnail → image`, `link → link`, `description → description`
- Remove year badge and all year-related markup
- Replace `<img>` with `next/image` `<Image>` (fill mode, sized container)

## Non-goals

- No CMS integration
- No new dependencies
- No changes to CoverFlow props or ProjectShowcase interaction behavior
- No changes to image files or public folder structure

## After this change

To add a gallery photo: drop image in `public/assets/` (or `public/gallery/`), add 1 entry to `GALLERY_ITEMS`.  
To add a project: add 1 entry to `PROJECTS[]` in `data.ts`.
