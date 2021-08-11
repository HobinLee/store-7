import React, { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import Button from "@/Components/Button";
import ETRating from "@/Components/ETRating";
import ETProgress from "@/Components/ETProgress";

type ReviewListType = {
  totalCount: number;
  averageRate: number;
  rates: { rate: number; count: number }[];
  reviews: ReviewType[];
};

type ReviewType = {
  id: number;
  rate: number;
  content: string;
  author: string;
  date: string;
};

const reviews: ReviewListType = {
  totalCount: 3,
  averageRate: 3.5,
  rates: [
    { rate: 5, count: 0 },
    { rate: 4, count: 1 },
    { rate: 3, count: 2 },
    { rate: 2, count: 0 },
    { rate: 1, count: 0 },
  ],
  reviews: [
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
      content: "흠",
      author: "우아한개발자",
      date: dayjs(new Date()).format("YYYY.MM.DD"),
    },
    {
      id: 3,
      rate: 4,
      content: "와",
      author: "우아한개발자",
      date: dayjs(new Date()).format("YYYY.MM.DD"),
    },
  ],
};

const ReviewList = (review: ReviewType) => {
  const [isContentOpened, setIsContentOpened] = useState(false);
  const handleContentOpen = () => {
    setIsContentOpened(!isContentOpened);
  };

  return (
    <ListWrapper>
      <div className="list">
        <div className="list__rate">
          <ETRating value={3} />
        </div>
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
      <Header>
        <div className="left">
          <div>
            <div>
              <div>
                상품후기 <span className="total">{reviews.totalCount}</span>
              </div>
              <div className="average-rate">{reviews.averageRate}/5</div>
            </div>
          </div>

          <div className="progress">
            {reviews.rates
              .slice(0)
              .reverse()
              .map((item, idx) => (
                <ETProgress
                  key={idx.toString()}
                  content={{
                    value: item.rate,
                    count: item.count,
                    totalCount: reviews.totalCount,
                  }}
                />
              ))}
          </div>
        </div>

        <Button primary>후기쓰기</Button>
      </Header>

      <Filter>
        <div className="buttons">
          <div>
            <span>베스트순</span>
            <span>최신순</span>
          </div>
          <div>사진리뷰</div>
        </div>

        <button className="rate-sort">별점</button>
      </Filter>

      {reviews.reviews.map((review) => (
        <ReviewList {...review} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .header {
    ${({ theme }) => theme.flexCenter}
  }
`;

const Header = styled.div`
  ${({ theme }) => theme.flexCenter};
  ${({ theme }) => theme.font.xlarge};
  align-items: flex-end;
  justify-content: space-between;
  .left {
    ${({ theme }) => theme.flexCenter};
    gap: 4rem;
  }
  .progress {
    background-color: ${({ theme }) => theme.color.off_white};
    padding: 2rem 2.5rem;
    border-radius: 1rem;
  }
  .average-rate {
    font-size: 4rem;
    font-weight: 900;
    color: ${({ theme }) => theme.color.primary1};
    margin-top: 3rem;
  }
  .total {
    ${({ theme }) => theme.font.large}
    color: ${({ theme }) => theme.color.primary1}
  }
`;

const Filter = styled.div`
  ${({ theme }) => theme.flexCenter};
  ${({ theme }) => theme.font.medium};
  height: 7rem;
  margin-top: 3rem;
  justify-content: space-between;
  border: 0 solid ${({ theme }) => theme.color.line};
  border-top-width: 0.1rem;
  border-bottom-width: 0.1rem;

  .buttons {
    ${({ theme }) => theme.flexCenter};
    gap: 1.5rem;
    & > * {
      cursor: pointer;
    }
    span {
      :nth-child(2) {
        margin-left: 1rem;
      }
    }
    div:first-child {
      padding: 0.5rem 0;
      padding-right: 1.5rem;
      border-right: 0.1rem solid ${({ theme }) => theme.color.line};
    }
  }
  .rate-sort {
    ${({ theme }) => theme.font.medium};
    cursor: pointer;
    padding: 1.5rem 2rem;
    background-color: ${({ theme }) => theme.color.background};
    border-radius: 0.8rem;
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
