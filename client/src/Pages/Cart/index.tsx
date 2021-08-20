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
import { useRecoilState, useSetRecoilState } from "recoil";
import { orders } from "@/store/state";

const CartPage = () => {
  const { status, data: carts, error } = useMyCarts();

  const [checkItems, setCheckItems] = useState([]);
  const [items, setOrders] = useRecoilState(orders);

  useEffect(() => {
    if (status !== "loading") setCheckItems(carts.items);
  }, [carts]);

  useEffect(() => {
    console.log("checkitems", checkItems);
    if (status !== "loading") {
      const price = checkItems.reduce((sum, cart) => sum + cart.price, 0);
      const delivery = checkItems.reduce(
        (sum, cart) => sum + cart.deliveryCost,
        0
      );
      // TODO: localstorage에 저장해서 새로고침시에도 불러오기
      setOrders({
        items: checkItems,
        totalPrice: price,
        totalDelivery: delivery,
        totalPayment: price + delivery,
        totalCount: checkItems.length,
      });
    }
  }, [status, checkItems]);

  // 체크박스 개별 선택
  const handleSingleCheck = (checked, cart) => {
    if (checked) {
      setCheckItems([...checkItems, cart]);
    } else {
      setCheckItems(checkItems.filter((el) => el.id !== cart.id));
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      console.log("wow");
      const idArray = [];
      // 전체 체크 박스가 체크 되면 id를 가진 모든 elements를 배열에 넣어주어서,
      // 전체 체크 박스 체크
      carts.items.forEach((el) => idArray.push(el));
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
          <CartBox {...items} />
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
                  checked={checkItems.find((i) => i.id === cart.id)}
                  handleCheck={() =>
                    handleSingleCheck(
                      !checkItems.find((i) => i.id === cart.id),
                      cart
                    )
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
