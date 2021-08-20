import { PageWrapper } from "@/shared/styled";
import styled from "styled-components";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import ItemInfoBox from "@/Components/ItemInfoBox";
import CartBox from "./CartBox";
import { Arrow } from "@/assets";
import Checkbox from "@/Components/Checkbox";
import { gap } from "@/styles/theme";
import { useMyCarts } from "@/api/my";
import { useState } from "react";
import { useEffect } from "react";

const CartPage = () => {
  const { status, data: carts, error } = useMyCarts();

  const [checkItems, setCheckItems] = useState([]);

  useEffect(() => {
    if (status !== "loading") setCheckItems(carts.items.map((item) => item.id));
  }, [carts]);

  // 체크박스 개별 선택
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems([...checkItems, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      console.log("wow");
      const idArray = [];
      // 전체 체크 박스가 체크 되면 id를 가진 모든 elements를 배열에 넣어주어서,
      // 전체 체크 박스 체크
      carts.items.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    }

    // 반대의 경우 전체 체크 박스 체크 삭제
    else {
      setCheckItems([]);
    }
  };

  return (
    status !== "loading" && (
      <Wrapper>
        <Header>
          <CartBox {...carts} totalCount={carts.items.length} />
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
                <Checkbox
                  label="모두선택"
                  checked={checkItems.length === carts.items.length}
                  handleCheck={() =>
                    handleAllCheck(checkItems.length !== carts.items.length)
                  }
                />
              </div>
              {carts.items.map((cart) => (
                <ItemInfoBox
                  key={cart.id}
                  {...cart}
                  checked={checkItems.includes(cart.id)}
                  handleCheck={() =>
                    handleSingleCheck(!checkItems.includes(cart.id), cart.id)
                  }
                  checkboxVisible
                />
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
