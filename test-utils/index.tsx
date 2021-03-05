import React from 'react';
import { render } from '@testing-library/react';

const renderWithTheme = (children: React.ReactNode) =>
  render(<div>{children}</div>);

export * from '@testing-library/react';
export { renderWithTheme as render };
