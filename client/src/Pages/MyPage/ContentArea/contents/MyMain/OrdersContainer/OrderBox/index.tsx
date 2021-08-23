import { Link } from "@/Router";
import { MyOrderType } from "@/shared/type";
import { convertToKRW, YYYYMMDD_DOT } from "@/utils/util";
import styled, { css } from "styled-components";

const OrderBox = ({
  id,
  productId,
  userId,
  reviewId,
  status,
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
  return (
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
          {type === "delivered" && <div className="review">리뷰써줘</div>}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ type: string }>`
  width: 100%;
  border-radius: 1rem 1rem 0 0;
  display: flex;
  & + & {
    margin-top: 2rem;
  }

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

      .review {
        display: flex;
        justify-content: flex-end;
        margin-top: 1rem;
        color: #2fc09c;
      }
    }
  }
`;

export default OrderBox;
