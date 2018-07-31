import React from 'react'
import Head from 'next/head'
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 3rem;
  color: ${props => props.theme.primary};
`;

const Index = () => (
  <>
    <Head>
      <title>Hello World</title>
    </Head>
    <Title>Hello World</Title>
  </>
);

export default Index;
