import styled, { css } from "styled-components";
import { QuestionType } from "@/shared/type";
import { gap } from "@/styles/theme";
import { YYYY_M_D_H_m } from "@/utils/util";
import { useState } from "react";
import QuestionModal from "../QuestionModal";
import { Link } from "@/Router";
import { deleteQuestion } from "@/api/questions";
import { QueryObserverResult } from "react-query";

const QuestionBox = (
  Question: QuestionType & {
    refetch?: () => Promise<QueryObserverResult<unknown>>;
  }
) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const handleModalOpen = (val: boolean) => {
    if (!val) {
      const submit = window.confirm(
        "작성하고 있던 내용이 유실됩니다. 정말 다른 페이지로 이동하시겠어요?"
      );
      if (submit) setIsModalOpened(val);
    } else setIsModalOpened(val);
  };
  const isAnswered = Question.answer ? true : false;
  const handleClickDeleteButton = async () => {
    const result = await deleteQuestion({ id: Question.id });
    Question.refetch();
  };
  return (
    <Wrapper isAnswered={isAnswered} data-testid="test__question-box">
      <div className="bar" />
      <Header>
        <Link to={`/detail/${Question.product.id}`}>
          <div className="product">{Question.product.name} /</div>
        </Link>
        <div className="author">{Question.authorName} /</div>
        <div className="date">{YYYY_M_D_H_m(Question.createdAt)}</div>
        <button onClick={() => handleModalOpen(true)}>수정하기</button>
        <button onClick={handleClickDeleteButton}>삭제하기</button>
      </Header>

      <div className="container">
        <div className="content">
          <div>Q</div>
          {Question.question}
        </div>
        {isAnswered && (
          <div className="content answer">
            <div>A</div>
            {Question.answer}
          </div>
        )}
      </div>
      {isModalOpened && (
        <QuestionModal
          submitType="patch"
          {...{
            handleModalOpen,
          }}
          qeustion={{
            id: Question.id,
            option: Question.type,
            value: Question.question,
            isSecret: Question.isSecret,
          }}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isAnswered: boolean }>`
  text-align: left;
  background: white;
  ${({ theme }) => theme.font.medium}
  ${({ theme }) => theme.shadow}
  
  width: 100%;
  border-radius: 1rem;

  .bar {
    background: #2ac1bc;
    height: 1rem;
    border-radius: 1rem 1rem 0 0;
  }

  .status {
    color: ${({ theme, isAnswered }) =>
      isAnswered ? theme.color.primary1 : theme.color.grey1};
  }
  .container {
    display: flex;
    & > div {
      flex: 1;
    }
  }
  .content {
    display: flex;
    padding: 2rem;
    ${({ theme }) => theme.font.large};
    white-space: pre-line;
    line-height: 4rem;
    font-weight: 400;
    div {
      font-size: 3.5rem;
      font-weight: 900;
      color: #c24d46;
      margin-right: 2rem;
    }
    &.answer {
      div {
        color: #2ac1bc;
      }
    }
  }
  .content + .content {
    border-left: 0.1rem solid ${({ theme }) => theme.color.light_grey2};
    padding-left: 2rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 0.1rem solid ${({ theme }) => theme.color.light_grey2};
  padding: 1.5rem 2rem 1.2rem 2rem;

  ${gap("1rem")}
  .product {
    ${({ theme }) => theme.font.medium}
  }
  .author {
    ${({ theme }) => theme.font.medium};
    font-weight: 600;
  }

  .date {
    ${({ theme }) => theme.font.small};
  }
  button {
    ${({ theme }) => css`
      ${theme.borderRadius.small};
      ${theme.flexCenter};
      background: ${theme.color.light_grey2};
    `}
    cursor: pointer;
    padding: 0.5rem 1rem;
  }
`;

export default QuestionBox;
