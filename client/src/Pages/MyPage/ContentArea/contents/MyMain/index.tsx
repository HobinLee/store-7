import styled, { css } from "styled-components";
import Section from "../../../Section";
import { useMyInfo, useMyOrdersOfFilter } from "@/api/my";
import { Arrow } from "@/assets";
import OrdersContainer from "./OrdersContainer";

const MyMain = () => {
  const { status: ordersStatus, data: orders } = useMyOrdersOfFilter("all");
  const { status: myInfoStatus, data: myInfo } = useMyInfo();
  const { delivering, delivered, reviewed } = classifyOrders(orders);

  return (
    <Wrapper data-testid="test__root">
      <Section
        title="나의 주문 현황"
        description={`${
          myInfoStatus !== "loading" ? myInfo.name : " "
        }님의 주문 내역입니다.`}
        lineType="long1"
      >
        {ordersStatus !== "loading" && (
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
        title="최근 주문한 상품"
        description={`${
          myInfoStatus !== "loading" ? myInfo.name : " "
        }님의 최근 30일내 주문 내역입니다.`}
        lineType="long2"
      >
        <div></div>
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
