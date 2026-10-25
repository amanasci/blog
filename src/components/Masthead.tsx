import Link from 'next/link';
import SiteNav from './SiteNav';
import ThemeToggle from './ThemeToggle';
import { site } from '@/lib/site';

export default function Masthead() {
  return (
    <header className="masthead">
      <div className="masthead__top">
        <Link href="/" className="masthead__brand" aria-label={`${site.name} home`}>
          <span className="masthead__title">{site.name}</span>
          <span className="masthead__tagline">{site.tagline}</span>
        </Link>
        <div className="masthead__actions">
          <ThemeToggle />
        </div>
      </div>
      <div className="masthead__rule" aria-hidden="true" />
      <SiteNav />
    </header>
  );
}
