# PeptideWiki

A comprehensive, evidence-based peptide research database — mechanisms of action,
clinical-trial data, dosage protocols, vendor price comparisons, molecular
structures, and an AI assistant. Built with Next.js (App Router), Supabase, and
Tailwind CSS.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

See `.env.example`. Key variables:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase database access. |
| `NEXT_PUBLIC_SITE_URL` | Canonical production origin used for SEO (sitemap, robots, canonical URLs, Open Graph, JSON-LD). No trailing slash. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification token (optional). |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Bing Webmaster Tools verification token (optional). |

## SEO

This project ships a full technical-SEO foundation:

- **`app/sitemap.ts`** — dynamic sitemap (static routes + every peptide), revalidated hourly. Served at `/sitemap.xml`.
- **`app/robots.ts`** — `robots.txt` allowing crawl of public pages, disallowing `/admin` and `/api`, and pointing to the sitemap.
- **`app/manifest.ts`** — PWA web manifest.
- **`app/opengraph-image.tsx`** — default 1200×630 social share card.
- **Per-page metadata** — titles, descriptions, canonical URLs, and Open Graph/Twitter tags on every route (`lib/site.ts` is the single source of truth).
- **Structured data (`components/JsonLd.tsx`)** — site-wide `Organization` + `WebSite` (with sitelinks `SearchAction`); per-peptide `BreadcrumbList` + `MedicalWebPage`/`Drug`.
- **Trust / E-E-A-T pages** — About, Editorial & Sourcing Policy, Medical Disclaimer, Affiliate Disclosure, Privacy Policy, Terms, Contact.

### After deploying

1. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
2. Verify the domain in [Google Search Console](https://search.google.com/search-console) and submit `/sitemap.xml`.
3. Add `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (and optionally Bing).
4. Validate a peptide page with the [Rich Results Test](https://search.google.com/test/rich-results).

## Project structure

- `app/` — App Router pages, API routes, and SEO route handlers.
- `components/` — UI components.
- `data/` — static peptide and stack data.
- `lib/` — Supabase client, types, utilities, scrapers, and site config.

## Deploy

Deploys on [Vercel](https://vercel.com). Cron jobs (inventory sync + AI scraper)
are configured in `vercel.json`.
