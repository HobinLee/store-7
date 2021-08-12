import React from "react";
import styled from "styled-components";
type MagnifiedImageType = {
  src: string;
};

const MagnifiedImage = ({ src }: MagnifiedImageType) => {
  return (
    <MagnifiedImageWrapper>
      <img src={src} />
    </MagnifiedImageWrapper>
  );
};

const MagnifiedImageWrapper = styled.div`
  overflow: hidden;
  & > img {
    display: block;
    width: 100%;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.03);
    }
  }
`;

export default MagnifiedImage;
