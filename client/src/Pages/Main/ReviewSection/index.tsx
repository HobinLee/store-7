import { ReviewType } from "@/shared/type";
import styled from "styled-components";
import ReviewList from "./ReviewList";
import { reviews } from "@/shared/dummy";

const ReviewSection = () => (
  <SectionWrapper>
    <div className="title">유저들의 상품 후기</div>
    <ReviewList reviews={reviews.reviews} />
  </SectionWrapper>
);

const SectionWrapper = styled.div`
  //미디어 쿼리로 모바일일 때, 스크롤로?!
`;

export default ReviewSection;
