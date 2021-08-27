import styled from "styled-components";
import { DeleveryIcon, ReadyIcon, ProductIcon } from "@/assets";
import OrderBox from "./OrderBox";
import { MyOrderType, OrderStatus } from "@/shared/type";
import { gap } from "@/styles/theme";

interface OrdersContainer {
  orders: MyOrderType[];
  type: OrderStatus;
}
const OrdersContainer = ({ orders, type }: OrdersContainer) => {
  return (
    <Container>
      <div className="head">
        <div className="head__type">{type}</div>
        <p className="head__count">{orders.length}</p>
      </div>
      <div className="container">
        {orders.map((order) => (
          <OrderBox key={order.id} {...order} type={type} />
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
    align-items: center;
    margin-bottom: 2rem;
    ${gap("1rem")}
    margin-top: 1.5rem;

    &__type {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 2.5rem;
    }
    &__count {
      font-size: 4rem;
      font-weight: 700;
    }
  }
  .container {
    width: 100%;
    overflow-y: scroll;
    height: 50vh;
    box-sizing: border-box;
    padding: 1rem;
  }
`;

export default OrdersContainer;
