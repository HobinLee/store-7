import { ChangeEventHandler } from "react";
import styled from "styled-components";

type InputType = {
  placeholder?: string;
  required?: boolean;
  defaultValue: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
  type?: string;
  className?: string;
};

const Input = ({
  placeholder,
  required = true,
  defaultValue,
  onChange,
  onBlur,
  type = "text",
  className,
}: InputType) => (
  <Container
    className={className}
    placeholder={placeholder}
    required={required}
    defaultValue={defaultValue}
    onChange={onChange}
    onBlur={onBlur}
    type={type}
    autoComplete="off"
  />
);

const Container = styled.input`
  border: none;
`;

export default Input;
