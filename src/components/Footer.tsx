import React from 'react';
import styled from 'styled-components';

import { FaFacebook, FaTelegram, FaMailBulk, FaYoutube, FaGithub, FaSoundcloud } from 'react-icons/fa';

const JdiFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  padding-top: 30px;
  padding-left: max(20px, 5vw);
  padding-right: max(20px, 5vw);
  padding-bottom: 20px;

  color: var(--clr-text-secondary);

  box-shadow: var(--box-shadow-primary);

  border-top: 2px solid var(--clr-text-secondary);
  background: var(--bg-secondary);

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  margin: 1em 0;
`;
const SocialHeading = styled.h5`
  font-size: max(18px, 1.2vw);
  text-align: center;
  letter-spacing: 2px;
  margin: 0;
`;
const SocialLink = styled.a`
  font-size: max(28px, 2vw);
  margin: 0.2em;
  color: inherit;
  transition: color 0.3s ease;

  &:hover {
    color: var(--clr-text-highlight);
  }
`;
const Copyright = styled.span`
  font-size: max(16px, 1.5vw);
`;

export const Footer: React.FC = () => {
  return (
    <JdiFooter>
      <Column>
        <SocialHeading>Authors social links:</SocialHeading>
        <Row>
          <SocialLink
            href="https://www.facebook.com/sergey.yagdziev"
            target="_blank"
            rel="noreferrer"
            role="social-link"
          >
            <FaFacebook />
          </SocialLink>
          <SocialLink href="https://t.me/MrBloods" target="_blank" rel="noreferrer" role="social-link">
            <FaTelegram />
          </SocialLink>
          <SocialLink href="mailto:mr.blooods@gmail.com" target="_blank" rel="noreferrer" role="social-link">
            <FaMailBulk />
          </SocialLink>
          <SocialLink href="https://github.com/SergeyYahdzhyiev" target="_blank" rel="noreferrer" role="social-link">
            <FaGithub />
          </SocialLink>
          <SocialLink
            href="https://www.youtube.com/channel/UC0kVfzH0_MTFu8Pkur8aHZg"
            target="_blank"
            rel="noreferrer"
            role="social-link"
          >
            <FaYoutube />
          </SocialLink>
          <SocialLink href="https://soundcloud.com/sy1994" target="_blank" rel="noreferrer" role="social-link">
            <FaSoundcloud />
          </SocialLink>
        </Row>
      </Column>

      <Copyright role="copyright">&copy; Copyright 2021</Copyright>
    </JdiFooter>
  );
};
