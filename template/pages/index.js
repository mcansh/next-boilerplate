import React from 'react'
import Head from 'next/head'
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 3rem;
  color: ${props => props.theme.primary};
`;

const Index = () => (
  <>
    <head>
      <title>Hello World</title>
    </head>
    <Title>Hello World</Title>
  </>
);

export default Index;
