import Link from 'next/link';
import { getAllPosts, getFeaturedPost } from '@/lib/mdx';
import PostCard from '@/components/PostCard';
import CategoryPill from '@/components/CategoryPill';
import { postPath } from '@/lib/paths';
import { formatDate } from '@/lib/format';
import { site } from '@/lib/site';

export default function Home() {
  const posts = getAllPosts();
  const featured = getFeaturedPost(posts);
  const latest = posts.filter((post) => post.slug !== featured?.slug).slice(0, 5);

  const featuredAbstract =
    featured?.meta.abstract ?? featured?.meta.synopsis ?? featured?.meta.description ?? '';

  return (
    <div className="front-page">
      <section className="lede">
        <p className="section-label">{site.volume}</p>
        <h1 className="lede__title">
          An independent journal of physics, computation, and curiosity.
        </h1>
        <p className="lede__text">
          {site.name} collects technical research essays and exploratory notes: worked
          problems, field notes, and the occasional detour. Written to be read the way a
          paper is read, with care and with the working shown.
        </p>
        <p className="lede__meta meta">
          <span>{posts.length} contributions</span>
          <span className="meta__sep" aria-hidden="true" />
          <span>Published from {new Date().getFullYear()}</span>
        </p>
      </section>

      {featured ? (
        <section className="front-section" aria-labelledby="featured-heading">
          <div className="front-section__head">
            <h2 id="featured-heading" className="section-label">
              Featured
            </h2>
            <Link className="front-section__more" href="/archive">
              All articles →
            </Link>
          </div>

          <article className="featured">
            <div className="featured__kicker">
              {(featured.meta.categories ?? []).map((category) => (
                <CategoryPill key={category} category={category} />
              ))}
              <time className="post-card__date" dateTime={featured.meta.date}>
                {formatDate(featured.meta.date)}
              </time>
            </div>
            <h3 className="featured__title">
              <Link href={postPath(featured.slug)}>{featured.meta.title}</Link>
            </h3>
            {featuredAbstract ? (
              <p className="featured__abstract">{featuredAbstract}</p>
            ) : null}
          </article>
        </section>
      ) : null}

      {latest.length > 0 ? (
        <section className="front-section" aria-labelledby="latest-heading">
          <div className="front-section__head">
            <h2 id="latest-heading" className="section-label">
              Latest
            </h2>
            <Link className="front-section__more" href="/archive">
              View all →
            </Link>
          </div>
          <div className="article-list">
            {latest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
