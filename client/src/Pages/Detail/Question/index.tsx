import styled from "styled-components";
import Button from "@/Components/Button";
import QuestionBox from "./QuestionBox";
import { useState } from "react";
import QuestionModal from "./QuestionModal";
import { useProductQuestions } from "@/api/products";
import { gap } from "@/styles/theme";

const Question = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const handleModalOpen = (val: boolean, justClose: boolean = false) => {
    if (justClose) {
      setIsModalOpened(false);
      return;
    }
    if (!val) {
      const submit = window.confirm(
        "작성하고 있던 내용이 유실됩니다. 정말 다른 페이지로 이동하시겠어요?"
      );
      if (submit) setIsModalOpened(val);
    } else setIsModalOpened(val);
  };

  const pathname = location.pathname.split("detail/")[1];
  const {
    status,
    data: questions,
    error,
    refetch,
  } = useProductQuestions(parseInt(pathname));

  return (
    status !== "loading" && (
      <div>
        <Header>
          <div>
            상품문의 <span className="total">{questions.length}</span>
          </div>

          <Button onClick={() => handleModalOpen(true)} primary>
            문의하기
          </Button>
        </Header>
        <QuestionsWrapper>
          {questions.map((qna, idx) => (
            <QuestionBox question={qna} key={idx} />
          ))}
        </QuestionsWrapper>
        {isModalOpened && (
          <QuestionModal submitType="post" {...{ handleModalOpen, refetch }} />
        )}
      </div>
    )
  );
};

const QuestionsWrapper = styled.div`
  margin-top: 3rem;
  ${gap("3rem", "column")}
`;

const Header = styled.div`
  ${({ theme }) => theme.flexCenter};
  ${({ theme }) => theme.font.xlarge};
  justify-content: space-between;
  .total {
    color: ${({ theme }) => theme.color.primary1};
  }
`;

export default Question;
