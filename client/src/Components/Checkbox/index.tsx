import { Check } from "@/assets";
import styled from "styled-components";

export type CheckboxProps = {
  label?: string;
  checked: boolean;
  handleCheck: Function;
};

const Checkbox = ({ label, checked, handleCheck }: CheckboxProps) => {
  return (
    <Wrapper onClick={() => handleCheck()}>
      <Box role="button" {...{ checked }}>
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

const Box = styled.div<{ checked: boolean }>`
  ${({ theme }) => theme.flexCenter}
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 1rem;
  cursor: pointer;
  border-radius: 0.5rem;
  background-color: ${({ theme, checked }) =>
    checked ? theme.color.primary1 : "#fff"};
  border: 0.1rem solid
    ${({ theme, checked }) =>
      checked ? theme.color.primary1 : theme.color.line};
`;

export default Checkbox;
