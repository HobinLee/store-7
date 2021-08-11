import Header from "@/Components/Header";
import { PageWrapper } from "@/shared/styled";
import React from "react";
import styled from "styled-components";
import Table from "./Table";
import Section from "./Section";
import { sampleMain } from "@/shared/dummy";
import Item from "@/Components/Item";
import tableForm from "./tableForm";
import Sidebar from "./Sidebar";

const MyPage = () => {
  return (
    <MyPageWrapper>
      <Header />
      <Container>
        <Sidebar />
        <Content>
          <ContentHeader />
          <ContentBody />
        </Content>
      </Container>
    </MyPageWrapper>
  );
};

const MyPageWrapper = styled(PageWrapper)``;

const Container = styled.div`
  padding-top: 5rem;
  margin: 0 auto;
  width: 110rem;
  display: flex;
`;

const Content = styled.div`
  flex: 1;
`;

const ContentHeader = () => {
  return (
    <ContentHeaderWrapper>
      <div className="greeting">반가워요,</div>
      <p>홍영준님의</p>
      <p>회원등급은 일반회원그룹 입니다.</p>
    </ContentHeaderWrapper>
  );
};

const ContentHeaderWrapper = styled.div`
  .greeting {
    font-size: 4rem;
    font-weight: bold;
    margin: 2.5rem 0;
  }
  p {
    font-size: 1.7rem;
    line-height: 1.7rem;
  }
  p + p {
    margin-top: 1rem;
  }
`;

const ContentBody = () => {
  return (
    <ContentBodyWrapper>
      <Section
        title="찜리스트"
        descrition="최근 30일 내에 진행중인 주문정보입니다."
      >
        <Table
          checker
          ths={["상품명/옵션", "상품금액/수량	", "합계"]}
          ratio={[6, 2, 1]}
        >
          <tr>
            <td>
              <tableForm.ProductOption
                url="https://user-images.githubusercontent.com/41738385/128832252-b19d32b1-0a89-4eb6-b5d9-c399de5f44cc.jpeg"
                title="플리츠마마x배달으민족. 텀블러백"
              />
            </td>
            <td>2</td>
            <td>3</td>
          </tr>
          <tr>
            <td>test2</td>
            <td>2</td>
            <td>3</td>
          </tr>
        </Table>
      </Section>
      <Section
        title="진행 중인 주문"
        descrition="최근 30일 내에 진행중인 주문정보입니다."
      >
        <Table ths={["상품명/옵션", "상품금액/수량	", "합계"]} ratio={[6, 2, 1]}>
          <tr>
            <td>test</td>
            <td>2</td>
            <td>3</td>
          </tr>
          <tr>
            <td>test2</td>
            <td>2</td>
            <td>3</td>
          </tr>
        </Table>
      </Section>
      <Section
        title="최근 주문 정보"
        descrition="최근 30일 내에 주문하신 내역입니다."
      >
        <Table
          ths={[
            "날짜/주문번호",
            "상품명/옵션	",
            "상품금액/수량",
            "주문상태",
            "확인리뷰",
          ]}
          ratio={[1, 2, 1, 1, 1]}
        >
          <tr>
            <td>test 1</td>
            <td>test 2</td>
            <td>test 3</td>
            <td>test 4</td>
            <td>test 5</td>
          </tr>
        </Table>
      </Section>
      <Section title="최근 본 상품" descrition="ET님께서 본 최근 상품입니다.">
        <ItemList>
          {sampleMain.map((item) => (
            <li key={item.id}>
              <Item {...item} />
            </li>
          ))}
        </ItemList>
      </Section>
    </ContentBodyWrapper>
  );
};

const ItemList = styled.ul`
  display: flex;
  margin-top: 2rem;
  gap: 1rem;
  justify-content: space-between;
  width: 100%;
`;

const ContentBodyWrapper = styled.div``;

export default MyPage;
