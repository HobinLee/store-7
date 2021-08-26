import styled, { css } from "styled-components";
import { QuestionType } from "@/shared/type";
import { gap, media } from "@/styles/theme";
import { YYYY_M_D_H_m } from "@/utils/util";
import { Link } from "@/Router";
import { deleteQuestion } from "@/api/questions";
import { QueryObserverResult } from "react-query";

interface QuestionForm {
  id: number;
  question: string;
  type: string;
  isSecret: false;
}

const QuestionBox = ({
  question,
  refetch,
  handleClickEditButton,
}: {
  question: QuestionType;
  refetch?: () => Promise<QueryObserverResult<any, unknown>>;
  handleClickEditButton?: (question: QuestionForm) => void;
}) => {
  const isAnswered = question.answer ? true : false;
  const pathname = location.pathname.split("/")[1];

  return (
    <Wrapper isAnswered={isAnswered} data-testid="test__question-box">
      <div className="type-badge">{question.type}</div>

      {pathname === "mypage" && (
        <Header>
          <Link to={`/detail/${question.product.id}`}>
            <div className="title">{question.product?.name}</div>
          </Link>

          <EditAndDeleteButtons
            {...{ handleClickEditButton, question, refetch }}
          />
        </Header>
      )}

      <div className="container">
        <div className="content">
          <div>
            <div>Q</div>
            {question.question}
          </div>
          <div className="date">
            {pathname === "detail" && (
              <span className="author">{question.authorName}</span>
            )}
            {YYYY_M_D_H_m(question?.createdAt)}
          </div>
        </div>

        <div className="content answer">
          {isAnswered && (
            <>
              <div>
                <div>A</div>
                {question.answer}
              </div>
              <div className="date">{YYYY_M_D_H_m(question?.createdAt)}</div>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const EditAndDeleteButtons = ({ handleClickEditButton, question, refetch }) => {
  const handleClickDeleteButton = async () => {
    const result = await deleteQuestion({ id: question?.id });
    refetch();
  };
  const { id, question: q, type, isSecret } = question;

  return (
    <div className="buttons">
      <button
        onClick={() =>
          handleClickEditButton({ id, question: q, type, isSecret })
        }
      >
        수정
      </button>
      <button onClick={handleClickDeleteButton}>삭제</button>
    </div>
  );
};

const Wrapper = styled.div<{ isAnswered: boolean }>`
  text-align: left;
  background: white;
  ${({ theme }) => theme.font.medium}
  ${({ theme }) => theme.shadow}
  position: relative;
  width: 100%;
  border-radius: 1rem;
  padding: 2rem;
  box-sizing: border-box;

  .type-badge {
    background: ${({ theme }) => theme.color.primary3};
    color: #fff;
    padding: 0.7rem 1rem 0.4rem 1rem;
    border-radius: 2rem;
    position: absolute;
    top: -1rem;
    left: 1rem;
  }

  .container {
    display: flex;
    & > div {
      flex: 1;
    }
    ${media.mobile} {
      flex-direction: column;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    padding: 1rem 2rem 0 2rem;
    ${({ theme }) => theme.font.large};
    white-space: pre-line;
    line-height: 4rem;
    font-weight: 400;
    & > div {
      display: flex;
    }
    & > div > div {
      font-size: 3.5rem;
      font-weight: 900;
      color: ${({ theme }) => theme.color.primary1};
      margin-right: 2rem;
    }
    .author {
      ${({ theme }) => theme.font.medium};
      font-weight: 600;
      margin-right: 1rem;
    }
    .date {
      ${({ theme }) => theme.font.small};
      margin-left: auto;
      margin-top: 1rem;
      line-height: 2rem;
    }
  }
  .content + .content {
    border-left: 0.1rem solid ${({ theme }) => theme.color.light_grey2};
    padding-left: 2rem;
    ${media.mobile} {
      margin-top: 1rem;
      border-left: 0;
    }
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 2rem;
  justify-content: space-between;

  ${gap("1rem")}
  .title {
    ${({ theme }) => theme.font.large};
    padding: 2rem 0 0 2rem;
    &:hover {
      color: ${({ theme }) => theme.color.body};
    }
  }

  .buttons {
    display: flex;
    color: ${({ theme }) => theme.color.body};
  }

  button {
    ${({ theme }) => css`
      ${theme.borderRadius.small};
      ${theme.flexCenter};
    `}
    cursor: pointer;
    padding: 0.5rem 1rem;
  }
`;

export default QuestionBox;
