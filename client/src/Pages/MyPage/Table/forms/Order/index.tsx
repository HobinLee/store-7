import styled from "styled-components";
import { YYYYMMDD } from "@/utils/util";

export interface OrderProps {
  orderDate: Date;
  orderNumber: string;
}
const Order = ({ orderDate, orderNumber }: OrderProps) => {
  return (
    <OrderWrapper>
      <div className="order__date">{YYYYMMDD(orderDate)}</div>
      <div className="order__number">{orderNumber}</div>
    </OrderWrapper>
  );
};

const OrderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ theme }) => theme.font.small}

  .order__date {
    margin-bottom: 1rem;
  }
`;

export default Order;
