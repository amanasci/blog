/**
 * Normalise single-line `$$...$$` math into block (display) math before MDX
 * compilation.
 *
 * micromark treats `$$x$$` written on a single line as *inline* math; display
 * math requires the `$$` delimiters on their own lines. Authoring commonly uses
 * the single-line form, so we rewrite it here at render time. Source files are
 * never modified.
 */
const FENCE = /^\s*(```|~~~)/;
const WHOLE_LINE = /^\s*\$\$(.+?)\$\$\s*$/;
const MATH_SEGMENT = /^\$\$(.+?)\$\$$/;

export function normalizeMathBlocks(markdown: string): string {
  if (!markdown.includes('$$')) return markdown;

  const out: string[] = [];
  let inFence = false;

  for (const line of markdown.split('\n')) {
    if (FENCE.test(line)) {
      inFence = !inFence;
      out.push(line);
      continue;
    }

    if (inFence || !line.includes('$$')) {
      out.push(line);
      continue;
    }

    const whole = WHOLE_LINE.exec(line);
    if (whole) {
      out.push('$$', whole[1].trim(), '$$');
      continue;
    }

    // Leave lone `$$` fences and malformed (odd) delimiter counts untouched.
    const delimiters = line.match(/\$\$/g)?.length ?? 0;
    if (delimiters % 2 !== 0) {
      out.push(line);
      continue;
    }

    for (const part of line.split(/(\$\$.+?\$\$)/g)) {
      if (part === '') continue;
      const math = MATH_SEGMENT.exec(part);
      if (math) {
        out.push('', '$$', math[1].trim(), '$$', '');
      } else {
        out.push('', part.trim(), '');
      }
    }
  }

  return out.join('\n');
}
