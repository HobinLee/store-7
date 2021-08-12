import React, { MouseEventHandler, ReactChild } from "react";
import styled from "styled-components";

type ButtonType = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
  primary?: boolean;
  disabled?: boolean;
  children: ReactChild;
  className?: string;
  size?: "large" | "medium" | "small";
};

const Button = ({
  onClick,
  type = "button",
  primary = false,
  disabled = false,
  children,
  className,
  size = "medium",
}: ButtonType) => (
  <Container {...{ onClick, type, primary, disabled, className, size }}>
    {children}
  </Container>
);

const Container = styled.button<{ primary: boolean; size: string }>`
  ${({ theme, size }) =>
    size === "small" ? theme.font.small : theme.font.large}
  padding: ${({ size }) => (size === "small" ? "1rem 1.5rem" : " 1.5rem 3rem")};
  border-radius: ${({ size }) => (size === "small" ? "0.5rem" : "1rem")};

  cursor: pointer;
  border: 0.1rem solid
    ${({ primary, theme }) => (primary ? "none" : theme.color.line)};
  box-sizing: border-box;
  color: ${({ primary, theme }) =>
    primary ? theme.color.white : theme.color.title_active};
  background: ${({ primary, theme }) =>
    primary ? theme.color.primary1 : "#fff"};
  opacity: 1;
  transition: opacity 0.5s;

  width: ${({ size }) => size === "large" && "100%"};

  &:hover {
    background: ${({ primary, theme }) =>
      primary ? theme.color.primary3 : theme.color.background};
  }

  &:disabled {
    opacity: 0.3;
  }
`;

export default Button;
