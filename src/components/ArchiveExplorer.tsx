'use client';

import { useMemo, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { postPath } from '@/lib/paths';
import { formatDate } from '@/lib/format';

export type ArchiveItem = {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  synopsis: string;
};

function subscribeToUrl() {
  // The value is only needed as an initial deep-link; navigation remounts the page.
  return () => {};
}

function readCategoryFromUrl(): string {
  return new URLSearchParams(window.location.search).get('category') ?? '';
}

function readServerCategory(): string {
  return '';
}

export default function ArchiveExplorer({
  posts,
  categories,
}: {
  posts: ArchiveItem[];
  categories: string[];
}) {
  const urlCategory = useSyncExternalStore(
    subscribeToUrl,
    readCategoryFromUrl,
    readServerCategory,
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const category = selected ?? urlCategory;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return posts.filter((post) => {
      if (category && !post.categories.includes(category)) return false;
      if (!q) return true;

      return (
        post.title.toLowerCase().includes(q) ||
        post.synopsis.toLowerCase().includes(q) ||
        post.categories.join(' ').toLowerCase().includes(q)
      );
    });
  }, [posts, query, category]);

  const groups = useMemo(() => {
    const byYear = new Map<string, ArchiveItem[]>();

    for (const post of filtered) {
      const year = post.date ? post.date.slice(0, 4) : 'Undated';
      const list = byYear.get(year) ?? [];
      list.push(post);
      byYear.set(year, list);
    }

    return [...byYear.entries()];
  }, [filtered]);

  return (
    <>
      <div className="archive__controls">
        <div className="search">
          <label className="sr-only" htmlFor="archive-search">
            Search articles
          </label>
          <input
            id="archive-search"
            className="search__input"
            type="search"
            placeholder="Search titles, topics, categories…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <div className="chips" role="group" aria-label="Filter by category">
          <button
            type="button"
            className="chip"
            aria-pressed={category === ''}
            onClick={() => setSelected('')}
          >
            All
          </button>
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className="chip"
              aria-pressed={category === item}
              onClick={() => setSelected(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <p className="archive__count" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
        </p>
      </div>

      {groups.length === 0 ? (
        <p className="archive__empty">No articles match your search.</p>
      ) : (
        groups.map(([year, items]) => (
          <section key={year} className="year-group" aria-label={`${year} articles`}>
            <span className="section-label year-group__label">{year}</span>
            <div className="article-list">
              {items.map((post) => (
                <article key={post.slug} className="post-card">
                  <div className="post-card__kicker">
                    {post.categories.map((item) => (
                      <span key={item} className="pill pill--ghost">
                        {item}
                      </span>
                    ))}
                    <time className="post-card__date" dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                  </div>
                  <h3 className="post-card__title">
                    <Link href={postPath(post.slug)}>{post.title}</Link>
                  </h3>
                  {post.synopsis ? (
                    <p className="post-card__synopsis">{post.synopsis}</p>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ))
      )}
    </>
  );
}
