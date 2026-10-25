import type { ReactNode } from 'react';

export default function Prose({
  children,
  numbered,
}: {
  children: ReactNode;
  numbered?: boolean;
}) {
  return <div className={numbered ? 'prose numbered' : 'prose'}>{children}</div>;
}
