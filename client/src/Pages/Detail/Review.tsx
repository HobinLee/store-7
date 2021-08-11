import React, { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import Button from "@/Components/Button";

type ReviewType = {
  id: number;
  rate: number;
  content: string;
  author: string;
  date: string;
};

const reviews: ReviewType[] = [
  {
    id: 0,
    rate: 3,
    content: "조아유",
    author: "우아한개발자",
    date: dayjs(new Date()).format("YYYY.MM.DD"),
  },
  {
    id: 1,
    rate: 3,
    content: "조아유",
    author: "우아한개발자",
    date: dayjs(new Date()).format("YYYY.MM.DD"),
  },
];

const ReviewList = (review: ReviewType) => {
  const [isContentOpened, setIsContentOpened] = useState(false);
  const handleContentOpen = () => {
    setIsContentOpened(!isContentOpened);
  };

  return (
    <ListWrapper>
      <div className="list">
        <div className="list__rate">O O O O O</div>
        <div onClick={handleContentOpen} className="list__content">
          {review.content}
        </div>
        <div className="list__author">{review.author}</div>
        <div className="list__date">{review.date}</div>
      </div>

      {isContentOpened && (
        <div className="content-detail">{review.content}</div>
      )}
    </ListWrapper>
  );
};

const Review = () => {
  return (
    <Wrapper>
      <div className="header">
        상품후기
        <Button primary>상품후기 글쓰기</Button>
      </div>
      {reviews.map((review) => (
        <ReviewList {...review} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .header {
    ${({ theme }) => theme.flexCenter}
    ${({ theme }) => theme.font.xlarge}
    justify-content: space-between;
    padding: 2rem 0;
    border-bottom: 0.1rem solid ${({ theme }) => theme.color.grey1};
  }
`;

const ListWrapper = styled.div`
  ${({ theme }) => theme.font.small}
  .list {
    ${({ theme }) => theme.flexCenter}
    text-align: center;
    flex: 1;
    padding: 1.5rem 2rem;
    border-bottom: 0.1rem solid ${({ theme }) => theme.color.line};
    &__rate {
      flex: 0.2;
    }
    &__content {
      cursor: pointer;
      flex: 0.6;
      text-align: start;
    }
    &__author {
      flex: 0.1;
    }
    &__date {
      flex: 0.1;
    }
  }
  .content-detail {
    background-color: ${({ theme }) => theme.color.background};
    border-bottom: 0.1rem solid ${({ theme }) => theme.color.line};
    padding: 1.5rem;
    height: 8rem;
    padding-left: 23.2rem;
  }
`;

export default Review;
