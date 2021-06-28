import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const picture = require('../../public/assets/images/banner.jpg') as string;
const pictureAvif = require('../../public/assets/images/banner.avif') as string;
const pictureWebp = require('../../public/assets/images/banner.webp') as string;

const Container = styled.section`
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: center;
  align-items: center;

  @media (min-height: 768px) {
    min-height: 80vh;
  }
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  &:first-child {
    padding: 0 1em;
  }

  @media (min-width: 768px) {
    flex: 1;

    &:first-child {
      align-items: flex-start;
      padding-left: 3rem;
    }
  }
`;
const Heading = styled.h2`
  font-family: 'Big Shoulders Display', coursive;
  font-size: max(38px, 6vw);
  font-weight: 900;
  text-align: center;

  margin-bottom: 0.3em;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const Text = styled.p`
  font-size: max(18px, 2vw);
  text-align: center;
  color: var(--clr-text-secondary);
  line-height: 1.8;

  max-width: 25ch;

  margin-bottom: 2em;

  @media (min-width: 768px) {
    text-align: left;
    max-width: 40ch;
  }
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 2rem;
  justify-content: space-evenly;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;
const Button = styled(NavLink)`
  font-family: 'Lato', sasn-serif;
  font-size: max(24px, 2vw);
  font-weight: 500;
  background: var(--clr-text-highlight);
  color: #fff;
  text-decoration: none;
  border: none;
  border-radius: 1.5em;
  padding: 0.5em 1em;
  transition: all 0.2s ease;

  &:hover,
  &:focus {
    box-shadow: 0 0 2px 2px var(--clr-text-highlight);
  }

  @media (min-width: 768px) {
    margin-right: 1em;
  }
`;
const Picture = styled.picture`
  width: 100%;

  @media (min-width: 768px) {
    max-width: 500px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: auto;
`;

export const Banner: React.FC = () => {
  return (
    <Container>
      <Col>
        <Heading>One Todo App to rule them all!</Heading>
        <Text>
          Welcome to my portfolio project of a simple todo app. I developed both front and back end of it using: React,
          Typescript, Node, Express and MongoDB.
        </Text>
        <Buttons>
          <Button to="/login">Login</Button>
          <Button to="/register">Register</Button>
        </Buttons>
      </Col>
      <Col>
        <Picture>
          <source srcSet={pictureAvif} type="image/avif" />
          <source srcSet={pictureWebp} type="image/webp" />
          <Img src={picture} alt="banner-picture" />
        </Picture>
      </Col>
    </Container>
  );
};
