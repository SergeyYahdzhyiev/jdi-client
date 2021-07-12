import React, { useRef } from 'react';
import styled from 'styled-components';

const placeholder = require('../../public/assets/images/avatarPlaceholder.png') as string;

interface IAvatarUploaderProps {
  inputName: string;
  size: number;
}

interface IUploadAreaProps {
  size: number;
}

interface IPictureContainerProps {
  size: number;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UploadArea = styled.div<IUploadAreaProps>`
  --clr-bg: whitesmoke;
  --clr-primary: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: calc(${(props) => props.size}px / 2);

  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;

  background-color: var(--clr-bg);

  border: 2px dashed var(--clr-primary);
  color: var(--clr-primary);

  cursor: pointer;
  transition: all 0.3s ease;

  &:hover,
  &.hover {
    color: var(--clr-text-highlight);
    border-color: var(--clr-text-highlight);
  }
`;

const PictureContainer = styled.div<IPictureContainerProps>`
  position: relative;

  background-color: whitesmoke;
  border-radius: 50%;

  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;

  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 50%;

  transform: translateX(-50%);

  width: 100%;
  height: auto;
`;

export const AvatarUploader: React.FC<IAvatarUploaderProps> = ({ inputName, size }: IAvatarUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const reader = new FileReader();

  reader.onloadend = () => {
    imageRef.current.src = reader.result as string;
  };

  const avatarChangeHandler = (e) => {
    const avatarFile = e.target.files[0];

    reader.readAsDataURL(avatarFile);
  };

  const leaveHandler = (e) => {
    (e.target as HTMLDivElement).classList.remove('hover');
    e.preventDefault();
  };
  const enterHandler = (e) => {
    (e.target as HTMLDivElement).classList.add('hover');
    e.preventDefault();
  };

  const dropHandler = (e) => {
    (e.target as HTMLDivElement).classList.remove('hover');

    const avatarFile = e.dataTransfer.files[0];

    reader.readAsDataURL(avatarFile);
    e.preventDefault();
  };
  return (
    <Container>
      <UploadArea
        size={size}
        onClick={() => inputRef.current.click()}
        onDragEnter={enterHandler}
        onDragOver={enterHandler}
        onDragLeave={leaveHandler}
        onDrop={dropHandler}
      >
        +
      </UploadArea>
      <PictureContainer size={size}>
        <picture>
          <Image src={placeholder} alt="avatar" ref={imageRef} />
        </picture>
      </PictureContainer>
      <input type="file" name={inputName} accept="image/*" ref={inputRef} onChange={avatarChangeHandler} hidden />
    </Container>
  );
};
