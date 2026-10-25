import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: `About ${site.name}, an independent publication of technical research essays and exploratory notes.`,
};

export default function AboutPage() {
  return (
    <div>
      <header className="page-header">
        <p className="section-label">About</p>
        <h1 className="page-header__title">About {site.name}</h1>
      </header>

      <div className="prose">
        <p>
          {site.name} is a personal research journal where I collect my learnings and
          experiments. There’s a lot that goes on in my mind when I work, and not all of it
          fits into a research paper, so I write it here instead. Usually about STEM
          subjects. Why? Because STEM is fun.
        </p>
        <p>
          To know more about me, you can check out my{' '}
          <a href={site.authorUrl} target="_blank" rel="noopener noreferrer">
            personal website
          </a>
          .
        </p>
        <p>
          Thanks,
          <br />
          {site.author}
        </p>
      </div>
    </div>
  );
}
