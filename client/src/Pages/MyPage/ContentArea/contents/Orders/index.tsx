import { MyOrderType } from "@/shared/type";
import styled, { css } from "styled-components";

const Orders = ({ orders }: { orders: MyOrderType[] }) => {
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
  addressee,
  productOptionId,
  amount,
  destination,
  status,
  createdAt,
  reviewId,
}: MyOrderType) => {
  return <OrderWrapper>
    <div></div>
    <div></div>
  </OrderWrapper>;
};

const OrderWrapper = styled.div`
  ${({ theme }) =>
    css`
      ${theme.borderRadius.medium}
      ${theme.shadow}
    `}
`;

export default Orders;
