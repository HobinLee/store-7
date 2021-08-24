import styled from "styled-components";
import { DeleveryIcon, Loading, ProductIcon } from "@/assets";
import OrderBox from "./OrderBox";
import { MyOrderType, OrderStatus } from "@/shared/type";

const ICONS = {
  [OrderStatus.Prepare]: Loading,
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
        <Icon width="30" height="30" />
        {orders.length}
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
  font-size: 4rem;

  .head {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;

    & > svg {
      margin-bottom: 1rem;
    }
  }
  .body {
    width: 100%;
  }
`;

export default OrdersContainer;
