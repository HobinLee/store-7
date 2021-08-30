import styled from "styled-components";
import { ReviewType } from "@/shared/type";
import { gap, media } from "@/styles/theme";
import ReviewCard from "@/Pages/Main/ReviewSection/ReviewCard";

export interface ReviewListProps {
  reviews: ReviewType[];
}

const ReviewList = ({ reviews }: ReviewListProps) => (
  <ReviewListWrapper>
    {reviews.map((review: ReviewType, idx: number) => (
      <li key={idx}>
        <ReviewCard {...{ review }} key={review.id} />
      </li>
    ))}
  </ReviewListWrapper>
);
const ReviewListWrapper = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  ${gap("2rem")}

  li {
    width: 100%;
    & > div {
      flex: 1;
    }
  }

  ${media.custom(600)} {
    flex-direction: column;
    ${gap("0rem")}
    ${gap("2rem", "column")}
  }
`;

export default ReviewList;
