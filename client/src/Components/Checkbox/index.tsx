import { Check } from "@/assets";
import styled from "styled-components";

export type CheckboxProps = {
  label?: string;
  isChecked: boolean;
  handleCheck: Function;
  size?: "small" | "large";
};

const Checkbox = ({ label, isChecked, handleCheck, size }: CheckboxProps) => {
  return (
    <Wrapper onClick={() => handleCheck()}>
      <Box role="button" {...{ isChecked, size }}>
        <Check />
      </Box>
      {label}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.font.medium};
`;

const Box = styled.div<{ isChecked: boolean; size: "small" | "large" }>`
  ${({ theme }) => theme.flexCenter}
  cursor: pointer;
  display: flex;
  align-items: center;
  width: ${({ size }) => (size === "small" ? "1.5rem" : "2.5rem")};
  height: ${({ size }) => (size === "small" ? "1.5rem" : "2.5rem")};
  margin-right: 1rem;
  cursor: pointer;
  border-radius: ${({ size }) => (size === "small" ? "0.2rem" : "0.5rem")};
  background-color: ${({ theme, isChecked }) =>
    isChecked ? theme.color.primary1 : "#fff"};
  border: 0.1rem solid
    ${({ theme, isChecked }) =>
      isChecked ? theme.color.primary1 : theme.color.line};
`;

export default Checkbox;
