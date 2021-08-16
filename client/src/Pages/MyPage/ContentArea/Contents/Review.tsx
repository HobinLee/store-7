import React from "react";
import styled from "styled-components";
import Section from "../../Section";
import Table from "../../Table";
import ReviewRow from "../../Table/rows/ReviewRow";
import { EmptyRow } from "../../Table/rows/EmptyRow";
import { reviews } from "@/shared/dummy";

const Review = () => {
  return (
    <Wrapper>
      <Section title="상품문의" lineType="long1">
        <Table ths={["번호", "제목", "날짜"]} ratio={[1, 7, 1]}>
          {reviews.reviews.length === 0 ? (
            <EmptyRow colSpan={3} message="게시글이 존재하지 않습니다." />
          ) : (
            reviews.reviews.map((re) => <ReviewRow {...re} />)
          )}
        </Table>
      </Section>
    </Wrapper>
  );
};
const Wrapper = styled.div``;

export default Review;
