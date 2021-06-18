import React from 'react';
import styled from 'styled-components';

const Heading = styled.h1`
  font-size: max(24px, 5vw);
  color: red;
`;

export const App = () => {
  return <Heading>Hello Jdi!</Heading>;
};
