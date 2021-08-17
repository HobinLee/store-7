import styled from "styled-components";
import { QuestionType } from "@/shared/type";
import { gap } from "@/styles/theme";
import { YYYY_MM_DD_HH_mm } from "@/utils/util";

const QuestionBox = (Question: QuestionType) => {
  const isAnswered = Question.answer ? true : false;
  return (
    <Wrapper isAnswered={isAnswered}>
      <div className="status">{isAnswered ? "답변완료" : "미답변"}</div>
      <Header>
        <div>{Question.question.author}</div>
        <div className="date">{YYYY_MM_DD_HH_mm(Question.question.date)}</div>
      </Header>

      <div className="content">
        <div>Q</div>
        {Question.question.content}
      </div>
      {isAnswered && (
        <div className="content">
          <div>A</div>
          {Question.answer.content}
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isAnswered: boolean }>`
  text-align: left;
  ${({ theme }) => theme.font.medium}
  width: 100%;
  padding: 4rem 0;
  .status {
    color: ${({ theme, isAnswered }) =>
      isAnswered ? theme.color.primary1 : theme.color.grey1};
  }
  .content {
    margin-top: 2rem;
    display: flex;
    ${({ theme }) => theme.font.large};
    white-space: pre-line;
    line-height: 4rem;
    font-weight: 400;
    div {
      font-size: 3.5rem;
      font-weight: 900;
      color: ${({ theme }) => theme.color.primary1};
      margin-right: 2rem;
    }
  }
  border-bottom: 0.1rem solid ${({ theme }) => theme.color.line};
`;

const Header = styled.div`
  ${({ theme }) => theme.flexCenter}
  justify-content: flex-start;
  margin-top: 1rem;
  ${gap("1rem")}
  .date {
    color: ${({ theme }) => theme.color.grey1};
  }
`;

export default QuestionBox;
