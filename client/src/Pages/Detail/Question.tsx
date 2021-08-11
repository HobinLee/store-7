import React from "react";
import styled from "styled-components";
import Button from "@/Components/Button";
import QuestionBox from "./QuestionBox";
import { questions } from "@/shared/dummy";

const Question = () => {
  return (
    <Wrapper>
      <Header>
        <div>
          상품문의 <span className="total">{questions.totalCount}</span>
        </div>
        <Button primary>문의하기</Button>
      </Header>
      {questions.questions.map((question) => (
        <QuestionBox {...question} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Header = styled.div`
  ${({ theme }) => theme.flexCenter};
  ${({ theme }) => theme.font.xlarge};
  align-items: flex-end;
  justify-content: space-between;
  .total {
    color: ${({ theme }) => theme.color.primary1};
  }
`;

export default Question;
