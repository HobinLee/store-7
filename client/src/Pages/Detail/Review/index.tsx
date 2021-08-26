import styled from "styled-components";
import Progress from "@/Components/Progress";
import ReviewBox from "./ReviewBox";
import { useState } from "react";
import { gap } from "@/styles/theme";
import { useProductReviews } from "@/api/products";
import Checkbox from "@/Components/Checkbox";
import { useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";

const Review = () => {
  const pathname = location.pathname.split("detail/")[1];

  const [sortBy, setSortBy] = useState<"popularity" | "latest">("popularity");
  const [isPhotoOnly, setIsPhotoOnly] = useState(false);
  const [rating, setRating] = useState<"1" | "2" | "3" | "4" | "5" | "all">(
    "all"
  );

  const {
    status,
    data: reviews,
    error,
    refetch,
  } = useProductReviews(parseInt(pathname), {
    sortBy,
    isPhotoOnly,
    rating,
  });

  const debouncedSortBy = useDebounce(sortBy);
  const debouncedIsPhotoOnly = useDebounce(isPhotoOnly);
  useEffect(() => {
    refetch();
  }, [debouncedSortBy, debouncedIsPhotoOnly, rating]);

  return (
    status !== "loading" && (
      <div>
        <Header>
          <div>
            <div>
              <div>
                상품후기 <span className="total">{reviews.length}</span>
              </div>
              <div className="average-rate">{reviews.averageRate || 0}/5</div>
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
                    totalCount: reviews.length,
                  }}
                />
              ))}
          </div>
        </Header>

        <Filter>
          <div className="buttons">
            <div>
              <span
                className={sortBy === "popularity" && "selected"}
                onClick={() => setSortBy("popularity")}
              >
                베스트순
              </span>
              <span
                className={sortBy === "latest" && "selected"}
                onClick={() => setSortBy("latest")}
              >
                최신순
              </span>
            </div>
            <Checkbox
              label="사진리뷰"
              size="small"
              isChecked={isPhotoOnly}
              handleCheck={() => setIsPhotoOnly(!isPhotoOnly)}
            />
          </div>

          <button className="rate-sort">별점</button>
        </Filter>

        <ReviewsWrapper>
          {reviews.reviews.map((review) => (
            <ReviewBox key={review.id} {...review} />
          ))}
        </ReviewsWrapper>
      </div>
    )
  );
};

const ReviewsWrapper = styled.div`
  margin-top: 3rem;
  ${gap("3rem", "column")}
`;

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
      &.selected {
        color: ${({ theme }) => theme.color.primary1};
        font-weight: 500;
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
