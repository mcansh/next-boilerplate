import * as React from 'react';
import Head from 'next/head';

const Title: React.FC = ({ children }) => (
  <h1 className="font-semibold text-yellow-400 text-8xl">{children}</h1>
);

const Index = () => (
  <>
    <Head>
      <title>Hello World</title>
    </Head>
    <Title>Hello World</Title>
  </>
);

export default Index;
