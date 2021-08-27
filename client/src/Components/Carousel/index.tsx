import React, { useState } from "react";
import { useEffect } from "react";
import styled, { css } from "styled-components";
import { LeftIcon, RightIcon } from "@/assets";

interface Carousel {
  children: React.ReactNode;
}
const DEFAULT_X = 0;
const DEFAULT_TRANSITION = "all .5s";

type DIRECTION = "LEFT" | "RIGHT" | "STOP";

const Carousel = ({ children }: Carousel) => {
  const [items, setItems] = useState(React.Children.toArray(children));
  const [x, setX] = useState<number>(-100);
  const [dir, setDir] = useState<DIRECTION>("STOP");
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [transitionValue, settransitionValue] = useState<string>();
  const [moving, setMoving] = useState<boolean>(false);

  const slide = (dir: DIRECTION) => {
    if (moving) return;
    setMoving(true);
    settransitionValue(DEFAULT_TRANSITION);
    setCurrentIndex((index) => index - 1);
    if (dir === "LEFT") {
      setCurrentIndex((index) => {
        if (index === 1) return index;
        if (index) return index - 1;
      });
      setX((x) => x + 100);
    } else if (dir === "RIGHT") {
      setCurrentIndex((index) => index + 1);
      setX((x) => x - 100);
    }
  };

  const onTransitionEnd = () => {
    setMoving(false);
    settransitionValue("none");
  };

  useEffect(() => {
    console.log(transitionValue);
    if (transitionValue !== "none") {
      return;
    }

    if (currentIndex === 0) {
      console.log(0);
    }
    if (currentIndex === items.length - 1) {
      console.log(1);
    }
  }, [transitionValue]);
  
  useEffect(() => {
    setItems(React.Children.toArray(children));
  }, [children]);

  return (
    <CarouselWrapper>
      <LeftIcon
        className="btn left"
        onClick={() => {
          slide("LEFT");
        }}
      />
      <RightIcon
        className="btn right"
        onClick={() => {
          slide("RIGHT");
        }}
      />
      <Slider {...{ transitionValue, x, onTransitionEnd }}>{items}</Slider>
    </CarouselWrapper>
  );
};

const CarouselWrapper = styled.div`
  width: 100%;
  position: relative;
  .btn {
    top: 50%;
    transform: translateY(-50%);
    z-index: 5;
    width: 6rem;
    height: 6rem;
    &.left {
      position: absolute;
      left: 2rem;
    }
    &.right {
      position: absolute;
      right: 2rem;
    }
    &:hover {
      fill: ${({ theme }) => theme.color.primary1};
    }
  }
`;

const Slider = styled.div<{ x: number; transitionValue: string }>`
  width: 100%;
  display: flex;
  ${({ x, transitionValue }) => css`
    transform: translateX(${x}%);
    transition: ${transitionValue};
  `}
`;

export default Carousel;
