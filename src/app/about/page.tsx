export const metadata = {
  title: 'About — Asci Labs',
  description: 'About page',
};

export default function AboutPage() {
  return (
    <main style={{ maxWidth: '65ch', margin: '0 auto', padding: '1rem' }}>
      <article>
        <h1>About</h1>
        <p>
            Asci Labs is a personal research blog where I aim to push all my learnings and experiments. There's a lot that goes in my mind when I work but not all of them can go into a research paper. So I'll just push them here. 
        </p>

        To know more about me, you can check out my <a href="https://amanasci.github.io/">personal website</a>. 

        Thanks
        amanasci

      </article>
    </main>
  );
}
