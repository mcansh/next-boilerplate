import { Interpolation } from 'styled-components';
import theme from '~/config';

type ThemeInterface = typeof theme;

declare module 'react' {
  interface DOMAttributes<T> {
    css?: Interpolation<ThemeInterface>;
  }
}
