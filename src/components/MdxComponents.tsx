import type {
  AnchorHTMLAttributes,
  ImgHTMLAttributes,
  TableHTMLAttributes,
} from 'react';
import Figure from './Figure';
import Callout from './Callout';

function MdxLink({ href = '', children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = /^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(href);

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

const mdxComponents = {
  img: (props: ImgHTMLAttributes<HTMLImageElement>) => <Figure {...props} />,
  table: (props: TableHTMLAttributes<HTMLTableElement>) => (
    <div className="table-wrap">
      <table {...props} />
    </div>
  ),
  a: MdxLink,
  Callout,
};

export default mdxComponents;
