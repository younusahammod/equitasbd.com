# EQUITAS Law Firm Website

Professional law firm website built with Vite, React, and TypeScript.

## Quick Start

- Install dependencies: `pnpm install`
- Start the website locally: `pnpm run dev:site`
- Create the production build: `pnpm run build:site`
- Preview the built site: `pnpm run preview:site`

## Static Hosting

The website is prepared for static deployment.

1. Run `pnpm run build`
2. The generated `dist` folder can be committed and hosted directly
3. Deploy to any static host such as Netlify, Vercel, GitHub Pages, or Cloudflare Pages

### No-Build Hosting

If you want hosting without any build step, use the already-generated `dist` folder from the repository.

- Build command: leave empty
- Deploy command: leave empty
- Output directory: `dist`

### Cloudflare Pages

- Build command: leave empty
- Deploy command: leave empty
- Build output directory: `dist`

## Notes

- Client-side navigation uses hash routing for reliable static hosting
- The contact form is currently a demo submission flow and can be connected to a live backend later
