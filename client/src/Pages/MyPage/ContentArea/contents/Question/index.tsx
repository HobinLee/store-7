import styled from "styled-components";
import Section from "../../../Section";
import Table from "../../../Table";
import rows from "@/Pages/MyPage/Table/rows";

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
            <rows.Empty colSpan={4} message="게시글이 존재하지 않습니다." />
          ) : (
            questions.questions.map((question) => (
              <rows.Question {...question} />
            ))
          )}
        </Table>
      </Section>
    </Wrapper>
  );
};
const Wrapper = styled.div``;

export default Question;
