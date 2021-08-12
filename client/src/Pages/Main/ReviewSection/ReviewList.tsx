import React from "react";
import styled from "styled-components";
import ReviewBox from "@/Pages/Detail/Review/ReviewBox";
import { ReviewType } from "@/shared/type";
import { ETLink } from "@/Router";

const ReviewList = ({ reviews }: { reviews: ReviewType[] }) => (
  <ReviewListWrapper>
    {reviews.map((review: ReviewType, idx: number) => (
      <li key={idx}>
        <ETLink to={`/detail/${review.id}`}>
          <ReviewBox {...review} />
        </ETLink>
      </li>
    ))}
  </ReviewListWrapper>
);

const ReviewListWrapper = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 2rem;

  li {
    width: 100%;
    & > a > div {
      padding: 1rem 0;
      display: flex;
      flex-direction: column-reverse;
      border: none;
      gap: 2rem;

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
      gap: 2rem;
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
