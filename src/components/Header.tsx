import { observer } from 'mobx-react-lite';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useStores } from '../hooks/stores.hook';

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
const LogoText = styled(NavLink)`
  font-family: 'Big Shoulders Display', coursive;
  font-size: max(42px, 3vw);
  margin: 0;
  font-weight: 300;
  color: var(--text-color-primary);
  text-decoration: none;
`;
const Colored = styled.span`
  color: var(--clr-text-highlight);
  font-weight: 700;
`;
const Menu = styled.nav`
  display: flex;
  align-items: center;
`;
const NLink = styled(NavLink)`
  font-size: max(16px, 1.5vw);
  margin: 0 max(10px, 2vw);
  text-decoration: none;
  color: var(--clr-text-secondary);
  transition: color 0.3s ease;

  &:hover,
  &:focus,
  &.active {
    color: var(--clr-text-highlight);
  }
`;
const UserPanel = styled.div`
  display: flex;
  align-itemd: center;
`;

export const Header: React.FC = observer(() => {
  const { userStore } = useStores();
  const getSideContent = (): JSX.Element => {
    if (userStore.id) {
      return (
        <UserPanel>
          <h4>{userStore.name}</h4>
        </UserPanel>
      );
    }
    return (
      <Menu>
        <NLink to="/login" role="nav-link" activeClassName="active">
          Login
        </NLink>
        <NLink to="/register" role="nav-link">
          Register
        </NLink>
      </Menu>
    );
  };

  return (
    <TopBar>
      <LogoText role="logo" to="/">
        <Colored>J</Colored>ust<Colored>D</Colored>o<Colored>I</Colored>t
      </LogoText>
      {getSideContent()}
    </TopBar>
  );
});
