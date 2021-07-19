import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { NavLink, useHistory } from 'react-router-dom';
import { AvatarUploader } from './AvatarUploader';
import { useStores } from '../hooks/stores.hook';
import { observer } from 'mobx-react-lite';

export interface IRegisterFormState {
  email: string;
  userName: string;
  password: string;
  cpassword: string;
  avatar: string;
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
  margin: 2rem 0;
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  margin: 0 0 1rem 0;
  padding: 0;

  border: none;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    &:first-child {
      margin-right: 1rem;
    }
  }
`;

const Label = styled.label`
  position: relative;
  font-size: max(18px, 1.5vw);
  width: 100%;
  margin-bottom: 0.5em;
  margin-top: 1.5em;

  &[for='password']::after {
    content: 'Minimum 8 characters, 1 capital, 1 number';
    position: absolute;
    display: block;
    left: 0;
    top: calc(100% + 50px);
    opacity: 0.5;
    font-size: 10px;
    line-height: 1.5;
    padding-left: 5px;
  }

  &.error {
    &[for='password']::after {
      color: red;
    }
  }
`;

const Input = styled.input`
  position: relative;
  font-size: max(16px, 1vw);
  width: 100%;

  background: whitesmoke;

  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 5px;

  padding: 0.5em 1em;

  &.error {
    outline-color: red;
  }
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
  margin-top: 1em;
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

export const RegisterForm: React.FC = observer(() => {
  const [state, setState] = useState<IRegisterFormState>({
    email: '',
    userName: '',
    password: '',
    cpassword: '',
    avatar: '',
  });

  const history = useHistory();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordLabelRef = useRef<HTMLLabelElement>(null);
  const cpasswordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const { alertStore, authStore } = useStores();

  const highlightInvalidInput = (message) => {
    const highlight = (target: HTMLInputElement) => {
      target.classList.add('error');
      target.focus();
    };
    if (/email/.test(message)) highlight(emailRef.current);
    if (/username/.test(message)) highlight(nameRef.current);
    if (/password/.test(message)) {
      highlight(passwordRef.current);
      passwordLabelRef.current.classList.add('error');
    }
  };

  const changeHandler = (e) => {
    e.target.classList.remove('error');
    if (e.target === passwordRef.current) passwordLabelRef.current.classList.remove('error');
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (state.password !== state.cpassword) {
      alertStore.showAlert('Passwords do not match!');
      cpasswordRef.current.classList.add('error');
      cpasswordRef.current.focus();
    } else {
      await authStore.register(state);
      if (!authStore.error) {
        setTimeout(() => history.push('/'), 500);
      } else {
        highlightInvalidInput(alertStore.message);
      }
    }
  };

  return (
    <Container>
      <FormContainer onSubmit={submitHandler}>
        <Fieldset disabled={authStore.isFetching}>
          <Col>
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              name="email"
              value={state.email}
              onChange={changeHandler}
              placeholder="Enter email..."
              ref={emailRef}
              required
            />
            <Label htmlFor="password" ref={passwordLabelRef}>
              Password:
            </Label>
            <Input
              type="password"
              name="password"
              value={state.password}
              onChange={changeHandler}
              placeholder="Enter password..."
              ref={passwordRef}
              required
            />
            <Label htmlFor="cpassword">Confirm Password:</Label>
            <Input
              type="password"
              name="cpassword"
              value={state.cpassword}
              onChange={changeHandler}
              placeholder="Enter passsword..."
              ref={cpasswordRef}
              required
            />
          </Col>
          <Col>
            <Label htmlFor="userName">Username:</Label>
            <Input
              type="text"
              name="userName"
              value={state.userName}
              onChange={changeHandler}
              placeholder="Enter username..."
              ref={nameRef}
              required
            />
            <Label htmlFor="avatar">Avatar:</Label>
            <AvatarUploader
              inputName="avatar"
              size={100}
              onCrop={(avatarUrl) => setState((prev) => ({ ...prev, avatar: avatarUrl }))}
            />
          </Col>
        </Fieldset>
        <SubmitButton type="submit" disabled={authStore.isFetching}>
          {authStore.isFetching ? (
            <Loader>
              <div></div>
              <div></div>
              <div></div>
            </Loader>
          ) : (
            'Register'
          )}
        </SubmitButton>
        <Link to="/login">Back To Login</Link>
      </FormContainer>
    </Container>
  );
});
