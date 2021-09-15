import styled from "styled-components";
import ReviewList from "./ReviewList";
import { media } from "@/styles/theme";
import { useRecentReviews } from "@/api/reviews";
import { Loading } from "@/assets";

const REVIEW_PER_MAINPAGE = 3;

const ReviewSection = () => {
  const { status, data: reviews } = useRecentReviews(REVIEW_PER_MAINPAGE);

  return (
    <SectionWrapper>
      <div className="title">유저들의 상품 후기</div>
      {status === "success" && <ReviewList reviews={reviews} />}
      {status === "loading" && (
        <div className="loading-indicator">
          <Loading />
        </div>
      )}
      {status !== "loading" && <ReviewList reviews={reviews} />}
    </SectionWrapper>
  );
};

const SectionWrapper = styled.section`
  ${media.custom(600)} {
    overflow-x: scroll;
  }
`;

export default ReviewSection;
