import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export type PostMeta = {
  title: string;
  date: string;
  categories?: string[];
  tags?: string[];
  synopsis?: string;
  description?: string;
  abstract?: string;
  keywords?: string[];
  authors?: string[];
  numbered?: boolean;
  featured?: boolean;
  draft?: boolean;
  layout?: string;
  [key: string]: unknown;
};

export type Post = {
  slug: string;
  meta: PostMeta;
  /** Raw Markdown body (frontmatter stripped). */
  content: string;
};

function normalizeDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  return typeof value === 'string' ? value : '';
}

function parseFile(contents: string): Pick<Post, 'meta' | 'content'> {
  const { content, data } = matter(contents);
  const meta = { ...data, date: normalizeDate(data.date) } as PostMeta;
  return { meta, content };
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return { slug: realSlug, ...parseFile(fileContents) };
  } catch {
    return undefined;
  }
}

export function getAllPosts(): Post[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => ({
      slug: fileName.replace(/\.md$/, ''),
      ...parseFile(fs.readFileSync(path.join(postsDirectory, fileName), 'utf8')),
    }))
    .filter((post) => !post.meta.draft)
    .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export function getFeaturedPost(posts: Post[] = getAllPosts()): Post | undefined {
  return posts.find((post) => post.meta.featured) ?? posts[0];
}

export function getAdjacentPosts(slug: string): { newer?: Post; older?: Post } {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  return {
    newer: index > 0 ? posts[index - 1] : undefined,
    older: index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined,
  };
}

export function getAllCategories(): string[] {
  const categories = new Set<string>();
  for (const post of getAllPosts()) {
    for (const category of post.meta.categories ?? []) {
      categories.add(category);
    }
  }
  return [...categories].sort((a, b) => a.localeCompare(b));
}

export function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
