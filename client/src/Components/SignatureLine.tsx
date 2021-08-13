import React from "react";
import styled, { css } from "styled-components";
import { LINE_LINK } from "@/assets";

const SignatureLine = ({
  type,
  height = 1,
  opacity = 1,
}: {
  type: string;
  height?: string | number;
  opacity?: string | number;
}) => {
  const lineSrc = LINE_LINK[type];
  const isShort = ["short1", "short2", "short3"].includes(type);

  return (
    <SignatureLineWrapper height={height} isShort={isShort} opacity={opacity}>
      <img src={lineSrc} />
    </SignatureLineWrapper>
  );
};

const SignatureLineWrapper = styled.div<{
  height: string | number;
  isShort: boolean;
  opacity: string | number;
}>`
  width: 100%;
  height: ${({ height }) => `${height}rem`};
  opacity: ${({ opacity }) => opacity};
  margin-bottom: 1.5rem;
  img {
    width: 100%;
    ${({ isShort }) =>
      !isShort &&
      css`
        height: 100%;
      `}
  }
`;

export default SignatureLine;
