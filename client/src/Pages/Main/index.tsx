import Header from "@/Components/Header";
import { PageWrapper, Contents, ItemList } from "@/shared/styled";
import React from "react";
import styled from "styled-components";
import Banner, { ItemType } from "./Banner";
import BannerImg from "@/assets/banner1.gif";
import Item from "@/Components/Item";
import Footer from "@/Components/Footer";
import { sampleMain } from "@/shared/dummy";

const banner1: ItemType = {
  brief: "다시 돌아온 플리츠마마x배민 콜라보!",
  title: "플리츠마마X배달의민족. 텀블러백",
  src: BannerImg,
  id: 1,
};

const list: ItemType[] = [banner1];

const MainPage = () => {
  return (
    <Wrapper>
      <Header />
      <Banner items={list} />
      <Contents style={{ padding: "10rem 5rem" }}>
        <Content>
          <div className="title">잘나가는</div>
          <ItemList>
            {sampleMain.map((item) => (
              <li key={item.id}>
                <Item {...item} />
              </li>
            ))}
          </ItemList>
        </Content>
        <Content>
          <div className="title">잘나가요</div>
          <ItemList>
            {sampleMain.map((item) => (
              <li key={item.id}>
                <Item {...item} />
              </li>
            ))}
          </ItemList>
        </Content>
        <Content>
          <div className="title">잘나가요</div>
          <ItemList>
            {sampleMain.map((item) => (
              <li key={item.id}>
                <Item {...item} />
              </li>
            ))}
          </ItemList>
        </Content>
      </Contents>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled(PageWrapper)``;

const Content = styled.div`
  ${({ theme }) => theme.flexCenter}
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  & + & {
    margin-top: 10rem;
  }
  .title {
    width: 100%;
    ${({ theme }) => theme.font.large}
  }
`;

export default MainPage;
