/* eslint-disable @typescript-eslint/no-empty-interface, no-duplicate-imports, import/no-duplicates */

// Strongly type the styled-components theme
import {} from 'styled-components';
import type { CSSProp } from 'styled-components';

import type { theme } from '~/config';

declare module 'react' {
  interface Attributes {
    css?: CSSProp | CSSObject;
  }
}

declare module 'styled-components' {
  type Theme = typeof theme;
  export interface DefaultTheme extends Theme {}
}
