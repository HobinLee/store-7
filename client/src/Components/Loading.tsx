import styled, { css } from "styled-components";
import spinner from "@/assets/spinner.png";

const Loading = ({ primary }: { primary?: boolean }) => (
  <LoadingSpinner primary={primary} />
);

const LoadingSpinner = styled.img<{ primary?: boolean }>`
  width: 20px;
  height: 20px;
  ${({ primary }) =>
    primary
      ? css`
          filter: invert(98%) sepia(12%) saturate(78%) hue-rotate(137deg)
            brightness(124%) contrast(100%);
        `
      : css`
          filter: invert(88%);
        `}

  animation: rotate 0.8s ease infinite;
`;

LoadingSpinner.defaultProps = {
  src: spinner,
};

export default Loading;
