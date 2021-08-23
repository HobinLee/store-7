import styled from "styled-components";
import Button from "@/Components/Button";
import Progress from "@/Components/Progress";
import ReviewBox from "./ReviewBox";
import { useState } from "react";
import ReviewModal from "./ReviewModal";
import { gap } from "@/styles/theme";
import { useProductReviews } from "@/api/products";
import { useEffect } from "react";

const Review = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const handleModalOpen = (val: boolean) => {
    if (!val) {
      const submit = window.confirm(
        "작성하고 있던 내용이 유실됩니다. 정말 다른 페이지로 이동하시겠어요?"
      );
      if (submit) setIsModalOpened(val);
    } else setIsModalOpened(val);
  };

  const pathname = location.pathname.split("detail/")[1];

  const {
    status,
    data: reviews,
    error,
  } = useProductReviews(parseInt(pathname));

  useEffect(() => {
    console.log(reviews && reviews);
  }, [status]);

  return (
    status !== "loading" && (
      <div>
        <Header>
          <div>
            <div>
              <div>
                상품후기 <span className="total">{reviews.reviews.length}</span>
              </div>
              <div className="average-rate">{reviews.averageRate}/5점</div>
            </div>
          </div>

          <div className="progress">
            {reviews.rates
              .slice(0)
              .reverse()
              .map((item) => (
                <Progress
                  key={item.rate}
                  content={{
                    value: item.rate,
                    count: item.count,
                    totalCount: reviews.reviews.length,
                  }}
                />
              ))}
          </div>
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
          <ReviewBox key={review.id} {...review} />
        ))}

        {isModalOpened && <ReviewModal {...{ handleModalOpen }} />}
      </div>
    )
  );
};

const Header = styled.div`
  ${({ theme }) => theme.flexCenter};
  ${({ theme }) => theme.font.xlarge};
  justify-content: space-between;
  .left {
    ${({ theme }) => theme.flexCenter};
    ${gap("4rem")}
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
    ${gap("1.5rem")}
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
