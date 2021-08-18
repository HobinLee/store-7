import styled from "styled-components";

import Section from "../../../Section";
import Item from "@/Components/Item";
import { sampleCategory } from "@/shared/dummy";
import { ItemWrapList } from "@/shared/styled";

const WishList = () => {
  return (
    <Wrapper>
      <Section
        title="찜리스트"
        description="최근 30일 내에 진행중인 주문정보입니다."
        lineType="long1"
      >
        <ItemWrapList>
          {sampleCategory.map((item) => (
            <Item {...item} key={item.id} />
          ))}
        </ItemWrapList>
      </Section>
    </Wrapper>
  );
};
const Wrapper = styled.div``;

export default WishList;
