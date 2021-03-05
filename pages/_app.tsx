import React from 'react';
import type { AppProps } from 'next/app';

import { Layout } from '~/components/layout';

import '../styles/index.css';

const App: React.VFC<AppProps> = ({ Component, pageProps }) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default App;
