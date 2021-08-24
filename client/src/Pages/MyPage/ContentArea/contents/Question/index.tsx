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
          // <Table
          //   ths={["문의 날짜", "카테고리", "제목", "문의상태"]}
          //   ratio={[1, 1, 5, 1]}
          // >
          //   {questions.length === 0 ? (
          //     <rows.Empty colSpan={4} message="게시글이 존재하지 않습니다." />
          //   ) : (
          //     questions.map((question) => (
          //       <rows.Question {...question} key={question.id} />
          //     ))
          //   )}
          // </Table>
          questions.map((qna, idx) => <QuestionBox {...qna} key={idx} />)}
      </Section>
    </Wrapper>
  );
};
const Wrapper = styled.div``;

export default Question;
