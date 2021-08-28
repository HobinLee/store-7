import styled from "styled-components";
import Progress from "@/Pages/Detail/Review/Progress";
import ReviewBox from "../../../Components/ReviewBox";
import { useState } from "react";
import { gap } from "@/styles/theme";
import { useProductReviews } from "@/api/products";
import Checkbox from "@/Components/Common/Checkbox";
import { useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";
import Rating from "@/Components/Common/Rating";
import NoData from "@/Components/Common/NoData";

const Review = () => {
  const pathname = location.pathname.split("detail/")[1];

  const [sortBy, setSortBy] = useState<"popularity" | "latest">("popularity");
  const [isPhotoOnly, setIsPhotoOnly] = useState(false);
  const [rating, setRating] = useState<string>("all");
  const debouncedSortBy = useDebounce(sortBy, 200);
  const debouncedIsPhotoOnly = useDebounce(isPhotoOnly, 200);

  const {
    status,
    data: reviews,
    error,
    refetch,
  } = useProductReviews(parseInt(pathname), {
    sortBy: debouncedSortBy,
    isPhotoOnly: debouncedIsPhotoOnly,
    rating,
  });

  useEffect(() => {
    refetch();
  }, [debouncedSortBy, debouncedIsPhotoOnly, rating]);

  const [isRateDropdownOpened, setIsRateDropdownOpened] = useState(false);
  const handleClickRating = (rating) => {
    setRating(rating);
    setIsRateDropdownOpened(false);
  };

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
            <div className="buttons__left">
              <span
                className={sortBy === "popularity" ? "selected" : ""}
                onClick={() => setSortBy("popularity")}
              >
                베스트순
              </span>
              <span
                className={sortBy === "latest" ? "selected" : ""}
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

          <div
            className="rating"
            onMouseEnter={() => setIsRateDropdownOpened(true)}
            onMouseLeave={() => setIsRateDropdownOpened(false)}
          >
            <button className="rate-sort">별점</button>
            {isRateDropdownOpened && (
              <div>
                <RateDropdown>
                  <div onClick={() => handleClickRating("all")}>전체</div>
                  {reviews.rates.map((rate) => (
                    <div
                      key={rate.rate}
                      onClick={() => handleClickRating(rate.rate.toString())}
                    >
                      <Rating value={rate.rate} readOnly />
                      <div>{`(${rate.count}개)`}</div>
                    </div>
                  ))}
                </RateDropdown>
              </div>
            )}
          </div>
        </Filter>

        <ReviewsWrapper>
          {reviews.reviews.length > 0 ? (
            reviews.reviews.map((review) => (
              <ReviewBox key={review.id} {...{ review }} />
            ))
          ) : (
            <div className="no-data">
              <NoData />
            </div>
          )}
        </ReviewsWrapper>
      </div>
    )
  );
};

const ReviewsWrapper = styled.div`
  margin-top: 3rem;
  ${gap("3rem", "column")}

  .no-data {
    width: 30%;
  }
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
    &__left {
      padding: 0.5rem 0;
      padding-right: 1.5rem;
      border-right: 0.1rem solid ${({ theme }) => theme.color.line};
    }
    span {
      :nth-child(2) {
        margin-left: 1rem;
      }
      &.selected {
        color: ${({ theme }) => theme.color.primary3};
        font-weight: 500;
      }
    }
  }
  .rating {
    position: relative;
    .rate-sort {
      ${({ theme }) => theme.font.medium};
      cursor: pointer;
      padding: 1.5rem 2rem;
      background-color: ${({ theme }) => theme.color.background};
      border-radius: 0.8rem;
    }
    & > div {
      position: absolute;
      top: 4.6rem;
      width: 20rem;
      right: 0;
      z-index: 5;
      padding-top: 1rem;
    }
  }
`;

const RateDropdown = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  border-radius: 0.8rem;
  box-sizing: border-box;
  & > div {
    height: 4rem;
    padding: 1.5rem 2rem;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    align-items: center;
    ${gap("1.5rem")}
    &:hover {
      background-color: ${({ theme }) => theme.color.light_grey1};
    }
    &:first-child {
      border-radius: 1rem 1rem 0 0;
    }
    &:last-child {
      border-radius: 0 0 1rem 1rem;
    }
  }
`;

export default Review;
