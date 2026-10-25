import type { PostMeta } from '@/lib/mdx';
import CategoryPill from './CategoryPill';
import { formatDate } from '@/lib/format';
import { site } from '@/lib/site';

export default function ArticleHeader({
  meta,
  readingTime,
}: {
  meta: PostMeta;
  readingTime: number;
}) {
  const categories = meta.categories ?? [];
  const keywords = meta.keywords ?? [];
  const authors = meta.authors?.length ? meta.authors : [site.author];
  const date = formatDate(meta.date);
  const hasTags = categories.length + keywords.length > 0;

  return (
    <header className="paper__masthead">
      <p className="paper__journal">{site.name}</p>

      <h1 className="paper__title">{meta.title}</h1>

      <p className="paper__byline">{authors.join(', ')}</p>

      <div className="paper__meta meta">
        {date ? <time dateTime={meta.date}>{date}</time> : null}
        <span className="meta__sep" aria-hidden="true" />
        <span>{readingTime} min read</span>
      </div>

      {hasTags ? (
        <div className="paper__tags">
          {categories.map((category) => (
            <CategoryPill key={category} category={category} />
          ))}
          {keywords.map((keyword) => (
            <span key={keyword} className="pill pill--ghost">
              {keyword}
            </span>
          ))}
        </div>
      ) : null}
    </header>
  );
}
