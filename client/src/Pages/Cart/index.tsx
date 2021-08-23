import { PageWrapper } from "@/shared/styled";
import styled from "styled-components";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import ItemInfoBox from "@/Components/ItemInfoBox";
import CartOrderBox from "../../Components/CartOrderBox";
import { Arrow } from "@/assets";
import Checkbox from "@/Components/Checkbox";
import { gap } from "@/styles/theme";
import { useMyCarts } from "@/api/my";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { loginState } from "@/store/state";
import { CartType, ICart, OrderType, PartialCart } from "@/shared/type";
import { useCallback } from "react";

const CartPage = () => {
  const isLogined = useRecoilValue(loginState);

  const [cartItems, setCartItems] = useState<CartType>();
  const { status, data: carts, error } = useMyCarts();

  const [checkItems, setCheckItems] = useState([]);

  useEffect(() => {
    if (isLogined && status !== "loading") {
      setCartItems(carts);
    } else {
      setCartItems(
        JSON.parse(localStorage.getItem("carts")) || {
          totalPrice: 0,
          totalPayment: 0,
          totalDelivery: 0,
          items: [],
        }
      );
    }
  }, [status]);

  useEffect(() => {
    if (isLogined && status !== "loading") setCheckItems(carts.items);
    else setCheckItems(cartItems?.items);
  }, [cartItems]);

  const [info, setInfo] = useState({
    totalPrice: 0,
    totalPayment: 0,
    totalDelivery: 0,
    totalCount: 0,
  });

  useEffect(() => {
    if (status !== "loading") {
      const price = checkItems.reduce((sum, cart) => sum + cart.price, 0);
      const delivery = checkItems.reduce(
        (sum, cart) => sum + cart.deliveryCost,
        0
      );
      localStorage.setItem(
        "orders",
        JSON.stringify({
          items: checkItems,
          totalPrice: price,
          totalDelivery: delivery,
          totalPayment: price + delivery,
          totalCount: checkItems?.length,
        })
      );
      setInfo({
        totalPrice: price,
        totalDelivery: delivery,
        totalPayment: price + delivery,
        totalCount: checkItems?.length,
      });
    }
  }, [status, checkItems]);

  // 체크박스 개별 선택
  const handleSingleCheck = (isChecked: boolean, cart: PartialCart) => {
    if (isChecked) {
      setCheckItems([...checkItems, cart]);
    } else {
      setCheckItems(checkItems.filter((el) => el.id !== cart.id));
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (isChecked: boolean) => {
    if (isChecked) {
      const idArray = cartItems.items.map((el) => el);
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  return (
    status !== "loading" && (
      <Wrapper>
        <Header>
          <CartOrderBox {...{ info }} />
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
                  isChecked={checkItems.length === cartItems?.items.length}
                  handleCheck={() =>
                    handleAllCheck(
                      checkItems.length !== cartItems?.items.length
                    )
                  }
                />
              </div>
              {cartItems?.items.map((cart) => (
                <ItemInfoBox
                  key={cart.id}
                  {...(cart as ICart)}
                  isChecked={checkItems.find((i) => i.id === cart.id)}
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
