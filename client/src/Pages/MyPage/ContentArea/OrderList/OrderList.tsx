import { MyOrderType } from "@/shared/type";
import styled, { css } from "styled-components";

const OrderList = ({ orders }) => {
  return (
    <Wrapper data-testid="test__orderlist">
      {orders.map((order) => (
        <OrderBox {...order} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.borderRadius.medium}
`;

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
  productName,
}: MyOrderType) => {
  return (
    <OrderWrapper>
      <h4>{productName}</h4>
      <div className="body">
        <div className="image">
          {/* <img
            src={`https://api.store-7.woowahan-techcamp.shop/images/${image}`}
          /> */}
        </div>
        <div>
          {price} / {amount}
        </div>
        <div>{addressee}</div>
      </div>
    </OrderWrapper>
  );
};

const OrderWrapper = styled.div`
  ${({ theme }) =>
    css`
      ${theme.borderRadius.medium}
      ${theme.shadow}
    `}
  .body {
    display: flex;
    align-items: center;
  }
  .image {
    width: 10rem;
    & > img {
      width: 100%;
      height: 100%;
    }
  }
`;

export default OrderList;
