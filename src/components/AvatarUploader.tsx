import React, { useRef, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const placeholder = require('../../public/assets/images/avatarPlaceholder.png') as string;

interface IAvatarUploaderState {
  isMoving: boolean;
  isCropping: boolean;
  imageSrc: string;
  scaleRate: number;
  initialX: number;
  initialY: number;
  frameX: number;
  frameY: number;
  grabPointX: number;
  grabPointY: number;
  imageRect: DOMRect | undefined;
  frameRect: DOMRect | undefined;
  avatarUrl: string;
}
interface IAvatarUploaderProps {
  inputName: string;
  size: number;
  onCrop: (avatarUrl: string) => void;
}
interface IStyledWithSize {
  size: number;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const UploadArea = styled.div<IStyledWithSize>`
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
const Preview = styled.canvas`
  background-color: whitesmoke;
  border-radius: 50%;
`;
const Cropper = styled.div`
  position: relative;
`;

const CropperImage = styled.img`
  width: 100px;
  height: auto;
`;
const CropFrame = styled.div<IStyledWithSize>`
  position: absolute;
  cursor: grab;
  background: transparent;
  border: 2px dashed white;
  border-radius: 50%;
  margin: 0;

  width: ${(props) => props.size / 1.5}px;
  height: ${(props) => props.size / 1.5}px;

  &.moving {
    cursor: grabbing;
  }
`;
const CropClose = styled.span`
  position: absolute;
  right: 0;
  top: 0;
  padding-left: 0.5em;
  padding-right: 0.5em;
  color: white;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.2);
`;

export const AvatarUploader: React.FC<IAvatarUploaderProps> = ({ inputName, size, onCrop }: IAvatarUploaderProps) => {
  const [state, setState] = useState<IAvatarUploaderState>({
    isMoving: false,
    isCropping: false,
    imageSrc: '',
    scaleRate: 0,
    initialX: 0,
    initialY: 0,
    frameX: 0,
    frameY: 0,
    grabPointX: 0,
    grabPointY: 0,
    imageRect: undefined,
    frameRect: undefined,
    avatarUrl: '',
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cropImageRef = useRef<HTMLImageElement>(null);
  const cropFrameRef = useRef<HTMLDivElement>(null);
  const cropperRef = useRef<HTMLDivElement>(null);

  const reader = new FileReader();

  reader.onloadend = () => {
    const imageSrc = reader.result as string;
    const image = new window.Image();
    image.src = imageSrc;
    image.onload = () =>
      setState((prev) => ({
        ...prev,
        isCropping: true,
        imageSrc,
        scaleRate: image.naturalWidth / size,
      }));
  };

  useEffect(() => {
    const previewImage = new window.Image();
    const ctx = canvasRef.current.getContext('2d');

    previewImage.src = placeholder;
    previewImage.onload = () =>
      ctx.drawImage(
        previewImage,
        0,
        0,
        previewImage.naturalWidth,
        previewImage.naturalHeight,
        -2,
        -2,
        size + 5,
        size + 5,
      );
    onCrop(canvasRef.current.toDataURL());
  }, []);

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      imageRect: cropImageRef.current?.getBoundingClientRect(),
      frameRect: cropFrameRef.current?.getBoundingClientRect(),
    }));
  }, [state.imageSrc]);

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
  const mouseDownHandler = (e) => {
    e.preventDefault();
    e.target.classList.add('moving');
    setState((prev) => ({
      ...prev,
      isMoving: true,
      initialX: e.clientX - prev.frameX,
      initialY: e.clientY - prev.frameY,
      grabPointX: cropperRef.current.offsetLeft + prev.frameX + cropFrameRef.current.offsetWidth - e.clientX,
      grabPointY: cropperRef.current.offsetTop + prev.frameY + cropFrameRef.current.offsetHeight - e.clientY,
    }));
  };
  const mouseUpHandler = useCallback(
    (e) => {
      e.preventDefault();
      e.target.classList.remove('moving');
      draw();
      if (state.isMoving) {
      }
      setState((prev) => ({
        ...prev,
        isMoving: false,
        initialX: e.clientX - prev.initialX,
        initialY: e.clientY - prev.initialY,
        grabPointX: 0,
        grabPointY: 0,
      }));
    },
    [state.isMoving],
  );
  const mouseMoveHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (state.isMoving) {
        if (!inBoundries(e.clientX, e.clientY)) {
          return;
        }
        setState((prev) => ({
          ...prev,
          frameX: e.clientX - prev.initialX,
          frameY: e.clientY - prev.initialY,
        }));
      }
    },
    [state.isMoving],
  );
  const inBoundries = (x, y) => {
    const isValidX = () => {
      return (
        x > cropperRef.current.offsetLeft + cropFrameRef.current.offsetWidth - state.grabPointX &&
        x < cropperRef.current.offsetLeft + cropperRef.current.offsetWidth - state.grabPointX
      );
    };
    const isValidY = () => {
      return (
        y > cropperRef.current.offsetTop + cropFrameRef.current.offsetHeight - state.grabPointY &&
        y < cropperRef.current.offsetTop + cropperRef.current.offsetHeight - state.grabPointY
      );
    };
    return isValidX() && isValidY();
  };
  const draw = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.drawImage(
      cropImageRef.current,
      cropFrameRef.current.offsetLeft * state.scaleRate,
      cropFrameRef.current.offsetTop * state.scaleRate,
      cropFrameRef.current.offsetWidth * state.scaleRate,
      cropFrameRef.current.offsetHeight * state.scaleRate,
      0,
      0,
      size,
      size,
    );
    setState((prev) => ({
      ...prev,
      avatarUrl: canvasRef.current.toDataURL(),
    }));
    onCrop(state.avatarUrl);
  };
  return (
    <Container>
      {state.isCropping ? (
        <Cropper onMouseMove={mouseMoveHandler} ref={cropperRef}>
          <CropperImage src={state.imageSrc} alt="cropper-img" ref={cropImageRef} onLoad={draw} />
          <CropFrame
            size={size}
            ref={cropFrameRef}
            onMouseDown={mouseDownHandler}
            onMouseUp={mouseUpHandler}
            onMouseLeave={mouseUpHandler}
            style={{
              left: state.frameX + 'px',
              top: state.frameY + 'px',
            }}
          ></CropFrame>
          <CropClose
            onClick={() => {
              setState((prev) => ({
                ...prev,
                isCropping: false,
              }));
              inputRef.current.value = '';
            }}
          >
            &times;
          </CropClose>
        </Cropper>
      ) : (
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
      )}
      <Preview width={size} height={size} ref={canvasRef} />
      <input type="file" name={inputName} accept="image/*" ref={inputRef} onChange={avatarChangeHandler} hidden />
    </Container>
  );
};
