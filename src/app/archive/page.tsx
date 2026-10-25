import type { Metadata } from 'next';
import ArchiveExplorer, { type ArchiveItem } from '@/components/ArchiveExplorer';
import { getAllCategories, getAllPosts } from '@/lib/mdx';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Archive',
  description:
    'Every contribution to Asci Labs, in reverse chronological order. Search and filter by category.',
};

export default function ArchivePage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  const items: ArchiveItem[] = posts.map((post) => ({
    slug: post.slug,
    title: post.meta.title,
    date: post.meta.date,
    categories: post.meta.categories ?? [],
    synopsis: post.meta.synopsis ?? post.meta.abstract ?? post.meta.description ?? '',
  }));

  return (
    <div className="archive">
      <header className="archive__header">
        <p className="section-label">Archive</p>
        <h1 className="archive__title">All contributions</h1>
        <p className="archive__intro">
          Every article published in {site.name}, newest first. Use search and the category
          filters to narrow the list.
        </p>
      </header>

      <ArchiveExplorer posts={items} categories={categories} />
    </div>
  );
}
