import React, { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import Button from "@/Components/Button";

type QuestionType = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  state: string;
};

const questions: QuestionType[] = [
  {
    id: 0,
    title: "조아유",
    content: "조아유",
    author: "우아한개발자",
    date: dayjs(new Date()).format("YYYY.MM.DD"),
    state: "답변완료",
  },
  {
    id: 1,
    title: "조아유",
    content: "조아유",
    author: "우아한개발자",
    date: dayjs(new Date()).format("YYYY.MM.DD"),
    state: "답변완료",
  },
];

const QuestionList = (question: QuestionType) => {
  const [isContentOpened, setIsContentOpened] = useState(false);
  const handleContentOpen = () => {
    setIsContentOpened(!isContentOpened);
  };

  return (
    <ListWrapper>
      <div className="list">
        <div className="list__id">{question.id}</div>
        <div onClick={handleContentOpen} className="list__content">
          {question.title}
        </div>
        <div className="list__author">{question.author}</div>
        <div className="list__date">{question.date}</div>
        <div className="list__state">{question.state}</div>
      </div>

      {isContentOpened && (
        <div className="content-detail">{question.content}</div>
      )}
    </ListWrapper>
  );
};

const Question = () => {
  return (
    <Wrapper>
      <div className="header">
        상품문의
        <Button primary>상품문의 글쓰기</Button>
      </div>
      {questions.map((question) => (
        <QuestionList {...question} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .header {
    ${({ theme }) => theme.flexCenter}
    ${({ theme }) => theme.font.xlarge}
    justify-content: space-between;
    padding: 2rem 0;
    border-bottom: 0.1rem solid ${({ theme }) => theme.color.grey1};
  }
`;

const ListWrapper = styled.div`
  ${({ theme }) => theme.font.small}
  .list {
    ${({ theme }) => theme.flexCenter}
    text-align: center;
    flex: 1;
    padding: 1.5rem 2rem;
    border-bottom: 0.1rem solid ${({ theme }) => theme.color.line};
    &__id {
      flex: 0.1;
    }
    &__content {
      cursor: pointer;
      flex: 0.6;
      text-align: start;
    }
    &__author {
      flex: 0.1;
    }
    &__date {
      flex: 0.1;
    }
    &__state {
      flex: 0.1;
    }
  }
  .content-detail {
    background-color: ${({ theme }) => theme.color.background};
    border-bottom: 0.1rem solid ${({ theme }) => theme.color.line};
    padding: 1.5rem;
    height: 8rem;
    padding-left: 23.2rem;
  }
`;

export default Question;
