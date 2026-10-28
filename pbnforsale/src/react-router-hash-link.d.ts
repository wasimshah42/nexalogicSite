declare module 'react-router-hash-link' {
  import * as React from 'react';

  type HashLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    to: string;
    smooth?: boolean;
    scroll?: ((el: HTMLElement) => void) | null;
    offset?: number | ((el: HTMLElement) => number);
  };

  export const HashLink: React.FC<HashLinkProps>;
}
