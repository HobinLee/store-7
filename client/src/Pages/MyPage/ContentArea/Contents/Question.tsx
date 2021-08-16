import React from "react";
import styled from "styled-components";
import Section from "../../Section";
import Table from "../../Table";
import QuestionRow from "../../Table/rows/QuestionRow";
import { EmptyRow } from "../../Table/rows/EmptyRow";
import { questions } from "@/shared/dummy";

const Question = () => {
  return (
    <Wrapper>
      <Section title="상품문의" lineType="long1">
        <Table
          ths={["문의 날짜", "카테고리", "제목", "문의상태"]}
          ratio={[1, 1, 5, 1]}
        >
          {questions.questions.length === 0 ? (
            <EmptyRow colSpan={4} message="게시글이 존재하지 않습니다." />
          ) : (
            questions.questions.map((question) => <QuestionRow {...question} />)
          )}
        </Table>
      </Section>
    </Wrapper>
  );
};
const Wrapper = styled.div``;

export default Question;
