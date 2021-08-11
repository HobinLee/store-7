import { PageWrapper } from "@/shared/styled";
import React from "react";
import styled from "styled-components";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import Table from "@/Pages/MyPage/Table";
import OrderBox from "./OrderBox";
import Input from "@/Components/Input";
import useInput from "@/hooks/useInput";

const OrderPage = () => {
  const nameValue = useInput("");
  const emailValue = useInput("");
  const phoneValue = useInput("");

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
            <div className="info-input">
              <label>이름</label>
              <Input
                className="order-input"
                value={nameValue.value}
                onChange={nameValue.onChange}
              />
            </div>
            <div className="info-input">
              <label>이메일</label>
              <Input
                className="order-input"
                value={emailValue.value}
                onChange={emailValue.onChange}
              />
              @
              <select className="order-input">
                <option>naver.com</option>
                <option>naver.com</option>
                <option>naver.com</option>
                <option>직접 입력</option>
              </select>
            </div>
            <div className="info-input">
              <label>휴대전화</label>
              <select className="order-input">
                <option>010</option>
                <option>010</option>
                <option>010</option>
              </select>
              <Input
                className="order-input"
                value={phoneValue.value}
                onChange={phoneValue.onChange}
              />
            </div>
          </Info>

          <Info>
            <div className="label">
              배송지<div>변경</div>
            </div>
            <div>
              <div>집</div>
              <div>서울 강남구 선릉로76길 33 (대치동) 대치파인빌, 101호</div>
              <select className="order-input">
                <option>배송시 요청사항을 선택해주세요.</option>
                <option>부재시 문 앞에 놓아주세요.</option>
                <option>배송전에 미리 연락주세요.</option>
              </select>
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
  select {
    cursor: pointer;
  }
  .order-input {
    border: 0.1rem solid ${({ theme }) => theme.color.line};
    padding: 0.8rem 1rem;
    border-radius: 0.5rem;
  }
  .info-input {
    ${({ theme }) => theme.flexCenter};
    justify-content: start;
    :not(:first-child) {
      margin-top: 2rem;
    }
    label {
      width: 7rem;
    }
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
