# BMW SHOWCASE

A cinematic BMW M3 E30 showcase built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Sketchfab embeds.

## Overview

This project is a single-page interactive experience inspired by the legacy of the BMW M3 E30. It combines motion-heavy sections, layered visuals, custom UI details, and embedded 3D car presentations to create a premium automotive landing page.

## Features

- Cinematic hero section with animated typography and motion accents
- Interactive BMW M3 E30 model embeds
- Variant showcase for multiple colorways
- Timeline, story, quote, and racing-inspired content sections
- Custom cursor and page loader for a polished experience
- Responsive layout for desktop and mobile

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- GSAP
- Prisma
- shadcn/ui components

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app:

```bash
http://localhost:3000
```

## Available Scripts

- `npm run dev` - start the local development server
- `npm run build` - build the project for production
- `npm run lint` - run ESLint
- `npm run db:push` - push Prisma schema changes
- `npm run db:generate` - generate Prisma client

## Project Structure

```text
src/app/                 Next.js app router files
src/components/bmw/      BMW showcase sections and visual components
src/components/ui/       Reusable UI primitives
public/images/           Static image assets
prisma/                  Prisma schema
db/                      Local database files
```

## Notes

- Sketchfab embeds are used for several vehicle presentations.
- Environment files such as `.env` are intentionally not committed.
- Build artifacts like `.next` and dependencies like `node_modules` are ignored in git.
