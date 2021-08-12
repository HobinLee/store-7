import React from "react";
import styled from "styled-components";
import Button from "@/Components/Button";

const CartBox = () => {
  return (
    <Wrapper>
      <Result>
        <div>
          <div>총 상품금액</div>
          <div className="value">20,000원</div>
        </div>
        <div>
          <div>총 배송비</div>
          <div className="value">2,500원</div>
        </div>
        <div className="result">
          <div>결제금액</div>
          <div className="value">24,500원</div>
        </div>
      </Result>

      <Button
        className="order-btn"
        primary
        onClick={() => (window.location.href = "/order")}
      >
        2개 상품 구매하기
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  right: 1rem;
  padding: 3rem;
  .order-btn {
    margin-top: 2rem;
    width: 100%;
  }
`;

const Result = styled.div`
  ${({ theme }) => theme.flexCenter};
  ${({ theme }) => theme.font.medium};
  flex-direction: column;
  background: ${({ theme }) => theme.color.background};
  border-radius: 1rem;
  padding: 3rem 2rem;
  gap: 2rem;
  width: 40rem;
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
`;

export default CartBox;
