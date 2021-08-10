import Header from "@/Components/Header";
import { PageWrapper, Contents } from "@/shared/styled";
import { flexCenter, textLarge } from "@/styles/global-style";
import React from "react";
import styled from "styled-components";
import { ETLink } from "@/Router";
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

const MainPage = () => {
  return (
    <Wrapper>
      <Header />
      <div className="banner" />
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
            {[0, 0, 0, 0].map((i, idx) => (
              <ETLink to={`/detail/${idx}`}>
                <img
                  src={
                    "https://store.baemin.com/data/goods/19/11/48/237/237_detail_058.png"
                  }
                  className="items__item"
                />
              </ETLink>
            ))}
          </div>
        </Content>
        <Content>
          <div className="title">잘나가요</div>
          <div className="items">
            {[0, 0, 0, 0].map((i, idx) => (
              <ETLink to={`/detail/${idx}`}>
                <img
                  src={
                    "https://store.baemin.com/data/goods/19/11/48/237/237_detail_058.png"
                  }
                  className="items__item"
                />
              </ETLink>
            ))}
          </div>
        </Content>
      </Contents>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled(PageWrapper)`
  .banner {
    margin-top: 0.5rem;
    width: 100%;
    height: 35rem;
    background-color: ${({ theme }) => theme.color.primary1};
  }
`;

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
