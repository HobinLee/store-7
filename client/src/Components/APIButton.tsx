import { ReactChild } from "react";
import { useState } from "react";
import styled, { css } from "styled-components";
import spinner from "@/assets/spinner.png";

interface APIButtonProps {
  api: (e?: MouseEvent) => Promise<void>;
  className?: string;
  disabled?: boolean;
  children: ReactChild;
  type?: "button" | "submit" | "reset";
  primary?: boolean;
  size?: "small" | "medium" | "large";
}

const APIButton = ({
  type = "button",
  children,
  api,
  className,
  disabled,
  primary = false,
  size = "medium",
}: APIButtonProps) => {
  const [isAPICalling, setIsAPICalling] = useState(false);

  const handleClick = async (e) => {
    try {
      setIsAPICalling(true);
      await api(e);
    } finally {
      setIsAPICalling(false);
    }
  };

  return (
    <APIButtonWrapper
      {...{ type, primary, size, className, isAPICalling }}
      onClick={handleClick}
      disabled={disabled || isAPICalling}
    >
      {isAPICalling ? <img className="spinner" src={spinner} /> : children}
    </APIButtonWrapper>
  );
};

const APIButtonWrapper = styled.button<{
  primary: boolean;
  size: string;
  isAPICalling: boolean;
}>`
  ${({ theme, size }) => theme.font[size]};
  ${({ theme, size }) =>
    size === "small" ? theme.borderRadius.small : theme.borderRadius.medium};
  border: 0.1rem solid
    ${({ primary, theme }) => (primary ? "none" : theme.color.line)};
  color: ${({ primary, theme }) =>
    primary ? theme.color.white : theme.color.title_active};
  background: ${({ primary, theme }) =>
    primary ? theme.color.primary1 : "#fff"};
  padding: ${({ size }) => (size === "small" ? "1rem 1.5rem" : " 1.5rem 3rem")};
  cursor: pointer;
  box-sizing: border-box;
  opacity: 1;
  transition: opacity 0.5s;
  width: ${({ size }) => size === "large" && "100%"};
  border: 1px solid ${({ theme }) => theme.color.light_grey2};
  padding: 1rem 2rem;
  cursor: pointer;
  transition: 0.5s;
  opacity: 1;

  &:disabled {
    ${({ theme, isAPICalling }) =>
      isAPICalling
        ? css`
            opacity: 0.75;
          `
        : css`
            color: ${theme.color.white};
            background-color: ${theme.color.light_grey1};
            border: none;
            cursor: default;
          `}
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .spinner {
    width: 20px;
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
  }
`;
export default APIButton;
