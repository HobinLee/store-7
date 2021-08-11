import { PageWrapper } from "@/shared/styled";
import React from "react";
import styled from "styled-components";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import Table from "./MyPage/Table";
import Button from "@/Components/Button";

const CartPage = () => {
  return (
    <Wrapper>
      <Header />
      <div className="contents">
        <Title>장바구니</Title>

        <Content>
          <Table
            checker
            ths={["상품/옵션 정보", "수량", "상품금액", "배송비"]}
            ratio={[6, 1, 1, 1]}
          >
            <tr>
              <td>test</td>
              <td>1개</td>
              <td>10,000원</td>
              <td>2,500원</td>
            </tr>
            <tr>
              <td>test2</td>
              <td>2개</td>
              <td>10,000원</td>
              <td>2,500원</td>
            </tr>
          </Table>

          <div>
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
          </div>
        </Content>
      </div>
      <Footer />
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

const Title = styled.div`
  margin-top: 5rem;
  width: 100%;
  ${({ theme }) => theme.font.xlarge}
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

export default CartPage;
