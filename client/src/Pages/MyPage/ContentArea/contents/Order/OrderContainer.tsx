import styled from "styled-components";
import { DeleveryIcon, ReadyIcon, ProductIcon } from "@/assets";
import OrderBox from "./OrderBox";
import { MyOrderType, OrderStatus } from "@/shared/type";

const ICONS = {
  [OrderStatus.Prepare]: ReadyIcon,
  [OrderStatus.Delivery]: DeleveryIcon,
  [OrderStatus.Arrival]: ProductIcon,
};

interface OrdersContainer {
  orders: MyOrderType[];
  type: OrderStatus;
}
const OrdersContainer = ({ orders, type }: OrdersContainer) => {
  const Icon = ICONS[type];
  return (
    <Container>
      <div className="head">
        <div className="head__type">
          <Icon width="30" height="30" />
          <p>{type}</p>
        </div>
        <p className="head__count">{orders.length}</p>
      </div>
      <div className="body">
        {orders.map((order) => (
          <OrderBox {...order} type={type} />
        ))}
      </div>
    </Container>
  );
};
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  .head {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;

    &__type {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 1rem;
      svg {
      }
      p {
        ${({ theme }) => theme.font.small}
        margin-top: 0.5rem;
      }
    }
    &__count {
      margin-top: 1.5rem;
      font-size: 6rem;
      font-weight: 700;
    }
  }
  .body {
    width: 100%;
  }
`;

export default OrdersContainer;
