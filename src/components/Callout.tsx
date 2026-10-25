import type { ReactNode } from 'react';

type CalloutType = 'note' | 'warning' | 'info';

type CalloutProps = {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
};

export default function Callout({ type = 'note', title, children }: CalloutProps) {
  return (
    <aside className={`callout callout--${type}`}>
      {title ? <span className="callout__label">{title}</span> : null}
      <div>{children}</div>
    </aside>
  );
}
