import Header from "@/Components/Header";
import { PageWrapper, Contents } from "@/shared/styled";
import { flexCenter, textLarge } from "@/styles/global-style";
import React from "react";
import styled from "styled-components";
import { ETLink } from "@/Router";

const MainPage = () => {
  return (
    <Wrapper>
      <Header />
      <div className="banner" />
      <Contents style={{ padding: "10rem 5rem" }}>
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
    ${flexCenter}
    overflow-x: scroll;
    flex: 1;
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
