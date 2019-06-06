// import original module declaration
import 'styled-components';
import theme from '~/config';

type ThemeInterface = typeof theme;

// and extend it
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeInterface {
    [key: string]: string;
  }
}
