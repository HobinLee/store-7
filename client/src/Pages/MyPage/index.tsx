import Header from "@/Components/Header";
import { PageWrapper, Contents } from "@/shared/styled";
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
      <Contents>
        <ContentHeader />
        <ContentBody>
          <Sidebar />
          <Content />
        </ContentBody>
      </Contents>
    </MyPageWrapper>
  );
};

const MyPageWrapper = styled(PageWrapper)``;

const ContentBody = styled.div`
  display: flex;
`;

const ContentHeader = () => {
  return (
    <ContentHeaderWrapper>
      <div className="greeting">반가워요,</div>
      <p>
        <span>홍영준</span> 님의
      </p>
      <p>
        회원등급은 <span>일반회원</span>입니다.
      </p>
    </ContentHeaderWrapper>
  );
};

const ContentHeaderWrapper = styled.div`
  width: 100%;
  margin-bottom: 8rem;

  .greeting {
    font-size: 4rem;
    font-weight: bold;
    margin: 2.5rem 0;
  }

  p {
    font-size: 1.7rem;
    line-height: 1.7rem;
    span {
      ${({ theme }) => theme.font.large}
    }
  }

  p + p {
    margin-top: 1rem;
  }
`;

const Content = () => {
  return (
    <ContentBodyWrapper>
      <Section
        title="찜리스트"
        descrition="최근 30일 내에 진행중인 주문정보입니다."
        lineType="long1"
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
        lineType="long2"
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
        lineType="long3"
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
      <Section
        title="최근 본 상품"
        descrition="ET님께서 본 최근 상품입니다."
        lineType="long2"
      >
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
