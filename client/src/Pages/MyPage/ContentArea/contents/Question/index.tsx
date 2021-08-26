import styled from "styled-components";
import Section from "../../../Section";

import { useMyQuestions } from "@/api/my";
import QuestionBox from "@/Pages/Detail/Question/QuestionBox";
import { gap } from "@/styles/theme";
import { useState } from "react";
import QuestionModal from "@/Pages/Detail/Question/QuestionModal";
import { QuestionType } from "@/shared/type";

export interface QuestionForm {
  id?: number;
  question: string;
  type: string;
  isSecret: false;
}

const Question = () => {
  const { status, data: questions, error, refetch } = useMyQuestions();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [question, setQuestion] = useState<QuestionForm | undefined>(undefined);
  const handleClickEditButton = (question: QuestionForm) => {
    setQuestion(question);
    handleModalOpen(true);
  };
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

  return (
    <Wrapper data-testid="test__question-content">
      <Section title="상품문의" description="회원님의 상품문의 내역입니다.">
        <QuestionsWrapper>
          {status !== "loading" &&
            questions.map((question: QuestionType, idx) => (
              <QuestionBox
                {...{ question, refetch, handleClickEditButton }}
                key={idx}
              />
            ))}
        </QuestionsWrapper>
      </Section>
      {isModalOpened && (
        <QuestionModal
          submitType="patch"
          {...{
            handleModalOpen,
            refetch,
          }}
          question={{
            id: question.id,
            type: question.type,
            question: question.question,
            isSecret: question.isSecret,
          }}
        />
      )}
    </Wrapper>
  );
};

const QuestionsWrapper = styled.div`
  ${gap("3rem", "column")}
`;

const Wrapper = styled.div``;

export default Question;
