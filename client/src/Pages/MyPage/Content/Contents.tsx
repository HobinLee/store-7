import React from "react";
import styled from "styled-components";

import Section from "../Section";
import Item from "@/Components/Item";
import Table from "../Table";
import RecentOrderRow from "./rows/RecentOrderRow";

import { ItemList } from "@/shared/styled";
import { sampleMain } from "@/shared/dummy";
import { recent, review, question } from "@/shared/dummy";

const Root = () => {
  return (
    <ContentWrapper>
      <Section
        title="진행 중인 주문"
        descrition="최근 30일 내에 진행중인 주문정보입니다."
        lineType="long1"
      >
        <div></div>
      </Section>
      <Section
        title="최근 주문 정보"
        descrition="최근 30일 내에 주문하신 내역입니다."
        lineType="long2"
      >
        <Table
          ths={[
            "날짜/주문번호",
            "상품명/옵션	",
            "상품금액/수량",
            "주문상태",
            "확인리뷰",
          ]}
          ratio={[1, 3, 1, 0.5, 0.5]}
        >
          {recent.map((re) => (
            <RecentOrderRow {...re} />
          ))}
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
    </ContentWrapper>
  );
};

const OrderList = () => {
  return (
    <ContentWrapper>
      <Section
        title="주문목록/배송조회"
        descrition="최근 30일 내에 주문한 주문정보입니다."
        lineType="long1"
      >
        <Table
          ths={[
            "날짜/주문번호",
            "상품명/옵션	",
            "상품금액/수량",
            "주문상태",
            "확인리뷰",
          ]}
          ratio={[1, 3, 1, 0.5, 0.5]}
        >
          {recent.length !== 0 ? (
            <EmptyRow colSpan={5} message="조회내역이 없습니다." />
          ) : (
            recent.map((re) => <RecentOrderRow {...re} />)
          )}
        </Table>
      </Section>
    </ContentWrapper>
  );
};

const WishList = () => {
  return (
    <ContentWrapper>
      <Section
        title="찜리스트"
        descrition="최근 30일 내에 진행중인 주문정보입니다."
        lineType="long1"
      >
        <ItemList>
          {sampleMain.map((item) => (
            <li key={item.id}>
              <Item {...item} />
            </li>
          ))}
        </ItemList>
      </Section>
    </ContentWrapper>
  );
};

const UserInfo = () => {
  return (
    <ContentWrapper>
      <Section
        title="회원정보 변경"
        descrition="회원 정보를 변경/수정할 수 있습니다."
        lineType="long1"
      >
        <div>회원정보 변경 </div>
      </Section>
    </ContentWrapper>
  );
};
const Question = () => {
  return (
    <ContentWrapper>
      <Section title="상품문의" lineType="long1">
        <Table
          ths={["문의 날짜", "카테고리", "제목", "문의상태"]}
          ratio={[1, 1, 5, 1]}
        >
          {recent.length === 0 ? (
            <EmptyRow colSpan={4} message="게시글이 존재하지 않습니다." />
          ) : (
            question.map((re) => <RecentOrderRow {...re} />)
          )}
        </Table>
      </Section>
    </ContentWrapper>
  );
};
const Review = () => {
  return (
    <ContentWrapper>
      <Section title="상품문의" lineType="long1">
        <Table ths={["번호", "제목", "날짜", "작성자"]} ratio={[1, 7, 1, 1]}>
          {recent.length === 0 ? (
            <EmptyRow colSpan={4} message="게시글이 존재하지 않습니다." />
          ) : (
            review.map((re) => <RecentOrderRow {...re} />)
          )}
        </Table>
      </Section>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div``;

const Contents = {
  "/": Root,
  "orderlist": OrderList,
  "wishlist": WishList,
  "userinfo": UserInfo,
  "question": Question,
  "review": Review,
};

interface EmptyRow {
  colSpan: number;
  message: string;
}
``;
const EmptyRow = ({ colSpan, message }: EmptyRow) => {
  return (
    <tr>
      <td colSpan={colSpan}>{message}</td>
    </tr>
  );
};

export default Contents;
