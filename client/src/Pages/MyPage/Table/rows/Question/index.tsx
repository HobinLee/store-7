import { useState } from "react";
import QuestionBox from "@/Pages/Detail/Question/QuestionBox";
import { QuestionType, QnAType } from "@/shared/type";
import dayjs from "dayjs";
import styled from "styled-components";

const Question = (question: QnAType) => {
  const [isOpen, setIsOpen] = useState(false);
  const { createdAt, type, title } = question;
  const isAnswered = !!question.answer;

  return (
    <>
      <Wrapper
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        isAnswered={isAnswered}
      >
        <td>{dayjs(createdAt).format("YYYYMMDD")}</td>
        <td>{type}</td>
        <td className="content">
          <div>{title}</div>
        </td>
        <td className="status">{isAnswered ? "답변 완료" : "미답변"}</td>
      </Wrapper>
      {isOpen && (
        <tr>
          <td colSpan={4}>
            <QuestionBox {...question} />
          </td>
        </tr>
      )}
    </>
  );
};

const Wrapper = styled.tr<{ isAnswered: boolean }>`
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

export default Question;
