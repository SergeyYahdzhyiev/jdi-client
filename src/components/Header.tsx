import React from 'react';
import styled from 'styled-components';

const TopBar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-top: 20px;
  padding-left: max(20px, 5vw);
  padding-right: max(20px, 5vw);
  padding-bottom: 20px;

  border-bottom: 2px solid var(--clr-text-secondary);
  box-shadow: var(--box-shadow-primary);
`;

export const Header: React.FC = () => {
  return <TopBar></TopBar>;
};
