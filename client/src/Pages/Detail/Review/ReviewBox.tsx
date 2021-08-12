import React from "react";
import styled from "styled-components";
import { ReviewType } from "@/shared/type";
import ETRating from "@/Components/ETRating";

const ReviewBox = (review: ReviewType) => {
  return (
    <Wrapper>
      <Header>
        <div className="author">{review.author}</div>
        <div className="info">
          <div className="info__rate">
            <ETRating value={review.rate} readOnly />
          </div>
          <div className="info__date">{review.date}</div>
        </div>
      </Header>

      <div className="content">
        <div className="content-img">
          {review.img && <img src={`${review.img}`} alt="review_img" />}
        </div>
        <span>{review.content}</span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.font.medium}
  width: 100%;
  padding: 4rem 0;
  .content {
    margin-top: 1.5rem;
    background-color: ${({ theme }) => theme.color.background};
    border-radius: 1rem;
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;

    .content-img {
      max-width: 80%;
      align-self: center;
      img {
        width: 100%;
      }
    }
  }
  border-bottom: 0.1rem solid ${({ theme }) => theme.color.line};
`;

const Header = styled.div`
  ${({ theme }) => theme.flexCenter}
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  .info {
    ${({ theme }) => theme.flexCenter}
    gap: 1rem;
  }
`;

export default ReviewBox;
