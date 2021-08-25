import styled from "styled-components";

import Section from "../../../Section";
import { useMyWishes } from "@/api/my";
import ProductList from "@/Components/ProductList";

const Wish = () => {
  return (
    <Wrapper data-testid="test__wishlist">
      <Section
        title="찜리스트"
        description="최근 30일 내에 진행중인 주문정보입니다."
        lineType="long1"
        data-testid="test__section"
      >
        <ProductList useQuery={useMyWishes} />
      </Section>
    </Wrapper>
  );
};
const Wrapper = styled.div``;

export default Wish;
