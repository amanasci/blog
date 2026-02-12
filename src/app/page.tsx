import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { format, parseISO, isValid } from 'date-fns';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="posts-container">
      <section className="intro">
        <h1 style={{ marginBottom: "0.5rem" }}>Asci Labs</h1>
        <p className="subtitle" style={{ color: "var(--text-secondary)", fontSize: "1.2rem" }}>
          Explorations in code, physics, and design.
        </p>
      </section>

      <div style={{ marginTop: "4rem" }}>
        {posts.map((post) => (
          <article key={post.slug} style={{ marginBottom: "3rem" }}>
            <Link href={`/blog/${post.slug}`} style={{ display: "block", textDecoration: "none" }}>
              <h2 style={{
                marginTop: 0,
                marginBottom: "0.5rem",
                fontSize: "1.5rem",
                cursor: "pointer"
              }} className="post-title">
                {post.meta.title}
              </h2>
            </Link>

            <div style={{
              fontSize: "0.9rem",
              color: "var(--text-secondary)",
              marginBottom: "0.5rem",
              fontFamily: "var(--font-sans)"
            }}>
              <time dateTime={post.meta.date}>
                {post.meta.date ? (() => {
                  const parsedDate = parseISO(post.meta.date);
                  return isValid(parsedDate) ? format(parsedDate, 'LLLL d, yyyy') : 'No Date';
                })() : 'No Date'}
              </time>
            </div>

            <p style={{ margin: 0 }}>
              {post.meta.description || post.meta.excerpt || "No description available."}
            </p>

            <Link href={`/blog/${post.slug}`} style={{
              fontSize: "0.95rem",
              fontWeight: 500,
              marginTop: "0.5rem",
              display: "inline-block",
              color: "var(--accent-color)"
            }}>
              Read more →
            </Link>
          </article>
        ))}

        {posts.length === 0 && (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
}
