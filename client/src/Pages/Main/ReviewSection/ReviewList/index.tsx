import styled from "styled-components";
import ReviewBox from "@/Pages/Detail/Review/ReviewBox";
import { ReviewType } from "@/shared/type";
import { Link } from "@/Router";
import { gap, media } from "@/styles/theme";

export interface ReviewListProps {
  reviews: ReviewType[];
}

const ReviewList = ({ reviews }: ReviewListProps) => (
  <ReviewListWrapper>
    {reviews.map((review: ReviewType, idx: number) => (
      <li key={idx}>
        <Link to={`/detail/${review.id}`}>
          <ReviewBox {...review} />
        </Link>
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
    & > a > div {
      padding: 1rem 0;
      display: flex;
      flex-direction: column-reverse;
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

  ${media[768]} {
    width: auto;
    flex-direction: column;
    li {
      margin: 0;
      .content {
        margin: 0;
        height: 30vw;
        flex-direction: row;
        align-items: flex-start;
        .content-img {
          ${({ theme }) => theme.borderRadius.medium}
          width: 30vw;
          min-width: 30vw;
          height: 30vw;
          img {
            min-height: 30vw;
          }
        }

        span {
          margin-left: 1rem;
          width: 100%;
          max-height: calc(30vw - 8rem);
          height: auto;
          margin-top: 7rem;
        }
      }
      & > a > div {
        position: relative;
        width: 100%;
      }
      & > a > div > div:first-child {
        top: 2rem;
        left: calc(30vw + 1rem);
        position: absolute;
        flex-direction: column;
      }
    }
  }
`;

export default ReviewList;
