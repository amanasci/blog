import type { ImgHTMLAttributes } from 'react';

type FigureProps = ImgHTMLAttributes<HTMLImageElement>;

export default function Figure({ src, alt, title, ...rest }: FigureProps) {
  const caption = title ?? alt ?? '';

  return (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element -- Markdown images may be remote; next/image needs per-domain config */}
      <img src={src} alt={alt ?? ''} loading="lazy" decoding="async" {...rest} />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
