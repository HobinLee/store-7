import styled from "styled-components";
import { ReviewType } from "@/shared/type";
import { gap, media } from "@/styles/theme";
import ReviewCard from "@/Pages/Detail/Review/ReviewCard";

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

  ${media.mobile} {
    flex-direction: column;
    ${gap("0rem")}
    ${gap("2rem", "column")}
  }
`;

const T = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  ${gap("2rem")}

  li {
    width: 100%;
    & > div {
      flex: 1;
      padding: 1rem 0;
      display: flex;
      border: none;
      ${gap("2rem", "column-reverse")}

      & > div {
        flex-direction: column-reverse;
      }
    }

    .author {
      ${({ theme }) => theme.font.small}
    }

    .info__date {
      display: none;
    }

    .content {
      height: 28rem;
      background: none;
      padding: 0;
      justify-content: flex-start;
      ${gap("2rem", "column")}
      .content-img {
        ${({ theme }) => theme.borderRadius.small}
        width: 100%;
        max-width: 100%;
        overflow: hidden;
      }
      img {
        width: 100%;
        min-width: 100%;
        display: block;
        height: 20rem;
        object-fit: cover;
        transition: transform 0.5s;
      }

      span {
        line-height: 2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        word-wrap: break-word;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }

    &:hover img {
      transform: scale(1.05);
    }
  }
`;

export default ReviewList;
