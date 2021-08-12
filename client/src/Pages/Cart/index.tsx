import { PageWrapper } from "@/shared/styled";
import React from "react";
import styled from "styled-components";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import ItemInfoBox from "@/Components/ItemInfoBox";
import CartBox from "./CartBox";
import { buyItems } from "@/shared/dummy";

const CartPage = () => {
  return (
    <Wrapper>
      <Header>
        <CartBox />
      </Header>
      <div className="contents">
        <Title>
          장바구니 <span className="other">주문/결제</span>
        </Title>

        <Content>
          <div className="items">
            <input type="checkbox" />
            {buyItems.map((i) => (
              <ItemInfoBox {...i} />
            ))}
          </div>
        </Content>
      </div>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled(PageWrapper)`
  padding-right: 43rem;
  box-sizing: border-box;
  .contents {
    ${({ theme }) => theme.flexCenter}
    flex-direction: column;
    padding: 0 10rem;
  }
`;

const Title = styled.div`
  width: 100%;
  ${({ theme }) => theme.font.xlarge}
  .other {
    color: ${({ theme }) => theme.color.grey2};
  }
`;

const Content = styled.div`
  margin-top: 5rem;
  display: flex;
  align-items: flex-start;
  width: 100%;
  gap: 3rem;
  .order-btn {
    margin-top: 2rem;
    width: 100%;
  }
  .items {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 2rem;
  }
`;

export default CartPage;
