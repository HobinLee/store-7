import React, { useState } from "react";
import QuestionBox from "@/Pages/Detail/Question/QuestionBox";
import { QuestionType } from "@/shared/type";
import dayjs from "dayjs";
import styled from "styled-components";

const QuestionRow = (Question: QuestionType) => {
  const [isOpen, setIsOpen] = useState(false);
  const { question, answer } = Question;
  const isAnswered = !!answer;
  return (
    <>
      <QuestionRowWrapper
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        isAnswered={isAnswered}
      >
        <td>{dayjs(question.date).format("YYYYMMDD")}</td>
        <td>{question.category}</td>
        <td className="content">
          <div>{question.content}</div>
        </td>
        <td className="status">{isAnswered ? "답변 완료" : "미답변"}</td>
      </QuestionRowWrapper>
      {isOpen && (
        <tr>
          <td colSpan={4}>
            <QuestionBox {...Question} />
          </td>
        </tr>
      )}
    </>
  );
};

const QuestionRowWrapper = styled.tr<{ isAnswered: boolean }>`
  cursor: pointer;
  .status {
    color: ${({ theme, isAnswered }) =>
      isAnswered ? theme.color.primary1 : theme.color.grey1};
  }
  .content > div {
    ${({ theme }) => theme.font.medium};
    line-height: 1.4em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;

export default QuestionRow;
