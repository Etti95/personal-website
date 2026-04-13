# CLAUDE.md

## Project overview

Personal portfolio website for Etiosa Richmore — Full-Stack Data Analyst & Analytics Engineer. Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4. Deployed on Vercel with auto-deploy on push to `main`.

## Adding a new project

1. Create an MDX file in `src/content/projects/<slug>.mdx`
2. Include frontmatter matching the `ProjectMetadata` interface in `src/lib/projects.ts`:
   ```yaml
   title: string (required)
   summary: string (required)
   featured: boolean (required — set true to show on homepage)
   tags: string[] (required)
   startDate: YYYY-MM-DD (required)
   endDate: YYYY-MM-DD (optional)
   repoUrl: string (optional)
   demoUrl: string (optional)
   metric: string (optional — shown as badge on card)
   ```
3. Write the case study body using the Problem / Approach / Outcome structure
4. Commit and push to `main` — Vercel auto-deploys

## Key paths

- `src/content/projects/` — MDX project files (the content)
- `src/lib/projects.ts` — project loading, sorting, filtering logic
- `src/app/page.tsx` — homepage (hero + featured projects grid)
- `src/app/projects/page.tsx` — all projects listing
- `src/app/projects/[slug]/page.tsx` — individual project detail page
- `src/app/projects/ubuntu-dashboard/` — embedded sub-app with its own layout, API routes, and pages
- `src/components/project-card.tsx` — project card component used in grids

## Conventions

- All projects are currently marked `featured: true`
- Projects sorted by `startDate` descending (newest first)
- Case study structure: Problem, Approach (with bullet points), Outcome
- Tags reflect the actual tech stack used
- Metric should be a concise, impressive stat

## Git workflow

- Push directly to `main` — no PR workflow for this repo
- Never include `Co-Authored-By` lines in commits — sole author is the user
