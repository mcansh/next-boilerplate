import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';

import { theme } from '~/config';

const renderWithTheme = (children: React.ReactNode) =>
  render(
    <ThemeProvider theme={theme}>
      <div>{children}</div>
    </ThemeProvider>
  );

export * from '@testing-library/react';
export { renderWithTheme as render };
