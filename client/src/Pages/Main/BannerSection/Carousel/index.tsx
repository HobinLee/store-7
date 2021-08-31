import React, { useState } from "react";
import { useEffect } from "react";
import styled, { css } from "styled-components";
import { LeftIcon, RightIcon } from "@/assets";
import { media } from "@/styles/theme";

interface Carousel {
  children: React.ReactNode;
  infinity?: boolean;
}
const DEFAULT_X = -100;
const DEFAULT_TRANSITION = "all .5s";

type DIRECTION = "LEFT" | "RIGHT" | "STOP";

const Carousel = ({ children, infinity = false }: Carousel) => {
  const [items, setItems] = useState(React.Children.toArray(children));
  const [x, setX] = useState<number>(DEFAULT_X);
  const [dir, setDir] = useState<DIRECTION>("STOP");
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [transitionValue, settransitionValue] = useState<string>();
  const [moving, setMoving] = useState<boolean>(false);

  const isEndBanner = (dir, currentIndex) => {
    if (currentIndex === 0 && dir === "LEFT") {
      return true;
    }
    if (currentIndex === items.length - 1 && dir === "RIGHT") {
      return true;
    }
    return false;
  };

  const moveItemToOpposite = (from: DIRECTION) => {
    if (from === "STOP") {
      return;
    }

    if (from === "LEFT") {
      const endIndex = items.length - 1;
      setItems((items) => [items[endIndex], ...items.slice(0, endIndex)]);
      setX(DEFAULT_X);
    }
    if (from === "RIGHT") {
      setItems((items) => [...items.slice(1), items[0]]);
      setX(DEFAULT_X);
    }
  };

  const slide = (dir: DIRECTION) => {
    if (moving) return;
    if (!infinity && isEndBanner(dir, currentIndex)) {
      return;
    }

    setMoving(true);
    settransitionValue(DEFAULT_TRANSITION);
    setDir(dir);

    if (dir === "LEFT") {
      setCurrentIndex((index) => index - 1);
      setX((x) => x + 100);
      return;
    }
    if (dir === "RIGHT") {
      setCurrentIndex((index) => index + 1);
      setX((x) => x - 100);
      return;
    }
  };

  const onTransitionEnd = ({ target, currentTarget }) => {
    if (target !== currentTarget) {
      return;
    }
    setMoving(false);
    settransitionValue("none");

    if (infinity && isEndBanner(dir, currentIndex)) {
      setCurrentIndex((index) => {
        const mount = dir === "LEFT" ? 1 : dir === "RIGHT" ? -1 : 0;
        return index + mount;
      });
      moveItemToOpposite(dir);
    }
  };

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

const CarouselWrapper = styled.section`
  width: 100%;
  position: relative;
  overflow: hidden;

  .btn {
    top: 50%;
    transform: translateY(-50%);
    z-index: 5;
    width: 7rem;
    height: 7rem;
    opacity: 0.8;
    fill: ${({ theme }) => theme.color.white};
    transition: fill 0.5s;

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
      opacity: 1;
    }
    ${media[768]} {
      width: 4rem;
      height: 4rem;
    }
    ${media.mobile} {
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
