import React from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '~/config';
import { GlobalStyle } from '~/components/styles/global-style';
import { useServiceWorker } from '~/hooks/use-service-worker';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useServiceWorker();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export { Layout };
