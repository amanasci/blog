import Link from 'next/link';

export default function CategoryPill({ category }: { category: string }) {
  return (
    <Link className="pill" href={`/archive?category=${encodeURIComponent(category)}`}>
      {category}
    </Link>
  );
}
