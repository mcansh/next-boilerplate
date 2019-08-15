import React from 'react';

import IndexPage from '~/pages/index';
import { render } from '~/test-utils';

it('renders correctly', () => {
  const { container } = render(<IndexPage />);
  expect(container.querySelector('h1')).toHaveTextContent('Hello World');
});
