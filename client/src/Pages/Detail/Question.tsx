import React from "react";
import styled from "styled-components";
import Button from "@/Components/Button";
import { QuestionListType } from "@/shared/type";
import QuestionBox from "./QuestionBox";

const questions: QuestionListType = {
  totalCount: 2,
  questions: [
    {
      id: 0,
      question: {
        author: "우아한개발자",
        content: "점심 뭐드셨어여",
        date: new Date(),
      },
    },
    {
      id: 1,
      question: {
        author: "우아한개발자",
        content: `방금 배송 받아서 풀어봤는데, 검수하고 보내신 것 맞나요?
        기다렸던 상품이라 서둘러 뜯었는데, 오염이 잔뜩 뭍어있는거 보고 완전 속상했어요
        다른 상품에도 조금씩 뭍은건 닦으니 지워져서 그냥 사용하려고 하는데,
        중 사이즈 1개는 닦아도 오염이 남아있어요
        찝찝해서 교환신청합니다`,
        date: new Date(),
      },
      answer: {
        content: `안녕하세요 고객님
        불편을 드려 죄송합니다
        아래 방법 참고하시어 접수 부탁드립니다.
        [카톡접수]
        카카오톡>친구추가>올리빙 검색후
        사이트.성함.사진첨부접수요청`,
        date: new Date(),
      },
    },
  ],
};

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
