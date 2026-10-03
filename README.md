# JabsAndTabs

Independent, evidence-based comparison and education site about UK GLP-1 weight-loss medicines (Mounjaro, Wegovy, liraglutide, Wegovy tablets, Foundayo) and the regulated providers that prescribe them.

Read `CONTRACTS.md` before contributing. It defines the stack, the URL scheme, the MDX article format and the compliance rules.

## Stack

- Next.js 15 (App Router, React Server Components), React 19, TypeScript (strict)
- Tailwind CSS v4 (tokens in `src/app/globals.css`) and shadcn-style components in `src/components/ui`
- MDX articles in `content/articles`, compiled with `@mdx-js/mdx` (remark-gfm, rehype-slug)
- PostgreSQL and Prisma 6 (optional: the site builds from `src/data` with no database)
- Fuse.js client-side search over a build-time index (`/search-index.json`)

## Setup

```bash
cp .env.example .env.local   # all flags default to false
npm install                  # runs `prisma generate`
npm run dev                  # http://localhost:3000
```

With a database:

```bash
# set DATABASE_URL in .env.local
npm run db:push              # create tables
npm run db:seed              # load src/data into Postgres
```

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Development server (unreviewed articles are visible in dev) |
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` | ESLint (`next/core-web-vitals`, `next/typescript`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run db:push` / `db:migrate` / `db:seed` / `db:studio` | Prisma helpers |

## Project layout

```
content/articles/        MDX articles (files starting with _ are ignored)
content/plan/pillars.json  Pillar plan, used to pick related guides
prisma/                  schema.prisma and seed.ts
src/app/                 Routes. [slug] and [slug]/[sub] are driven by the route registry
src/components/          ui, layout, seo, affiliate, comparison, content, medication, provider, tools, search, home
src/config/              flags.ts, site.ts, methodology.ts
src/data/                Static data (fallback when there is no DATABASE_URL)
src/lib/routes.ts        THE route registry: every programmatic URL, flag-aware
src/lib/repo.ts          Data access (Prisma or static)
src/lib/content.ts       Article loader and frontmatter validation (zod)
src/lib/mdx.tsx          MDX renderer with the allowed components only
src/lib/seo.ts / schema.ts  Metadata and JSON-LD builders
src/middleware.ts        HTTP Basic Auth for /admin
```

## Compliance flags

All flags live in `src/config/flags.ts`, are read from environment variables on the server only, and **default to off**. Do not enable one without written sign-off from a UK regulatory/legal adviser, recorded in `docs/compliance/SIGN-OFF.md`.

| Variable | When on | When off (default) |
|---|---|---|
| `FLAG_POM_PRICING` | Drug-price columns on `/prices`, "lowest recorded price" module, `/providers/{p}/{med}/{dose}` pages, consultation fees | `/prices` becomes a service comparison (consultation model, delivery, support, regulator status, maintenance policy) with a notice explaining why; dose pages are not generated; price data is never sent to the browser |
| `FLAG_AFFILIATE_LINKS` | Provider CTAs go via `/go/{provider}` (anonymous click log, 302 to the active tracking URL, `rel="sponsored nofollow"`) | CTAs link to our own `/providers/{slug}` review; `/go/*` redirects there too |
| `FLAG_DISCOUNT_CODES` | `/providers/{p}/discount-codes` and the "latest offers" module (verified, active offers only) | Routes not generated, modules hidden |
| `FLAG_STICKY_CTA` | Sticky mobile bar linking to our comparison pages | Hidden |
| `FLAG_SHOW_UNREVIEWED_CONTENT` | Articles not yet clinically reviewed are shown in production | Only `clinically-reviewed` articles are published. Never enable in production |

`INCLUDE_SAMPLE_CONTENT=true` includes `content/articles/_*.mdx` files outside production.

### How gating works

1. **Routes.** `src/lib/routes.ts` excludes gated URLs from `generateStaticParams`, the sitemap and the search index when the flag is off. Gated pages also call `notFound()` themselves, and `dynamicParams = false` means unknown paths return 404.
2. **Components.** Gated components (`CheapestToday`, `LatestDiscounts`, `StickyCta`, `ProviderPrices`) read the flag on the server and render a compliant alternative or nothing.
3. **Client components** never read flags. The server computes CTA targets (`getProviderCta`) and only sends price rows when `FLAG_POM_PRICING` is on.
4. **Articles.** `src/lib/content.ts` hides articles that are not `clinically-reviewed` in production builds. They stay visible in `next dev` so writers can preview them. Unreviewed pages are always `noindex`.
5. **Indexing.** Pages with unverified data (provider `verified: false`, medication `ukStatus: "verify"` or `dosesVerified: false`, unreviewed articles, empty topic pages) render with `robots: noindex` and a visible "being verified" notice, and are left out of the sitemap.
6. **Structured data.** No Review or AggregateRating markup is emitted unless a provider is verified and has a real methodology score. MedicalWebPage gets `reviewedBy`/`lastReviewed` only for articles signed off by a reviewer with a professional registration.

## Mounted pillars

An article with frontmatter `canonicalPath` (for example `/mounjaro-side-effects`) is rendered at that programmatic URL, with the data modules (dose table, side-effect list, comparison table) above the article body. `/guides/{slug}` 301-redirects there (generated in `next.config.ts`), and internal MDX links are rewritten to the canonical URL. See `CONTRACTS.md` §2.

## Admin

`/admin` is a minimal CMS for providers and price points. It needs `DATABASE_URL`, plus `ADMIN_USER` and `ADMIN_PASSWORD` for HTTP Basic Auth. If either credential is missing, `/admin` returns 404. Every save writes an `EditorialAudit` row. Use HTTPS in production: Basic Auth sends credentials with every request.

## Before launch

- Complete `site.publisher` and every `[PLACEHOLDER]` on the trust pages.
- Verify every provider (GPhC/CQC registers, provider site, Trustpilot) in the admin. Unverified providers stay `noindex`.
- Appoint a registered medical reviewer, add them to `src/data/authors.ts` with their registration, and sign off articles.
- Set `NEXT_PUBLIC_SITE_URL`. `robots.txt` blocks all crawling on non-production Vercel deployments.
