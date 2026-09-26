# Personal Website

My personal site: a short intro, the projects I've built, a travel page with an interactive globe, and a blog for whenever I get around to writing.

Live at [ciciliu.xyz](https://ciciliu.xyz).

## What's here

- **About:** who I am and what I'm working on.
- **Projects:** the hardware and software I've built.
- **Travel:** an interactive globe of the places I've been.
- **Blog:** writing, coming soon.

## Tech

Next.js (App Router) and React with TypeScript, styled with Tailwind CSS. Framer Motion for the animations, react-globe.gl for the globe, and a small visitor counter backed by Upstash Redis. Deployed on Vercel.

## Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

The visitor counter looks for `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in `.env.local`. Without them the count just stays hidden and the rest of the site works fine.
