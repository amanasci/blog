import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { format, parseISO, isValid } from 'date-fns';

// Plugins
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// Components to be used in MDX
const components = {
    // Add custom components here if needed, e.g. <Callout />
};

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) return;
    return {
        title: `${post.meta.title} | My Blog`,
        description: post.meta.description,
    };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const options = {
        mdxOptions: {
            remarkPlugins: [remarkMath],
            rehypePlugins: [
                rehypeKatex,
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                [rehypePrettyCode, {
                    theme: 'github-dark',
                    keepBackground: true,
                }],
            ],
        },
    };

    return (
        <article className="post">
            <header style={{ marginBottom: "3rem", textAlign: "center" }}>
                <h1 style={{
                    fontSize: "2.5rem",
                    marginBottom: "1rem"
                }}>{post.meta.title}</h1>

                <div style={{ color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
                    <time dateTime={post.meta.date}>
                        {post.meta.date ? (() => {
                            const parsedDate = parseISO(post.meta.date);
                            return isValid(parsedDate) ? format(parsedDate, 'LLLL d, yyyy') : null;
                        })() : null}
                    </time>
                </div>
            </header>

            <div className="mdx-content">
                <MDXRemote
                    source={post.content}
                    components={components}
                    options={options as any}
                />
            </div>

            <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--border-color)" }}>
                <Link href="/" style={{ fontWeight: 500 }}>
                    ← Back to Home
                </Link>
            </div>
        </article>
    );
}
