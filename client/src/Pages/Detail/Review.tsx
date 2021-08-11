import React from "react";
import styled from "styled-components";
import Button from "@/Components/Button";
import ETProgress from "@/Components/ETProgress";
import ReviewBox from "./ReviewBox";
import { reviews } from "@/shared/dummy";

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
        <ReviewBox {...review} />
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
    background-color: ${({ theme }) => theme.color.background};
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
    color: ${({ theme }) => theme.color.primary1};
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

export default Review;
