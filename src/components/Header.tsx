import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';
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

  max-height: 100%;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  align-items: flex-end;

  max-height: 100%;
`;
const UserName = styled.h4`
  margin: 0;
  font-size: 14px;

  @media screen and (min-width: 768px) {
    font-size: 16px;
  }
`;
const UserEmail = styled.p`
  margin: 0;
  font-size: 10px;

  @media screen and (min-width: 768px) {
    font-size: 12px;
  }
`;
const LogoutLink = styled(NavLink)`
  font-size: 12px;
  font-weight: 700;
  color: var(--clr-text-highlight);
  text-decoration: none;

  @media screen and (min-width: 768px) {
    font-size: 14px;
  }

  &:hover {
    text-decoration: underline;
  }
`;
const UserAvatar = styled.div`
  position: relative;
  width: 50px;
  height: 50px;

  margin-left: 1rem;

  border-radius: 50%;

  overflow: hidden;

  img {
    position: absolute;
    width: 100%;
    height: 100%;

    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    object-fit: cover;
  }
`;

export const Header: React.FC = observer(() => {
  const { userStore } = useStores();
  const getSideContent = useCallback((): JSX.Element => {
    if (userStore.id) {
      return (
        <UserPanel>
          <UserInfo>
            <UserName>{userStore.name}</UserName>
            <UserEmail>{userStore.email}</UserEmail>
            <LogoutLink to="/" onClick={() => userStore.unsetUser()}>
              Log Out
            </LogoutLink>
          </UserInfo>
          <UserAvatar>
            <img src={userStore.avatar} alt="avatar" />
          </UserAvatar>
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
  }, [userStore.id, userStore.name]);

  useEffect(() => {
    if (userStore.token) {
      userStore.setDetails();
    }
  }, [userStore.token]);

  return (
    <TopBar>
      <LogoText role="logo" to="/">
        <Colored>J</Colored>ust<Colored>D</Colored>o<Colored>I</Colored>t
      </LogoText>
      {getSideContent()}
    </TopBar>
  );
});
