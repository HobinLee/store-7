import React from "react";
import styled from "styled-components";

import Section from "../Section";
import Item from "@/Components/Item";
import Table from "../Table";

import { ItemList } from "@/shared/styled";
import { sampleMain } from "@/shared/dummy";
import TableFrom from "../Table/tableForm";
import { recent } from "@/shared/dummy";

type RecontOrderRowType = {
  date: string;
  number: string;
  url: string;
  title: string;
  price: number;
  status: string;
  count: number;
  reviewID: number;
};

const RecentOrderRow = ({
  date,
  number,
  url,
  title,
  price,
  count,
  status,
  reviewID,
}: RecontOrderRowType) => {
  const statusStyle = status === "completed" ? { color: "#2ac1bc" } : {};
  const statusStr = {
    shipping: "배송 중",
    completed: "배송 완료",
    return: "교환/환불 중",
  };
  return (
    <tr>
      <td>
        <TableFrom.Order orderDate={date} orderNumber={number} />
      </td>
      <td>
        <TableFrom.ProductOption url={url} title={title} />
      </td>
      <td>
        {price} / {count}
      </td>
      <td style={statusStyle}>{statusStr[status]}</td>
      <td>{reviewID ? "작성완료" : <ReviewBox />}</td>
    </tr>
  );
};
const ReviewBox = () => {
  return (
    <ReviewBoxWrapper>
      <div>미작성</div>
      <button>작성하기</button>
    </ReviewBoxWrapper>
  );
};
const ReviewBoxWrapper = styled.div`
  & > button {
    width: 100%;
    margin-top: 1rem;
    padding: 0.5rem 0;
    background: black;
    color: white;
    cursor: pointer;
    ${({ theme }) => theme.borderRadius.small};
  }
`;

const Content = () => {
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

const ContentWrapper = styled.div`
  flex: 1;
`;

export default Content;
