import { PageWrapper } from "@/shared/styled";
import React from "react";
import styled from "styled-components";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import Table from "./MyPage/Table";
import OrderBox from "./OrderBox";

const OrderPage = () => {
  return (
    <Wrapper>
      <Header>
        <OrderBox />
      </Header>
      <div className="contents">
        <Title>주문/결제</Title>

        <Content>
          <Info>
            <div className="label">주문상품</div>
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
          </Info>

          <Info>
            <div className="label">주문자</div>
            <div>
              <label>이름</label>
              <input />
            </div>
            <div>
              <label>이메일</label>
              <input />
            </div>
            <div>
              <label>휴대전화</label>
              <input />
            </div>
          </Info>

          <Info>
            <div className="label">
              배송지<div>변경</div>
            </div>
            <div>
              <div>집</div>
              <div>서울 강남구 선릉로76길 33 (대치동) 대치파인빌, 101호</div>
              <div>배송시 요청사항</div>
            </div>
          </Info>

          <Info>
            <div className="label">결제수단</div>
            <div>공짜는 업나여</div>
          </Info>
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
  width: 100%;
  ${({ theme }) => theme.font.xlarge}
`;

const Content = styled.div`
  box-sizing: border-box;
  padding-right: 43rem;
  align-items: flex-start;
  width: 100%;
  gap: 3rem;
`;

const Info = styled.div`
  width: 100%;
  margin: 8rem 0;
  .label {
    ${({ theme }) => theme.flexCenter};
    ${({ theme }) => theme.font.large};
    justify-content: space-between;
    padding-bottom: 2rem;
    margin: 2rem 0;
    border-bottom: 0.1rem solid ${({ theme }) => theme.color.line};
  }
  div {
    ${({ theme }) => theme.font.medium};
  }
`;

export default OrderPage;
