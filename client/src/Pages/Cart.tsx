import { PageWrapper } from "@/shared/styled";
import React from "react";
import styled from "styled-components";
import Header from "@/Components/Header";

const CartPage = () => {
  return (
    <Wrapper>
      <Header />
      <div className="contents">
        <Process>
          <div className="title">장바구니</div>
          <div className="process">
            <div>01 장바구니</div>
            <div>02 주문서작성/결제</div>
            <div>03 주문완료</div>
          </div>
        </Process>

        <List>
          <div className="header">
            <input type="checkbox" />
            <div>상품/옵션 정보</div>
            <div>수량</div>
            <div>상품금액</div>
            <div>배송비</div>
          </div>

          <div className="item">
            <input type="checkbox" />
            <div>
              <img />
              <div>으아아ㅏ악</div>
            </div>
            <div>
              <div>1개</div>
              <button>옵션/수량변경</button>
            </div>
            <div>10,000원</div>
            <div>0원</div>
          </div>
        </List>

        <Result>
          <div>
            <div>총 2개의 상품금액</div>
            <div>10,000원</div>
          </div>
          <div>
            <div>배송비</div>
            <div>0원</div>
          </div>
          <div>
            <div>합계</div>
            <div>10,000원</div>
          </div>
        </Result>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled(PageWrapper)`
  .contents {
    ${({ theme }) => theme.flexCenter}
    flex-direction: column;
    padding: 0 10rem;
  }
`;

const Process = styled.div`
  ${({ theme }) => theme.flexCenter}
  margin-top: 5rem;
  padding: 2rem 0;
  border-bottom: 0.1rem solid black;
  width: 100%;
  justify-content: space-between;
  .title {
    ${({ theme }) => theme.font.xlarge}
  }
  .process {
    ${({ theme }) => theme.flexCenter}
    ${({ theme }) => theme.font.medium}
    gap: 2rem;
  }
`;

const List = styled.div`
  ${({ theme }) => theme.flexCenter}
  flex-direction: column;
  width: 100%;
  .header,
  .item {
    ${({ theme }) => theme.flexCenter}
    width: 100%;
    flex: 1;
  }
`;

const Result = styled.div`
  ${({ theme }) => theme.flexCenter}
  padding: 2rem;
  border: 0.3rem solid ${({ theme }) => theme.color.primary1};
  width: 100%;
`;

export default CartPage;
