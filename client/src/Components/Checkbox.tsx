import { Check } from "@/assets";
import styled from "styled-components";
import { useState } from "react";

type CheckboxProps = {
  label?: string;
  isChecked?: boolean;
};

const Checkbox = ({ label, isChecked: checked = false }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <Wrapper>
      <Box {...{ isChecked }} onClick={() => setIsChecked(!isChecked)}>
        <input type="checkbox" checked={isChecked} />
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

const Box = styled.div<{ isChecked: boolean }>`
  ${({ theme }) => theme.flexCenter}
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 1rem;
  cursor: pointer;
  border-radius: 0.5rem;
  background-color: ${({ theme, isChecked }) =>
    isChecked ? theme.color.primary1 : "#fff"};
  border: 0.1rem solid
    ${({ theme, isChecked }) =>
      isChecked ? theme.color.primary1 : theme.color.line};
`;

export default Checkbox;
