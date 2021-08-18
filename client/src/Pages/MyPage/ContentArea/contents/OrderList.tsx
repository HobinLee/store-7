import styled from "styled-components";

import Section from "../../Section";
import Table from "../../Table";
import RecentOrder from "../../Table/rows/RecentOrder";
import rows from "@/Pages/MyPage/Table/rows";
import { recent } from "@/shared/dummy";

const OrderList = () => {
  return (
    <Wrapper>
      <Section
        title="주문목록/배송조회"
        descrition="최근 30일 내에 주문한 주문정보입니다."
        lineType="long1"
      >
        <Table
          ths={[
            "날짜/주문번호",
            "상품명/옵션	",
            "상품금액/수량",
            "주문상태",
            "확인리뷰",
          ]}
          ratio={[1, 3, 1, 0.5, 0.5]}
        >
          {recent.length !== 0 ? (
            <rows.Empty colSpan={5} message="조회내역이 없습니다." />
          ) : (
            recent.map((re) => <RecentOrder {...re} />)
          )}
        </Table>
      </Section>
    </Wrapper>
  );
};

const DeliveryTracker = () => {
  return <Wrapper></Wrapper>;
};

const Wrapper = styled.div``;

export default OrderList;
