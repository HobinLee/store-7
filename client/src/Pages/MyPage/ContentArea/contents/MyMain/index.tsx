import styled, { css } from "styled-components";
import Section from "../../../Section";
import { useMyOrdersOfFilter } from "@/api/my";
import { useState } from "react";
import ProductList from "@/Components/ProductList";
import { Arrow } from "@/assets";
import OrdersContainer from "./OrdersContainer";

const MyMain = () => {
  const { status, data: orders } = useMyOrdersOfFilter("all");
  const [products, setProducts] = useState([]);
  const { delivering, delivered, reviewed } = classifyOrders(orders);

  return (
    <Wrapper data-testid="test__root">
      <Section
        title="나의 주문 현황"
        description="회원님의 주문 내역입니다."
        lineType="long1"
      >
        {status !== "loading" && (
          <div className="orders">
            <OrdersContainer orders={delivering} type="delivering" />
            <div className="arrow">
              <Arrow />
            </div>
            <OrdersContainer orders={delivered} type="delivered" />
            <div className="arrow">
              <Arrow />
            </div>
            <OrdersContainer orders={reviewed} type="reviewed" />
          </div>
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

const Wrapper = styled.div`
  .orders {
    display: flex;
    .arrow {
      width: 5rem;
      display: flex;
      justify-content: center;
      padding-top: 3rem;
    }
  }
`;

const classifyOrders = (orders = []) => {
  const delivering = orders.filter((order) => order.status === "배송중");
  const delivered = orders.filter((order) => order.status === "배송완료");
  const reviewed = orders.filter((order) => order.status === "리뷰완료");
  return { delivering, delivered, reviewed };
};

export default MyMain;
