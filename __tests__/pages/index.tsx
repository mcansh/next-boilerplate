import React from 'react';

import { render } from '~/test-utils';

it('renders correctly', () => {
  const { container } = render(<h1>Hello World</h1>);
  expect(container.querySelector('h1')).toHaveTextContent('Hello World');
});
