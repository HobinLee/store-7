import { InputType } from "@/hooks/useInput";
import { Dispatch, SetStateAction } from "react";
import { Triangle } from "@/assets";
import styled from "styled-components";
import { useEffect } from "react";

const NumInput = ({
  numValue,
  handleMinus,
  handlePlus,
}: {
  numValue: InputType;
  handleMinus: Dispatch<SetStateAction<unknown>>;
  handlePlus: Dispatch<SetStateAction<unknown>>;
}) => {
  useEffect(() => {
    if (parseInt(numValue.value) < 1 || numValue.value === "") {
      numValue.setValue("1");
    }
  }, [numValue.value]);

  return (
    <Wrapper>
      <input
        type="number"
        className="num-input"
        value={numValue.value}
        onChange={numValue.onChange}
      />
      <div>
        <button type="button" onClick={handlePlus}>
          <Triangle className="up" />
        </button>
        <button type="button" onClick={handleMinus}>
          <Triangle className="down" />
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.flexCenter}
  width: 3rem;
  text-align: center;
  padding: 1rem;
  .num-input {
    background: #fff;
    width: 3rem;
    text-align: center;
    padding: 1rem;
  }

  div {
    ${({ theme }) => theme.flexCenter}
    flex-direction: column;
    height: 2.5rem;
    button {
      ${({ theme }) => theme.flexCenter};
      cursor: pointer;
      width: 1.6rem;
      border: none;
      padding: 0.4rem;
      background: ${({ theme }) => theme.color.primary2};
    }
    .up {
      transform: rotate(-90deg);
      fill: white;
      height: 1.1rem;
    }
    .down {
      transform: rotate(90deg);
      fill: white;
      height: 1.2rem;
    }
  }
`;

export default NumInput;
