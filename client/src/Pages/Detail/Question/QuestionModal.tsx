import Button from "@/Components/Button";
import useInput from "@/hooks/useInput";
import React from "react";
import styled from "styled-components";
import ModalWrapper from "@/Components/ModalWrapper";
import { useState } from "react";

const QuestionModal = ({ handleModalOpen }) => {
  const reviewVal = useInput("");

  const options = ["상품", "배송", "반품", "교환", "환불", "기타"];

  const [option, setOption] = useState("상품");
  const handleSetOption = (val: string) => {
    setOption(val);
  };

  return (
    <ModalWrapper title="문의하기" closeModal={() => handleModalOpen(false)}>
      <Wrapper>
        <div className="content">
          <div className="content__label">문의 유형</div>
          <div className="question-option">
            {options.map((item) => (
              <OptionBtn
                onClick={() => handleSetOption(item)}
                primary={option === item}
              >
                {item}
              </OptionBtn>
            ))}
          </div>
        </div>

        <div className="content">
          <div className="content__label">문의 내용</div>
          <QuestionInput
            placeholder="문의 내용을 입력하세요."
            value={reviewVal.value}
            onChange={reviewVal.onChange}
          />
        </div>

        <SubmitBtn primary>완료</SubmitBtn>
      </Wrapper>
    </ModalWrapper>
  );
};

const Wrapper = styled.form`
  ${({ theme }) => theme.flexCenter};
  flex-direction: column;
  width: 100%;
  .content {
    margin-top: 4rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    &__label {
      ${({ theme }) => theme.font.medium};
    }
    .question-option {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

const OptionBtn = styled(Button)`
  ${({ theme }) => theme.font.medium};
  border: none;
`;

const QuestionInput = styled.textarea`
  border: 0.1rem solid ${({ theme }) => theme.color.line};
  height: 10rem;
  padding: 1.5rem;
`;

const SubmitBtn = styled(Button)`
  width: 100%;
  margin-top: 3rem;
`;

export default QuestionModal;
