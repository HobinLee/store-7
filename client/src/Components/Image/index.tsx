import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

export interface ImageProps {
  src: string;
  alt?: string;
  lazyload?: boolean;
}

const THRESHOLD = 0.05;

const Image = ({
  src,
  alt = "이미지를 찾을 수 없습니다",
  lazyload,
}: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(lazyload ? null : src);
  /* 타겟 엘리먼트 */
  const target = useRef(null);

  useEffect(() => {
    if (lazyload && target.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              observer.unobserve(target.current);
              setImageSrc(src);
            }
          });
        },
        { threshold: THRESHOLD }
      );
      observer.observe(target.current);

      return () => observer.disconnect();
    }
  }, [target.current]);

  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <SkeletonImage ref={target} />}
      {imageSrc && <img src={imageSrc} onLoad={handleImageLoaded} alt={alt} />}
    </>
  );
};

const SkeletonImage = styled.div`
  width: 100%;
  height: 100%;

  background: ${({ theme }) => theme.color.light_grey1};
`;

export default Image;
