import React from "react";
import styled from "styled-components";

import Section from "../Section";
import Item from "@/Components/Item";
import Table from "../Table";

import { ItemList } from "@/shared/styled";
import { sampleMain } from "@/shared/dummy";
import TableFrom from "../Table/tableForm";

const Content = () => {
  return (
    <ContentWrapper>
      <Section
        title="진행 중인 주문"
        descrition="최근 30일 내에 진행중인 주문정보입니다."
        lineType="long1"
      >
        <Table ths={["상품명/옵션", "상품금액/수량	", "합계"]} ratio={[6, 2, 1]}>
          <tr>
            <td>
              <TableFrom.ProductOption
                url="https://user-images.githubusercontent.com/41738385/128832252-b19d32b1-0a89-4eb6-b5d9-c399de5f44cc.jpeg"
                title="아 11시 30분에 했던 걸 날려먹어서 다시 하고 있네 하하 인생은 도전보단 안전이다 내일 점심 저녁 다 맛있는거 머거야지 데모 영상은 뭐 그냥 뚝딱 찍자"
              />
            </td>
            <td>2</td>
            <td>3</td>
          </tr>
          <tr>
            <td>
              <TableFrom.ProductOption
                url="https://user-images.githubusercontent.com/41738385/128832252-b19d32b1-0a89-4eb6-b5d9-c399de5f44cc.jpeg"
                title="테스트 2"
              />
            </td>
            <td>2</td>
            <td>3</td>
          </tr>
          <tr>
            <td>
              <TableFrom.ProductOption
                url="https://user-images.githubusercontent.com/41738385/128832252-b19d32b1-0a89-4eb6-b5d9-c399de5f44cc.jpeg"
                title="테스트 3"
              />
            </td>
            <td>2</td>
            <td>3</td>
          </tr>
        </Table>
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
