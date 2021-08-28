import { Check } from "@/assets";
import styled from "styled-components";

export type CheckboxProps = {
  label?: string;
  isChecked: boolean;
  handleCheck: Function;
  size?: "small" | "large";
  className?: string;
};

const Checkbox = ({
  label,
  isChecked,
  handleCheck,
  size,
  className,
}: CheckboxProps) => {
  return (
    <Wrapper onClick={() => handleCheck()} {...{ className }}>
      <Box role="button" {...{ isChecked, size }}>
        <Check />
      </Box>
      {label}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  ${({ theme }) => theme.font.medium};
`;

const Box = styled.div<{ isChecked: boolean; size: "small" | "large" }>`
  ${({ theme }) => theme.flexCenter}
  display: flex;
  align-items: center;
  width: ${({ size }) => (size === "small" ? "1.5rem" : "2.5rem")};
  height: ${({ size }) => (size === "small" ? "1.5rem" : "2.5rem")};
  margin-right: 1rem;
  cursor: pointer;
  border-radius: ${({ size }) => (size === "small" ? "0.3rem" : "0.5rem")};
  background-color: ${({ theme, isChecked }) =>
    isChecked ? theme.color.primary1 : "#fff"};
  border: 0.1rem solid
    ${({ theme, isChecked }) =>
      isChecked ? theme.color.primary1 : theme.color.line};
`;

export default Checkbox;
