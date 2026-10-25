export default function Abstract({ text }: { text: string }) {
  return (
    <section className="abstract" aria-label="Abstract">
      <span className="section-label abstract__label">Abstract</span>
      <div className="abstract__text">{text}</div>
    </section>
  );
}
