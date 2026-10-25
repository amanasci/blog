import Link from 'next/link';
import { site } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>
          © {year} {site.name}. An independent publication on {site.tagline.toLowerCase()}.
        </p>
        <nav className="site-footer__nav" aria-label="Footer">
          <Link href="/archive">Archive</Link>
          <Link href="/about">About</Link>
          <a
            href={site.authorUrl}
            target="_blank"
            rel="noopener noreferrer me"
          >
            {site.author}
          </a>
        </nav>
      </div>
    </footer>
  );
}
