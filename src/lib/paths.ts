/**
 * Base path handling for GitHub Pages.
 *
 * The deploy workflow injects `basePath: '/blog'` into next.config.mjs at build
 * time (via actions/configure-pages). `next/link` applies that automatically to
 * route URLs, but root-relative references to files in `public/` do not get the
 * prefix. `NEXT_PUBLIC_BASE_PATH` is set alongside it so this helper agrees.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

export function withBasePath(path: string): string {
  if (!path) return basePath || '/';
  if (EXTERNAL.test(path)) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalized}`;
}

/** Canonical article route path. next/link adds basePath automatically. */
export function postPath(slug: string): string {
  return `/blog/${slug}`;
}
