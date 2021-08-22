import styled from "styled-components";
import Section from "../../../Section";
import Item from "@/Components/Item";
import { sampleMain } from "@/shared/dummy";
import { ItemList } from "@/shared/styled";
import { useMyOrders } from "@/api/my";
import Orders from "../Orders";

const Root = () => {
  const { status, data: orders } = useMyOrders();

  return (
    <Wrapper data-testid="test__root">
      <Section
        title="진행 중인 주문"
        description="최근 30일 내에 진행중인 주문정보입니다."
        lineType="long1"
      >
        {status !== "loading" && <Orders orders={orders} />}
      </Section>
      <Section
        title="최근 본 상품"
        description="ET님께서 본 최근 상품입니다."
        lineType="long2"
      >
        <ItemList>
          {sampleMain.map((item) => (
            <Item {...item} key={item.id} />
          ))}
        </ItemList>
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Root;
