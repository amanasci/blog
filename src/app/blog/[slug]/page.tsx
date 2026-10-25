import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';

import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import ArticleHeader from '@/components/ArticleHeader';
import Abstract from '@/components/Abstract';
import Prose from '@/components/Prose';
import mdxComponents from '@/components/MdxComponents';
import { postPath } from '@/lib/paths';
import { normalizeMathBlocks } from '@/lib/markdown';
import {
  estimateReadingTime,
  getAllPosts,
  getAdjacentPosts,
  getPostBySlug,
} from '@/lib/mdx';

type PageParams = { params: Promise<{ slug: string }> };

const mdxOptions: MDXRemoteProps['options'] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [
        rehypePrettyCode,
        {
          theme: { light: 'github-light', dark: 'github-dark' },
          keepBackground: false,
        },
      ],
    ],
  },
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  const description =
    post.meta.description ?? post.meta.synopsis ?? post.meta.abstract ?? undefined;

  return {
    title: post.meta.title,
    description,
    openGraph: {
      title: post.meta.title,
      description,
      type: 'article',
      publishedTime: post.meta.date || undefined,
      tags: post.meta.categories,
    },
  };
}

export default async function BlogPost({ params }: PageParams) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { newer, older } = getAdjacentPosts(post.slug);
  const numbered = post.meta.numbered ?? true;

  return (
    <div className="paper-stage">
      <article className="paper">
        <ArticleHeader meta={post.meta} readingTime={estimateReadingTime(post.content)} />

        <hr className="paper__rule" />

        {post.meta.abstract ? <Abstract text={post.meta.abstract} /> : null}

        <Prose numbered={numbered}>
          <MDXRemote
            source={normalizeMathBlocks(post.content)}
            components={mdxComponents}
            options={mdxOptions}
          />
        </Prose>
      </article>

      <div className="paper-nav">
        {(newer || older) && (
          <nav className="article-nav" aria-label="More articles">
            {newer ? (
              <Link
                href={postPath(newer.slug)}
                className="article-nav__item article-nav__item--prev"
                rel="prev"
              >
                <span className="article-nav__dir">Newer</span>
                <span className="article-nav__title">{newer.meta.title}</span>
              </Link>
            ) : null}
            {older ? (
              <Link
                href={postPath(older.slug)}
                className="article-nav__item article-nav__item--next"
                rel="next"
              >
                <span className="article-nav__dir">Older</span>
                <span className="article-nav__title">{older.meta.title}</span>
              </Link>
            ) : null}
          </nav>
        )}

        <div className="backlinks">
          <Link href="/archive">← Archive</Link>
          <Link href="/">← Home</Link>
        </div>
      </div>
    </div>
  );
}
