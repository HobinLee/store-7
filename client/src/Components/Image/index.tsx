import styled from "styled-components";
import { useState } from "react";
import { useLazyLoad } from "@/hooks/useLazyLoad";

export interface ImageProps {
  src: string;
  alt?: string;
  lazyload?: boolean;
}

const Image = ({
  src,
  alt = "이미지를 찾을 수 없습니다",
  lazyload,
}: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(lazyload ? null : src);

  const setImage = () => setImageSrc(src);

  const { ref } = useLazyLoad(setImage);

  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <SkeletonImage ref={ref} />}
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
