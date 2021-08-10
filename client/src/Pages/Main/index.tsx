import Header from "@/Components/Header";
import { PageWrapper, Contents } from "@/shared/styled";
import { flexCenter, textLarge, textMedium, textXLarge } from "@/styles/global-style";
import React from "react";
import styled from "styled-components";
import { ETLink } from "@/Router";
import Banner, { ItemType } from "./Banner";
import BannerImg from "@/assets/banner1.gif";
import Item from "@/Components/Item";

const sample = [
  {
    id: 1,
    discountRate: 40,
    tags: ["new", "sale"],
    title: "타이틀",
    price: 10000,
  },
  {
    id: 2,
    discountRate: 20,
    tags: ["new", "green", "sale"],
    title: "타이틀2",
    price: 260000,
  },
  {
    id: 3,
    tags: ["green"],
    title: "타이틀3",
    price: 10000,
  },
  {
    id: 4,
    discountRate: 50,
    tags: ["sale"],
    title: "타이틀4",
    price: 100000,
  },
];

const banner1: ItemType = {
  brief: '다시 돌아온 플리츠마마x배민 콜라보!',
  title: '플리츠마마X배달의민족. 텀블러백',
  src: BannerImg,
  id: 1
}

const list: ItemType[] = [banner1];

const MainPage = () => {
  return (
    <Wrapper>
      <Header />
      <Banner items={list}/>
      <Contents style={{ padding: "10rem 5rem" }}>
        <Content>
          <div className="title">잘나가요</div>
          <div className="items">
            {sample.map((item) => (
              <Item {...item} />
            ))}
          </div>
        </Content>
        <Content>
          <div className="title">잘나가요</div>
          <div className="items">
            {sample.map((item) => (
              <Item {...item} />
            ))}
          </div>
        </Content>
        <Content>
          <div className="title">잘나가요</div>
          <div className="items">
            {sample.map((item) => (
              <Item {...item} />
            ))}
          </div>
        </Content>
      </Contents>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled(PageWrapper)`
margin-top: 20rem;
`

const Content = styled.div`
  ${flexCenter}
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  & + & {
    margin-top: 10rem;
  }
  .title {
    width: 100%;
    ${textLarge}
  }
  .items {
    display: flex;
    margin-top: 2rem;
    gap: 1rem;
    justify-content: space-between;
    width: 100%;
    &__item {
      flex: 0.4;
      height: 30rem;
      background-color: lightgray;
    }
  }
`;

const Footer = styled.div`
  width: 100%;
  height: 30rem;
  background-color: lightgray;
`;

export default MainPage;
