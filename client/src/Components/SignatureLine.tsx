import React from "react";
import styled from "styled-components";
import { LINE_LINK } from "@/assets/";

const SignatureLine = ({
  type,
  height = 1,
}: {
  type: string;
  height?: string | number;
}) => {
  const lineSrc = LINE_LINK[type];
  return (
    <SignatureLineWrapper height={height}>
      <img src={lineSrc} />
    </SignatureLineWrapper>
  );
};

const SignatureLineWrapper = styled.div<{ height: string | number }>`
  width: 100%;
  height: ${({ height }) => `${height}rem`};
  img {
    width: 100%;
    height: 100%;
  }
`;

export default SignatureLine;
