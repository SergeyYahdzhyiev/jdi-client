import React, { useState, useRef, MouseEventHandler, useEffect } from 'react';
import { FaEdit, FaSave, FaTrashAlt } from 'react-icons/fa';
import styled from 'styled-components';
import { StatusKnob } from './StatusKnob';

interface ITodoProps {
  title: string;
  body: string;
}

const Container = styled.div`
  width: 98%;
  height: 50px;

  padding: 0 1rem;
  margin-left: 2px;
  margin-right: 2px;
  margin-top: 2px;
  margin-bottom: 1rem;

  background: var(--bg-primary);
  box-shadow: var(--box-shadow-primary);

  transition: height 300ms ease;

  cursor: pointer;

  z-index: 2;

  &.selected,
  &.selected:hover {
    outline: 2px solid green;
  }

  &:hover,
  &:focus {
    outline: 2px solid var(--clr-text-highlight);
  }
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 50px;
`;
const AfterContent = styled.div`
  transition: opacity 300ms linear 300ms;
  font-size: 14px;
  line-height: 1.5;
  padding: 1em 0;
  height: max-content;
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.h4`
  margin: 0;
`;
const Buttons = styled.div`
  display: flex;
  align-items: center;
`;
const IconButton = styled.button`
  position: relative;
  color: var(--clr-text-secondary);
  font-size: 16px;
  cursor: pointer;
  background: transparent;
  border: none;

  &.edit,
  &.save {
    @media screen and (min-width: 700px) {
      display: none;
    }
  }

  &.remove:hover,
  &.remove:focus {
    color: var(--clr-remove-icon);
  }
  &.edit:hover,
  &.save:hover,
  &.edit:focus,
  &.save:focus {
    color: var(--clr-text-highlight);
  }
  &:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    display: block;
  }
`;

export const Todo: React.FC<ITodoProps> = ({ title, body }: ITodoProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isEditing, setEdit] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);
  const removeRef = useRef<HTMLButtonElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);

  const handleClick: MouseEventHandler = (e) => {
    if (
      e.target !== knobRef.current &&
      !Array.from(knobRef.current.querySelectorAll('*')).includes(e.target as Element)
    )
      setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handler = (e) => {
      if (
        e.target !== containerRef.current &&
        !Array.from(containerRef.current.querySelectorAll('*')).includes(e.target as Element)
      )
        setOpen(false);
    };
    if (isOpen) {
      document.body.addEventListener('click', handler);
    } else {
      document.body.removeEventListener('click', handler);
    }
  }, [isOpen]);

  return (
    <Container
      className={isOpen ? 'selected' : null}
      onClick={handleClick}
      ref={containerRef}
      style={{
        height: isOpen && window.outerWidth <= 700 ? `calc(50px + ${afterRef.current.offsetHeight}px)` : '50px',
      }}
    >
      <Content>
        <TitleContainer>
          <StatusKnob status="todo" ref={knobRef} />
          {isEditing ? <span>Editing</span> : <Title>{title}</Title>}
        </TitleContainer>

        <Buttons>
          {isOpen && !isEditing && (
            <IconButton
              className="edit"
              onClick={(e) => {
                e.stopPropagation();
                setEdit(true);
              }}
            >
              <FaEdit />
            </IconButton>
          )}
          {isOpen && isEditing && (
            <IconButton
              className="save"
              onClick={(e) => {
                e.stopPropagation();
                setEdit(false);
              }}
            >
              <FaSave />
            </IconButton>
          )}
          <IconButton className="remove" ref={removeRef}>
            <FaTrashAlt />
          </IconButton>
        </Buttons>
      </Content>
      <AfterContent
        ref={afterRef}
        style={{ visibility: isOpen && window.outerWidth <= 700 ? 'visible' : 'hidden', opacity: isOpen ? '1' : '0' }}
      >
        {body}
      </AfterContent>
    </Container>
  );
};
