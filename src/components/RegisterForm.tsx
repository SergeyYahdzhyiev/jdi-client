import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { AvatarUploader } from './AvatarUploader';

export interface IRegisterFormState {
  email: string;
  username: string;
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
  font-size: max(18px, 1.5vw);
  width: 100%;
  margin-bottom: 0.5em;
  margin-top: 1em;
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

export const RegisterForm: React.FC = () => {
  const [state, setState] = useState<IRegisterFormState>({
    email: '',
    username: '',
    password: '',
    cpassword: '',
    avatar: '',
  });

  const changeHandler = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <FormContainer onSubmit={submitHandler}>
        <Fieldset>
          <Col>
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              name="email"
              value={state.email}
              onChange={changeHandler}
              placeholder="Enter email..."
              required
            />
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              name="password"
              value={state.password}
              onChange={changeHandler}
              placeholder="Enter password..."
              required
            />
            <Label htmlFor="cpassword">Confirm Password:</Label>
            <Input
              type="password"
              name="cpassword"
              value={state.cpassword}
              onChange={changeHandler}
              placeholder="Enter passsword..."
              required
            />
          </Col>
          <Col>
            <Label htmlFor="username">Username:</Label>
            <Input
              type="text"
              name="username"
              value={state.username}
              onChange={changeHandler}
              placeholder="Enter username..."
              required
            />
            <Label htmlFor="avatar">Avatar:</Label>
            <AvatarUploader inputName="avatar" size={100} />
          </Col>
        </Fieldset>
        <SubmitButton type="submit">Register</SubmitButton>
        <Link to="/login">Back To Login</Link>
      </FormContainer>
    </Container>
  );
};
