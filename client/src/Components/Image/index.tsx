import styled, { css } from "styled-components";
import { useState } from "react";

interface ImgProps {
  src: string;
  alt?: string;
  lazyLoad?: boolean;
  width?: number;
  height?: number;
}
const Image = ({ src, alt = "이미지를 찾을 수 없습니다" }: ImgProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <SkeletonImage />}
      <img src={src} onLoad={handleImageLoaded} alt={alt} />
    </>
  );
};

const SkeletonImage = styled.div`
  width: 100%;
  height: 100%;

  background: ${({ theme }) => theme.color.light_grey1};
`;

export default Image;
