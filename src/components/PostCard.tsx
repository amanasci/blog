import Link from 'next/link';
import type { Post } from '@/lib/mdx';
import { postPath } from '@/lib/paths';
import { formatDate } from '@/lib/format';

export default function PostCard({ post }: { post: Post }) {
  const categories = post.meta.categories ?? [];
  const synopsis = post.meta.synopsis ?? post.meta.abstract ?? post.meta.description ?? '';

  return (
    <article className="post-card">
      <div className="post-card__kicker">
        {categories.map((category) => (
          <span key={category} className="pill pill--ghost">
            {category}
          </span>
        ))}
        <time className="post-card__date" dateTime={post.meta.date}>
          {formatDate(post.meta.date)}
        </time>
      </div>
      <h3 className="post-card__title">
        <Link href={postPath(post.slug)}>{post.meta.title}</Link>
      </h3>
      {synopsis ? <p className="post-card__synopsis">{synopsis}</p> : null}
    </article>
  );
}
