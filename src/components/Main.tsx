import React from 'react';
import styled from 'styled-components';
import { TodoList } from './TodoList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background: var(--bg-secondary);

  min-height: 80vh;
`;
const Wrapper = styled.div`
  display: flex;

  width: 100%;
  max-width: 1024px;

  padding: 2rem 1rem;
`;

export const Main: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <TodoList />
      </Wrapper>
    </Container>
  );
};
