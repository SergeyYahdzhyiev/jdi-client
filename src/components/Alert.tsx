import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';
import { useStores } from '../hooks/stores.hook';

const AlertContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  padding: 20px;

  display: flex;
  align-items: center;

  background: rgba(0, 0, 0, 0.9);
  color: white;

  cursor: pointer;

  animation: fade-in 300ms ease-in;

  @media (min-width: 768px) {
    position: absolute;
    right: 0;
    left: unset;

    margin: 1rem;
  }
`;

export const Alert: React.FC = observer(() => {
  const { alertStore } = useStores();

  return alertStore.isShowing ? (
    <AlertContainer onClick={() => alertStore.hideAlert()}>{alertStore.message}</AlertContainer>
  ) : null;
});
