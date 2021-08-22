import styled from "styled-components";
import Section from "../../../Section";
import Table from "../../../Table";
import rows from "@/Pages/MyPage/Table/rows";
import { useMyReviews } from "@/api/my";

const Review = () => {
  const { status, data: reviews } = useMyReviews();

  return (
    <Wrapper data-testid="test__review-content">
      <Section title="상품문의" lineType="long1">
        {status !== "loading" ? (
          <Table ths={["번호", "제목", "날짜"]} ratio={[1, 7, 1]}>
            {reviews.length === 0 ? (
              <rows.Empty colSpan={3} message="게시글이 존재하지 않습니다." />
            ) : (
              reviews.map((review) => (
                <rows.Review {...review} key={review.id} />
              ))
            )}
          </Table>
        ) : (
          <div>스켈레톤 UI</div>
        )}
      </Section>
    </Wrapper>
  );
};
const Wrapper = styled.div``;

export default Review;
