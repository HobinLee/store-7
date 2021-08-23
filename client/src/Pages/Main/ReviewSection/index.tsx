import { ReviewType } from "@/shared/type";
import styled from "styled-components";
import ReviewList from "./ReviewList";
import { reviews } from "@/shared/dummy";
import { media } from "@/styles/theme";

const ReviewSection = () => (
  <SectionWrapper>
    <div className="title">유저들의 상품 후기</div>
    <ReviewList reviews={reviews} />
  </SectionWrapper>
);

const SectionWrapper = styled.div`
  ${media[768]} {
    overflow-x: scroll;
  }
`;

export default ReviewSection;
