import React from 'react';
import styled from 'styled-components';

import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useStores } from '../hooks/stores.hook';

export interface ILoginFormState {
  email: string;
  password: string;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 70vh;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-width: 300px;

  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;

  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.3);

  padding: 2rem;
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  margin: 0 0 1rem 0;
  padding: 0;

  border: none;
`;

const Label = styled.label`
  font-size: max(18px, 1.5vw);
  width: 100%;
  margin-bottom: 0.5em;

  &:not(:first-child) {
    margin-top: 1em;
  }
`;

const Input = styled.input`
  font-size: max(16px, 1vw);
  width: 100%;

  background: whitesmoke;

  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 5px;

  padding: 0.5em 1em;
`;

const SubmitButton = styled.button`
  font-family: 'Lato', sasn-serif;
  font-size: max(18px, 1vw);
  font-weight: 500;
  background: var(--clr-text-highlight);
  color: #fff;
  text-decoration: none;
  border: none;
  border-radius: 1.5em;
  padding: 0.5em 1em;
  transition: all 0.2s ease;
  cursor: pointer;
  width: 100%;

  &:hover,
  &:focus {
    opacity: 0.8;
  }

  &:disabled {
    filter: grayscale(100);
  }
`;

const Link = styled(NavLink)`
  font-size: max(18px, 0.8vw);
  font-weight: 600;
  text-decoration: none;

  margin-top: 1em;

  color: var(--clr-text-highlight);

  &:hover {
    text-decoration: underline;
  }
`;

const Loader = styled.div`
  & {
    display: inline-block;
    position: relative;
    width: 80px;
    height: max(18px, 0.8vw);
  }
  & div {
    position: absolute;
    top: 6px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  & div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  & div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  & div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  & div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`;

export const LoginForm: React.FC = observer(() => {
  const [state, setState] = useState<ILoginFormState>({
    email: '',
    password: '',
  });

  const { authStore } = useStores();

  const changeHandler = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    authStore.login(state);
  };
  return (
    <Container>
      <FormContainer onSubmit={submitHandler}>
        <Fieldset disabled={authStore.isFetching}>
          <Label htmlFor="email">Email:</Label>
          <Input
            name="email"
            type="email"
            required
            value={state.email}
            onChange={changeHandler}
            placeholder="Enter email..."
          />
          <Label htmlFor="password">Password:</Label>
          <Input
            name="password"
            type="password"
            required
            value={state.password}
            onChange={changeHandler}
            placeholder="Enter password..."
          />
        </Fieldset>
        <SubmitButton type="submit" disabled={authStore.isFetching}>
          {!authStore.isFetching ? (
            'Login'
          ) : (
            <Loader>
              <div></div>
              <div></div>
              <div></div>
            </Loader>
          )}
        </SubmitButton>
        <Link to="/register">Register</Link>
      </FormContainer>
    </Container>
  );
});
