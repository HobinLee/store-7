import styled from "styled-components";
import Section from "../../../Section";

import { useMyQuestions } from "@/api/my";
import QuestionBox from "@/Pages/Detail/Question/QuestionBox";
import { gap } from "@/styles/theme";

const Question = () => {
  const { status, data: questions, error, refetch } = useMyQuestions();

  return (
    <Wrapper data-testid="test__question-content">
      <Section title="상품문의" lineType="long1">
        <QuestionsWrapper>
          {status !== "loading" &&
            questions.map((qna, idx) => (
              <QuestionBox {...qna} key={idx} refetch={refetch} />
            ))}
        </QuestionsWrapper>
      </Section>
    </Wrapper>
  );
};

const QuestionsWrapper = styled.div`
  ${gap("3rem", "column")}
`;

const Wrapper = styled.div``;

export default Question;
