import React, { MouseEventHandler, ReactChild } from "react";
import styled from "styled-components";

type ButtonType = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
  primary?: boolean;
  disabled?: boolean;
  children: ReactChild;
  className?: string;
};

const Button = ({
  onClick,
  type = "button",
  primary = false,
  disabled = false,
  children,
  className,
}: ButtonType) => (
  <Container {...{ onClick, type, primary, disabled, className }}>
    {children}
  </Container>
);

const Container = styled.button<{ primary: boolean }>`
  ${({ theme }) => theme.font.large}
  cursor: pointer;
  padding: 1.5rem 3rem;
  border: 0.1rem solid
    ${({ primary, theme }) => (primary ? "none" : theme.color.line)};
  border-radius: 1rem;
  box-sizing: border-box;
  color: ${({ primary, theme }) =>
    primary ? theme.color.white : theme.color.title_active};
  background: ${({ primary, theme }) =>
    primary ? theme.color.primary1 : "#fff"};
  opacity: 1;
  transition: opacity 0.5s;

  &:hover {
    background: ${({ primary, theme }) =>
      primary ? theme.color.primary3 : theme.color.background};
  }

  &:disabled {
    opacity: 0.3;
  }
`;

export default Button;
