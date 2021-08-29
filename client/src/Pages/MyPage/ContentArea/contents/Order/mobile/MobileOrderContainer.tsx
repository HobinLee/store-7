import styled from "styled-components";
import OrderBox from "../OrderBox";
import { MyOrderType } from "@/shared/type";
import { gap, media } from "@/styles/theme";
import NoData from "@/Components/Common/NoData";
import { useState } from "react";
import { OrderStatus } from "@/shared/type";

interface MobileOrderContainer {
  prepare: MyOrderType[];
  delivered: MyOrderType[];
  arrival: MyOrderType[];
}

const MobileOrderContainer = ({
  prepare,
  delivered,
  arrival,
}: MobileOrderContainer) => {
  const [selectedOrders, setSelectedOrders] = useState<MyOrderType[]>(prepare);
  const [type, setType] = useState<OrderStatus>(OrderStatus.Prepare);

  const handleClickType = (target: OrderStatus) => {
    if (target === type) {
      return;
    }

    setType(target);
    switch (target) {
      case OrderStatus.Prepare:
        setSelectedOrders(prepare);
        break;
      case OrderStatus.Delivery:
        setSelectedOrders(delivered);
        break;
      case OrderStatus.Arrival:
        setSelectedOrders(arrival);
      default:
        return;
    }
  };

  return (
    <Container>
      <div className="head">
        <OrderNav
          isSelected={type === OrderStatus.Prepare}
          onClick={() => handleClickType(OrderStatus.Prepare)}
        >
          <div className="type">{OrderStatus.Prepare}</div>
          <p className="count">{prepare.length}</p>
        </OrderNav>
        <OrderNav
          isSelected={type === OrderStatus.Delivery}
          onClick={() => handleClickType(OrderStatus.Delivery)}
        >
          <div className="type">{OrderStatus.Delivery}</div>
          <p className="count">{delivered.length}</p>
        </OrderNav>
        <OrderNav
          isSelected={type === OrderStatus.Arrival}
          onClick={() => handleClickType(OrderStatus.Arrival)}
        >
          <div className="type">{OrderStatus.Arrival}</div>
          <p className="count">{arrival.length}</p>
        </OrderNav>
      </div>
      <div className="container">
        {selectedOrders.length > 0 ? (
          selectedOrders.map((order) => (
            <OrderBox key={order.id} {...order} type={type} />
          ))
        ) : (
          <div className="nodata">
            <NoData />
          </div>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .head {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    margin-top: 1.5rem;
    ${gap("1rem")}
  }

  .container {
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
    .nodata {
      background: #fff;
      width: 100%;
      padding: 5rem;
      box-sizing: border-box;
      border-radius: 2rem;
      img {
        width: 100%;
      }
      ${media.tablet} {
        padding: 0;
      }
    }
  }
`;

const OrderNav = styled.div<{ isSelected: boolean }>`
  flex: 1;
  text-align: center;

  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.5)};

  .type {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 2.5rem;
  }
  .count {
    font-size: 4rem;
    font-weight: 700;
  }
`;
export default MobileOrderContainer;
