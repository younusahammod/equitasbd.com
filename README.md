# EQUITAS Law Firm Website

Professional law firm website built with Vite, React, and TypeScript.

## Quick Start

- Install dependencies: `pnpm install`
- Start the website locally: `pnpm run dev:site`
- Create the production build: `pnpm run build:site`
- Preview the built site: `pnpm run preview:site`

## Static Hosting

The website is prepared for static deployment.

1. Run `pnpm run build:site`
2. Upload the contents of `artifacts/equitas-law-firm/dist`
3. Deploy to any static host such as Netlify, Vercel, GitHub Pages, or Cloudflare Pages

## Notes

- Client-side navigation uses hash routing for reliable static hosting
- The contact form is currently a demo submission flow and can be connected to a live backend later
