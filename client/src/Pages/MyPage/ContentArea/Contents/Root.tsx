import styled from "styled-components";
import Section from "../../Section";
import Table from "../../Table";
import Item from "@/Components/Item";
import { recent, sampleMain } from "@/shared/dummy";
import RecentOrder from "../../Table/Row/RecentOrder";
import { ItemList } from "@/shared/styled";

const Root = () => {
  return (
    <Wrapper>
      <Section
        title="진행 중인 주문"
        descrition="최근 30일 내에 진행중인 주문정보입니다."
        lineType="long1"
      >
        <div></div>
      </Section>
      <Section
        title="최근 주문 정보"
        descrition="최근 30일 내에 주문하신 내역입니다."
        lineType="long2"
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
          {recent.map((re) => (
            <RecentOrder {...re} />
          ))}
        </Table>
      </Section>
      <Section
        title="최근 본 상품"
        descrition="ET님께서 본 최근 상품입니다."
        lineType="long2"
      >
        <ItemList>
          {sampleMain.map((item) => (
            <li key={item.id}>
              <Item {...item} />
            </li>
          ))}
        </ItemList>
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Root;
