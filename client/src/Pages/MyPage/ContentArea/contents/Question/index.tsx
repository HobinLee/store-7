import styled from "styled-components";
import Section from "../../../Section";
import Table from "../../../Table";
import rows from "@/Pages/MyPage/Table/rows";

import { useMyQuestions } from "@/api/my";
import QuestionBox from "@/Pages/Detail/Question/QuestionBox";

const Question = () => {
  const { status, data: questions } = useMyQuestions();

  return (
    <Wrapper data-testid="test__question-content">
      <Section title="상품문의" lineType="long1">
        {status !== "loading" &&
          questions.map((qna, idx) => <QuestionBox {...qna} key={idx} />)}
      </Section>
    </Wrapper>
  );
};
const Wrapper = styled.div``;

export default Question;
