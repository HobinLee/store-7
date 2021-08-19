import Button from "@/Components/Button";
import Input from "@/Components/Input";
import { useState } from "react";
import styled from "styled-components";
import ModalWrapper from "@/Components/ModalWrapper";
import { Triangle } from "@/assets";
import { convertToKRW } from "@/utils/util";
import { gap } from "@/styles/theme";
import { postCart } from "@/api/carts";

const OptionBox = ({ numValue, handleClickNumVal }) => {
  const [isCartAlertShown, setIsCartAlertShown] = useState(false);
  const productId = location.pathname.split("detail/")[1];

  const handlePostCart = async () => {
    try {
      if (status !== "loading") {
        await postCart({
          product: { id: productId },
          amount: parseInt(numValue.value),
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsCartAlertShown(true);
    }
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
          10,000원
        </div>
      </div>

      <div className="total-price">
        <div>총 합계금액</div>
        {convertToKRW(10000 * parseInt(numValue.value))}
      </div>

      <div className="buttons">
        <Button>찜</Button>
        <Button onClick={handlePostCart}>장바구니</Button>
        <Button onClick={() => (window.location.href = "/order")} primary>
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
    &__right {
      ${({ theme }) => theme.flexCenter}
      ${gap("2rem")}
      .num-input {
        ${({ theme }) => theme.flexCenter}
        div {
          ${({ theme }) => theme.flexCenter}
          flex-direction: column;
          button {
            ${({ theme }) => theme.flexCenter};
            cursor: pointer;
            width: 1.6rem;
            height: 1.6rem;
            border: none;
            padding: 0.4rem;
            background: ${({ theme }) => theme.color.primary2};
          }
        }
        &__up {
          transform: rotate(-90deg);
          fill: white;
        }
        &__down {
          transform: rotate(90deg);
          fill: white;
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
