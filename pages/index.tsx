import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 10rem;
  color: ${props => props.theme.primary};
`;

const Index = () => <Title>Hello World</Title>;

export default Index;
