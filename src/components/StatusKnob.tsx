import React, { forwardRef, useState, MutableRefObject, useRef } from 'react';
import styled from 'styled-components';

interface IStatusKnobProps {
  status: string;
}

interface IDropdownItemProps {
  objectKey: string;
  onChoose: () => void;
}

const Knob = styled.div`
  position: relative;

  width: 10px;
  height: 10px;

  margin-right: 10px;

  border-radius: 2px;

  cursor: pointer;

  background-color: ${(props) => props.color};
`;

const Dropdown = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;
  align-items: strech;

  left: 0;
  top: 20px;

  background: var(--bg-primary);
  box-shadow: var(--box-shadow-primary);

  z-index: 2;
`;

const Item = styled.div`
  display: flex;
  align-items: center;

  height: 30px;

  padding: 0 10px;

  p {
    margin: 0;
    font-weight: 700;
    font-size: 12px;
    white-space: nowrap;
    text-transform: uppercase;

    color: var(--clr-text-secondary);
  }

  &:hover {
    background: var(--bg-secondary);
  }
`;

const colors = {
  todo: 'orange',
  progress: 'red',
  paused: 'blue',
  completed: 'green',
};

const texts = {
  todo: 'To Do',
  progress: 'In Progress',
  paused: 'Paused',
  completed: 'Complete',
};

// eslint-disable-next-line react/display-name
export const StatusKnob = forwardRef<HTMLDivElement, IStatusKnobProps>(({ status }: IStatusKnobProps, ref) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const myRef = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();
    if (window.outerWidth >= 568) return false;
    if (e.target !== myRef.current && !Array.from(myRef.current.querySelectorAll('*')).includes(e.target))
      return setOpen(false);
    setOpen((prev) => !prev);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };
  return (
    <>
      <Knob
        color={colors[status]}
        onClick={handleClick}
        ref={(node) => {
          myRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            (ref as MutableRefObject<HTMLDivElement>).current = node;
          }
        }}
      >
        {isOpen && (
          <>
            <Dropdown>
              {Object.keys(colors).map((key) => (
                <DropdownItem key={key} objectKey={key} onChoose={() => handleClose} />
              ))}
            </Dropdown>
          </>
        )}
      </Knob>
    </>
  );
});

// eslint-disable-next-line react/display-name
const DropdownItem: React.FC<IDropdownItemProps> = ({ objectKey, onChoose }: IDropdownItemProps) => {
  return (
    <Item onClick={onChoose}>
      <Knob color={colors[objectKey]} />
      <p>{texts[objectKey]}</p>
    </Item>
  );
};
