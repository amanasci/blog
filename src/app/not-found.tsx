import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="notfound">
      <p className="notfound__code">404</p>
      <h1 className="notfound__title">This page could not be found</h1>
      <p>
        The article or page you’re looking for does not exist, or it may have moved.
      </p>
      <p>
        <Link href="/">← Back to the front page</Link>
      </p>
    </div>
  );
}
