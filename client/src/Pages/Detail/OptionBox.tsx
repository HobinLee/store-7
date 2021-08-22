import Button from "@/Components/Button";
import Input from "@/Components/Input";
import { useState } from "react";
import styled from "styled-components";
import ModalWrapper from "@/Components/ModalWrapper";
import { Triangle } from "@/assets";
import { convertToKRW } from "@/utils/util";
import { gap } from "@/styles/theme";
import { postCart } from "@/api/carts";
import { moveTo } from "@/Router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState, orders } from "@/store/state";
import { CartType, ProductType } from "@/shared/type";
import { InputType } from "@/hooks/useInput";

type OptionBoxProps = {
  numValue: InputType;
  handleClickNumVal: Function;
  product: ProductType;
};

const OptionBox = ({
  numValue,
  handleClickNumVal,
  product,
}: OptionBoxProps) => {
  const [isCartAlertShown, setIsCartAlertShown] = useState(false);
  const setOrders = useSetRecoilState(orders);
  const productId = location.pathname.split("detail/")[1];

  const isLogined = useRecoilValue(loginState);

  const handlePostCart = async () => {
    try {
      if (isLogined && status !== "loading") {
        await postCart({
          data: {
            product: { id: parseInt(productId) },
            amount: parseInt(numValue.value),
          },
        });
      } else {
        const exist: CartType = localStorage.getItem("carts")
          ? JSON.parse(localStorage.getItem("carts"))
          : {
              totalPrice: 0,
              totalPayment: 0,
              totalDelivery: 0,
              items: [],
            };

        exist.items = [
          ...exist.items,
          {
            ...product,
            amount: parseInt(numValue.value),
            price: product.price * parseInt(numValue.value),
          },
        ];

        exist.totalPrice = product.price * parseInt(numValue.value);
        exist.totalDelivery = product.deliveryCost;
        exist.totalPayment =
          product.price * parseInt(numValue.value) + product.deliveryCost;

        localStorage.setItem("carts", JSON.stringify(exist));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsCartAlertShown(true);
    }
  };

  const handleBuyImmediately = () => {
    setOrders({
      items: [
        {
          ...product,
          amount: numValue.value,
          price: product.price * parseInt(numValue.value),
        },
      ],
      totalPrice: product.price * parseInt(numValue.value),
      totalDelivery: product.deliveryCost,
      totalPayment:
        product.price * parseInt(numValue.value) + product.deliveryCost,
      totalCount: parseInt(numValue.value),
    });

    moveTo("/order");
  };

  return (
    <Wrapper>
      <div className="select-option">
        <div>수량</div>
        <div className="select-option__right">
          <div className="num-input">
            <NumInput value={numValue.value} onChange={numValue.onChange} />
            <div>
              <button type="button" onClick={() => handleClickNumVal(1)}>
                <Triangle className="num-input__up" />
              </button>
              <button type="button" onClick={() => handleClickNumVal(-1)}>
                <Triangle className="num-input__down" />
              </button>
            </div>
          </div>
          {convertToKRW(product.price)}
        </div>
      </div>

      <div className="total-price">
        <div>총 합계금액</div>
        {convertToKRW(10000 * parseInt(numValue.value))}
      </div>

      <div className="buttons">
        <Button>찜</Button>
        <Button onClick={handlePostCart}>장바구니</Button>
        <Button onClick={handleBuyImmediately} primary>
          바로 구매
        </Button>
      </div>

      {isCartAlertShown && (
        <ModalWrapper
          title="장바구니에 상품을 담았습니다"
          className="alert"
          hideCloseBtn
        >
          <>
            <Button
              className="alert__button"
              primary
              onClick={() => (window.location.href = "/cart")}
            >
              장바구니 보러가기
            </Button>
            <Button
              className="alert__button"
              onClick={() => setIsCartAlertShown(false)}
            >
              쇼핑 계속하기
            </Button>
          </>
        </ModalWrapper>
      )}
    </Wrapper>
  );
};

export default OptionBox;

const Wrapper = styled.div`
  .select-option {
    ${({ theme }) => theme.flexCenter}
    ${({ theme }) => theme.font.medium}
    justify-content: space-around;
    margin-top: 5rem;
    background: ${({ theme }) => theme.color.background};
    width: 100%;
    padding: 1.5rem 0;
    border-radius: 1rem;
    &__right {
      ${({ theme }) => theme.flexCenter}
      .num-input {
        ${({ theme }) => theme.flexCenter}
        margin-right: 2rem;
        background: #fff;
        div {
          ${({ theme }) => theme.flexCenter}
          flex-direction: column;
          height: 2.5rem;
          button {
            ${({ theme }) => theme.flexCenter};
            cursor: pointer;
            width: 1.6rem;
            /* height: 1.6rem; */
            border: none;
            padding: 0.4rem;
            background: ${({ theme }) => theme.color.primary2};
          }
        }
        &__up {
          transform: rotate(-90deg);
          fill: white;
          height: 1.1rem;
        }
        &__down {
          transform: rotate(90deg);
          fill: white;
          height: 1.2rem;
        }
      }
    }
  }
  .total-price {
    ${({ theme }) => theme.flexCenter}
    ${({ theme }) => theme.font.xlarge}
    justify-content: space-between;
    padding: 2.25rem 0;
    border-top: 0.1rem solid ${({ theme }) => theme.color.line};
    width: 100%;
    margin-top: 10rem;
    color: ${({ theme }) => theme.color.primary1};
    & > * {
      ${({ theme }) => theme.font.medium}
      color: ${({ theme }) => theme.color.title_active};
    }
  }
  .buttons {
    ${({ theme }) => theme.flexCenter}
    width: 100%;
    justify-content: flex-end;
    ${gap("1rem")}
  }
  .alert {
    width: auto;
    &__button {
      width: 100%;
      margin-top: 2rem;
    }
  }
`;

const NumInput = styled(Input)`
  width: 3rem;
  text-align: center;
  padding: 1rem;
`;
