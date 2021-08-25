import styled from "styled-components";
import Button from "@/Components/Button";
import { convertToKRW } from "@/utils/util";
import { gap, media } from "@/styles/theme";
import { moveTo } from "@/Router";
import { MouseEventHandler } from "react";
import { useEffect } from "react";
import { useState } from "react";

export type CartOrderBoxInput = {
  totalPrice: number;
  totalDelivery: number;
  totalPayment: number;
  totalCount: number;
};

export const output = (props: CartOrderBoxInput) => {
  const pathname = location.pathname.split("/")[1];

  return {
    priceOutput: convertToKRW(props.totalPrice ?? 0),
    deliveryOutput: convertToKRW(props.totalDelivery ?? 0),
    paymentOutput: convertToKRW(props.totalPayment ?? 0),
    buttonText:
      pathname === "cart"
        ? `${props.totalCount ?? 0}개 상품 구매하기`
        : `${convertToKRW(props.totalPayment ?? 0)} 결제하기`,
  };
};

const CartOrderBox = ({
  isButtonDisabled,
  handlePay,
  info,
}: {
  isButtonDisabled?: boolean;
  handlePay?: MouseEventHandler<HTMLButtonElement>;
  info?: {
    totalCount: number;
    totalPrice: number;
    totalDelivery: number;
    totalPayment: number;
  };
}) => {
  const [value, setValue] = useState({
    totalCount: 0,
    totalPrice: 0,
    totalDelivery: 0,
    totalPayment: 0,
  });

  const OUTPUT = output(value);

  useEffect(() => {
    setValue(
      JSON.parse(localStorage.getItem("orders")) || {
        totalCount: 0,
        totalPrice: 0,
        totalDelivery: 0,
        totalPayment: 0,
      }
    );
  }, [info]);

  const pathname = location.pathname.split("/")[1];

  return (
    <Wrapper>
      <Result>
        <div>
          <div>총 상품금액</div>
          <div className="value">{OUTPUT.priceOutput}</div>
        </div>
        <div>
          <div>총 배송비</div>
          <div className="value">{OUTPUT.deliveryOutput}</div>
        </div>
        <div className="result">
          <div>결제금액</div>
          <div className="value">{OUTPUT.paymentOutput}</div>
        </div>
      </Result>

      <Button
        className="order-btn"
        primary
        size="large"
        disabled={value.totalCount === 0 || isButtonDisabled}
        onClick={pathname === "cart" ? () => moveTo("/order") : handlePay}
      >
        {pathname === "cart"
          ? `${value.totalCount}개 상품 구매하기`
          : `${OUTPUT.paymentOutput} 결제하기`}
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 18rem;
  right: 1rem;
  padding: 3rem;
  padding-right: 7rem;
  .order-btn {
    margin-top: 2rem;
  }
  ${media.tablet} {
    top: 0;
    right: 0;
    position: relative;
    width: 100%;
    padding: 5rem 0;
  }
`;

const Result = styled.div`
  ${({ theme }) => theme.flexCenter};
  ${({ theme }) => theme.font.medium};
  flex-direction: column;
  background: #fff;
  border-radius: 1rem;
  padding: 3rem 2rem;
  ${gap("2rem", "column")}
  width: 40rem;
  box-sizing: border-box;

  & > div {
    ${({ theme }) => theme.flexCenter};
    width: 100%;
    justify-content: space-between;
  }
  .value {
    font-weight: 900;
  }
  .result {
    ${({ theme }) => theme.font.large};
    margin-top: 2rem;
    .value {
      color: ${({ theme }) => theme.color.primary1};
      font-size: 3rem;
    }
  }
  ${media.tablet} {
    width: 100%;
  }
`;

export default CartOrderBox;
