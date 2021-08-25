import { GoodIcon, ReviewIcon } from "@/assets";
import ReviewModal from "@/Pages/Detail/Review/ReviewModal";
import { Link } from "@/Router";
import { MyOrderType, OrderStatus } from "@/shared/type";
import { theme } from "@/styles/theme";
import { convertToKRW, YYYYMMDD_DOT } from "@/utils/util";
import { useState } from "react";
import styled, { css } from "styled-components";

const OrderBox = ({
  id,
  productId,
  reviewId,
  createdAt,
  productOptionId,
  amount,
  price,
  destination,
  addressee,
  image,
  type,
  productName,
}: MyOrderType & { type: string }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const handleModalOpen = (val: boolean) => {
    if (!val) {
      const submit = window.confirm(
        "작성하고 있던 내용이 유실됩니다. 정말 다른 페이지로 이동하시겠어요?"
      );
      if (submit) setIsModalOpened(val);
    } else setIsModalOpened(val);
  };
  return (
    <Container>
      <Wrapper type={type}>
        <div className="bar"></div>
        <div className="body">
          <Link to={`/detail/${productId}`}>
            <div className="image">
              <img
                src={`https://api.store-7.woowahan-techcamp.shop/images/${image}`}
              />
            </div>
          </Link>

          <div className="contents">
            <Link to={`/detail/${productId}`}>
              <h3>{productName}</h3>
            </Link>
            <div className="create-at">{YYYYMMDD_DOT(createdAt)}</div>
            <div className="price">
              {convertToKRW(price)} X {amount}
            </div>
          </div>
          {isModalOpened && <ReviewModal {...{ handleModalOpen, id }} />}
        </div>
      </Wrapper>
      {type === OrderStatus.Arrival && (
        <ReviewTag isReviewed={reviewId !== 0}>
          <button disabled={!!reviewId} onClick={() => handleModalOpen(true)}>
            {reviewId ? (
              <>
                <GoodIcon />
                리뷰ㄱㅅ
              </>
            ) : (
              <>
                <ReviewIcon />
                리뷰써줘
              </>
            )}
          </button>
        </ReviewTag>
      )}
    </Container>
  );
};
const Container = styled.div`
  & + & {
    margin-top: 2rem;
  }
`;

const Wrapper = styled.div<{ type: string }>`
  width: 100%;
  border-radius: 1rem 1rem 0 0;
  display: flex;
  background: white;
  ${({ theme }) =>
    css`
      ${theme.shadow}
      ${theme.font.medium}
    `}

  .bar {
    background: ${({ theme, type }) =>
      type === "delivered" ? theme.color.primary1 : "#eb4d26"};
    width: 0.7rem;
    border-radius: 1rem 0 0 1rem;
  }

  .body {
    display: flex;

    .image {
      width: 10rem;
      & > img {
        display: block;
        width: 100%;
      }
    }
    .contents {
      flex: 1;
      padding: 1rem;
      color: #5d5d5d;
      h3 {
        width: 100%;
        font-weight: 700;
        margin-bottom: 0.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 0.1rem solid ${({ theme }) => theme.color.light_grey1};
        line-height: 2rem;
      }

      .create-at {
        ${({ theme }) => theme.font.small}
        letter-spacing: 0.1rem;
      }

      .price {
        font-weight: 700;
        margin-top: 1.5rem;
      }
    }
  }
`;

const ReviewTag = styled.div<{ isReviewed: boolean }>`
  display: flex;
  justify-content: flex-end;

  &:hover {
    color: ${({ theme }) => theme.color.primary3};
  }

  & > button {
    ${({ theme, isReviewed }) => css`
      ${theme.flexCenter}
      ${theme.font.medium}
      background: ${({ theme }) => theme.color.primary1};
      color: white;

      ${isReviewed
        ? css`
            background: ${({ theme }) => theme.color.primary1};
            background: #2ac1bc;
          `
        : css`
            background: red;
          `}
    `}
    & > svg {
      margin-right: 1rem;
    }

    box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 0.5rem 0.5rem;
    padding: 0.5rem 1.5rem;
  }
`;

export default OrderBox;
