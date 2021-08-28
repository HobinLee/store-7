import { ChangeEventHandler } from "react";
import styled from "styled-components";

type InputType = {
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
  type?: string;
  className?: string;
};

const Input = ({
  placeholder,
  required = true,
  value,
  onChange,
  onBlur,
  type = "text",
  className,
}: InputType) => (
  <Container
    {...{ className, placeholder, required, value, onChange, onBlur, type }}
    autoComplete="off"
  />
);

const Container = styled.input`
  border: none;
`;

export default Input;
