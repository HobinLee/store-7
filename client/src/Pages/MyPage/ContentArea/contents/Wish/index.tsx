import styled from "styled-components";

import Section from "../../../Section";
import { useMyWishes } from "@/api/my";
import ProductList from "@/Components/ProductList";

const Wish = () => {
  const myWishes = useMyWishes();

  return (
    <Wrapper data-testid="test__wishlist">
      <Section
        title="찜리스트"
        description="회원님께서 찜한 상품 목록입니다."
        data-testid="test__section"
      >
        <ProductList {...myWishes} />
      </Section>
    </Wrapper>
  );
};
const Wrapper = styled.div``;

export default Wish;
