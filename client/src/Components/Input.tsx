import React, { ChangeEventHandler } from "react";
import styled from "styled-components";

type InputType = {
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: string;
  className?: string;
};

const Input = ({
  placeholder,
  required = true,
  value,
  onChange,
  type = "text",
  className,
}: InputType) => (
  <Container
    className={className}
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    type={type}
    autoComplete="off"
  />
);

const Container = styled.input`
  border: none;
`;

export default Input;
