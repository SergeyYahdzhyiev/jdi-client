import React, { forwardRef, useState, useRef } from 'react';
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

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  z-index: 0;
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

  const backdropRef = useRef(null);

  const handleClick = (e) => {
    if (e.target === backdropRef.current) return setOpen(false);
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Knob color={colors[status]} onClick={handleClick} ref={ref}>
        {isOpen && (
          <>
            {' '}
            <Backdrop ref={backdropRef} />
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
