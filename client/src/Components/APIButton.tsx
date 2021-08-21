import { ReactChild } from "react";
import { useState } from "react";
import styled from "styled-components";
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
    setIsAPICalling(true);
    await api(e);
    setIsAPICalling(false);
  };

  return (
    <APIButtonWrapper
      {...{ type, primary, size, className }}
      onClick={handleClick}
      disabled={disabled || isAPICalling}
    >
      {isAPICalling ? <img className="spinner" src={spinner} /> : children}
    </APIButtonWrapper>
  );
};

const APIButtonWrapper = styled.button<{ primary: boolean; size: string }>`
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
  &:disabled {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.light_grey1};
    border: none;
    cursor: default;
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
    filter: invert(98%) sepia(12%) saturate(78%) hue-rotate(137deg)
      brightness(84%) contrast(100%);
    animation: rotate 0.8s ease infinite;
  }
`;
export default APIButton;
