'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site } from '@/lib/site';

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="site-nav" aria-label="Primary">
      {site.nav.map((item) => {
        const isActive =
          item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={isActive ? 'is-active' : undefined}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
