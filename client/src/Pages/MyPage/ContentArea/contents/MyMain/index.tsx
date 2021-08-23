import styled, { css } from "styled-components";
import Section from "../../../Section";
import { useMyOrdersOfFilter } from "@/api/my";
import Orders from "../Orders";
import { useState } from "react";
import ProductList from "@/Components/ProductList";
import { Arrow, DeleveryIcon, ProductIcon, ReviewIcon } from "@/assets";
import OrderList from "../../OrderList/OrderList";

const MyMain = () => {
  const { status, data: orders } = useMyOrdersOfFilter("all");
  const [products, setProducts] = useState([]);

  return (
    <Wrapper data-testid="test__root">
      <Section
        title="나의 주문 현황"
        description="회원님의 주문 내역입니다."
        lineType="long1"
      >
        {status !== "loading" && (
          <>
            <OrderStatus orders={orders} />
            <OrderList orders={orders} />
          </>
        )}
      </Section>
      <Section
        title="최근 본 상품"
        description="ET님께서 본 최근 상품입니다."
        lineType="long2"
      >
        <ProductList products={products} />
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const OrderStatus = ({ orders }) => {
  const { delivering, delivered, reviewed } = classifyOrders(orders);

  return (
    <OrderStatusWrapper>
      <div>
        <DeleveryIcon width="30" height="30" />
        {delivering.length}
      </div>
      <Arrow />
      <div>
        <ProductIcon width="30" height="30" />
        {delivered.length}
      </div>
      <Arrow />
      <div>
        <ReviewIcon width="30" height="30" />
        {reviewed.length}
      </div>
    </OrderStatusWrapper>
  );
};
const classifyOrders = (orders) => {
  const delivering = orders.filter((order) => order.status === "배송중");
  const delivered = orders.filter((order) => order.status === "배송완료");
  const reviewed = orders.filter((order) => order.status === "리뷰완료");
  return { delivering, delivered, reviewed };
};
const OrderStatusWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  & > div {
    ${({ theme }) =>
      css`
        ${theme.flexCenter}
      `};
    cursor: pointer;
    width: 15rem;
    height: 15rem;
    border-radius: 15rem;
    flex-direction: column;
    font-size: 5rem;

    & > svg {
      margin-bottom: 2rem;
    }
  }
`;
export default MyMain;
