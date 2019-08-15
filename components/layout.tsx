import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from '~/config';
import GlobalStyle from '~/components/styles/global-style';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/sw.js')
          .then(() => console.log('Service Worker registered successfully'))
          .catch(() => console.warn('Service Worker failed to register'));
      }
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        {children}
      </>
    </ThemeProvider>
  );
};

export default Layout;
