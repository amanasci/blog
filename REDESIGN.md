# Asci Labs: Scholarly Redesign

A redesign of https://amanasci.github.io/blog as an independent scholarly publication, built on
the existing Next.js / TypeScript / React / Markdown stack: no framework migration, no backend,
no PDFs.

> **Status:** implemented on branch `redesign/journal`. Not deployed. The production site is
> untouched until this branch is merged into `master`.

## Two visual languages

- **Article pages** render as a *typeset paper sheet* (a simulated printed page): a centered sheet
  on a recessed backdrop, a centered journal/title/byline/date block, an abstract, and numbered
  sections. Modelled on a single-column ICML/ICLR PDF.
- **Homepage, archive, and about** keep the *journal front page* language: masthead, editorial
  lede, featured article, contribution lists.

## Styles and tokens

Single source of truth in `src/styles/globals.css` (CSS custom properties).

- **Type:** Spectral (serif) for titles and body; Inter (sans) for navigation, metadata, labels.
  Fluid heading scale via `clamp()`; paper body 18px / 1.75, justified with hyphenation on wide
  screens and ragged-right on phones.
- **Colour:** warm paper, dark ink, restrained burgundy accent. Light and dark share one token
  set; dark overrides under `[data-theme='dark']`, with a `prefers-color-scheme` fallback for
  no-JS. The paper sheet uses `--paper-raised` over a `--paper-sunken` stage so the page reads as
  a sheet on a desk.
- **Editorial chrome:** double hairline masthead rule, small-caps section labels, hairline rules,
  print stylesheet.

## Article template (paper sheet)

`src/app/blog/[slug]/page.tsx`: same route and slug, so **public URLs are unchanged**.

- `.paper-stage` (recessed backdrop) wraps `.paper` (the sheet, `max-width: 48rem`, bordered and
  shadowed). This fixes the earlier bug where `.article { max-width: 68ch }` confined the whole
  layout to a narrow strip on desktop.
- Centered masthead: journal line (accent), serif title, byline, date and reading time, centered
  category/keyword pills, then a rule.
- Optional **abstract** from frontmatter `abstract`.
- **Numbered sections by default** (paper convention); opt out with `numbered: false`.
- Content features: KaTeX math, figures with numbered captions, scroll-wrapped GFM tables,
  dual-theme syntax-highlighted code, callouts, external-link handling.
- Prev/next navigation and back links sit **below the sheet** as web chrome, outside the page.

## Homepage and archive

- `src/app/page.tsx`: masthead (in layout), editorial lede, featured article, latest
  contributions, "All articles" link.
- `src/app/archive/page.tsx` and `src/components/ArchiveExplorer.tsx`: searchable,
  category-filterable archive grouped by year.
- `src/app/about/page.tsx`: restyled; wording preserved.
- `src/app/not-found.tsx`: styled 404.

## Markdown pipeline

Reused and extended: `next-mdx-remote/rsc` + `remark-math` then `rehype-katex` + `rehype-slug` +
`rehype-autolink-headings`. Changes:

- **Added `remark-gfm`**: pipe tables were previously rendered as literal text (GFM was not
  enabled). Now parsed and wrapped in a scroll container.
- **Dual-theme syntax highlighting**: `rehype-pretty-code` uses
  `{ light: 'github-light', dark: 'github-dark' }` with `keepBackground: false`, switched by the
  emitted `--shiki-light` / `--shiki-dark` variables.
- **Display math normalisation**: `src/lib/markdown.ts#normalizeMathBlocks` rewrites single-line
  `$$...$$` into block display math at render time, because micromark treats single-line `$$` as
  inline math. Source files are untouched.

## Base path and deployment

GitHub Pages serves this project site at `/blog`, and `actions/configure-pages@v5`
(`static_site_generator: next`) **rewrites `next.config.mjs` at build time** to inject
`basePath: '/blog'`. That is preserved; `next.config.mjs` stays patch-friendly (no `basePath`
key). `NEXT_PUBLIC_BASE_PATH=/blog` is set on the CI build step so `src/lib/paths.ts#withBasePath`
prefixes `public/` asset URLs to match.

Article URLs remain `https://amanasci.github.io/blog/blog/<slug>/` (route `/blog/[slug]` plus
basePath `/blog`). Verified by simulating the base-path injection locally.

## Files

**Added:** `src/lib/{site,paths,format,markdown}.ts`;
`src/components/{Masthead,SiteNav,Footer,ThemeScript,ArticleHeader,Abstract,Prose,Figure,Callout,PostCard,ArchiveExplorer,CategoryPill,MdxComponents}.tsx`;
`src/app/archive/page.tsx`; `src/app/not-found.tsx`; `REDESIGN.md`.

**Modified:** `src/app/{layout,page}.tsx`, `src/app/blog/[slug]/page.tsx`, `src/app/about/page.tsx`,
`src/styles/globals.css`, `src/lib/mdx.ts`, `src/components/ThemeToggle.tsx`, `package.json`,
`package-lock.json`, `.github/workflows/nextjs.yml`.

**Removed:** `src/app/globals.css` (dead), `src/components/Header.tsx` (replaced by `Masthead`),
`next.config.ts` (dead, since `next.config.mjs` is the loaded config),
`src/components/TableOfContents.tsx` (ToC dropped from the paper layout).

**Content:** additive frontmatter only, bodies untouched: `abstract` on `2026-02-25-PSF.md` and
`2026-03-07-Context-Compression.md`.

## Verification performed

- `npm run lint` clean (only a pre-existing warning in unused `legacy_jekyll/` JS);
  `npm run build` emits all 6 slugs plus `/`, `/archive`, `/about`, `/_not-found`.
- **URL preservation:** every slug builds to `out/blog/<slug>/index.html`; article hrefs are
  `/blog/blog/<slug>/`.
- **Base path simulation:** links, `_next` assets, and `public/` assets all prefixed with `/blog`.
- **Visual pass** (agent-browser, served from `out/`): homepage light/dark/mobile; article sheet
  light/dark/mobile; sheet on recessed backdrop; centered title/byline/abstract; numbered
  sections; justified body; GFM table wrapped; KaTeX display equations centred; theme toggle
  flips `data-theme` (bg `#16130f`).
- **Accessibility/structure:** single `h1` per page, skip link, `id="main"`, `lang="en"`,
  `aria-pressed` on the theme toggle, prev/next nav.

## Remaining issues / notes

- **Broken remote image**: `2026-02-25-PSF.md` hotlinks a Google `encrypted-tbn3.gstatic.com`
  licensed image that now returns **HTTP 404**, so the Airy-pattern figure renders blank (its
  caption still shows). Replace it with a locally hosted image.
- The Open Graph image reuses `assets/images/background.jpg`; a purpose-built 1200x630 card would
  be better.
- `legacy_jekyll/` is retained (unused by the Next build); its JS triggers one lint warning.
- Search/filtering is client-side only, which is appropriate for a static export.
