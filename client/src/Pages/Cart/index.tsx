import { PageWrapper } from "@/shared/styled";
import styled from "styled-components";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import ItemInfoBox from "@/Components/ItemInfoBox";
import CartBox from "./CartBox";
import { buyItems } from "@/shared/dummy";
import { Arrow } from "@/assets";
import Checkbox from "@/Components/Checkbox";
import { gap } from "@/styles/theme";
import { useCarts } from "../../../api/my";

const CartPage = () => {
  const { status, data: carts, error } = useCarts();

  return (
    status !== "loading" && (
      <Wrapper>
        <Header>
          <CartBox {...carts} />
        </Header>
        <div className="contents">
          <Title>
            장바구니{" "}
            <span className="other">
              <Arrow /> 주문/결제
            </span>
          </Title>

          <Content>
            <div className="items">
              <div>
                <Checkbox label="모두선택" />
              </div>
              {carts.items.map((i, idx) => (
                <ItemInfoBox {...i} key={idx} />
              ))}
            </div>
          </Content>
        </div>
        <Footer />
      </Wrapper>
    )
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
    fill: ${({ theme }) => theme.color.grey2};
  }
`;

const Content = styled.div`
  margin-top: 5rem;
  display: flex;
  align-items: flex-start;
  width: 100%;
  ${gap("3rem")}
  .items {
    padding-bottom: 5rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    ${gap("2rem", "column")}
  }
`;

export default CartPage;
