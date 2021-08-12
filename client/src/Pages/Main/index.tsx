import Header from "@/Components/Header";
import { PageWrapper, Contents, ItemList } from "@/shared/styled";
import React from "react";
import styled from "styled-components";
import Item from "@/Components/Item";
import Footer from "@/Components/Footer";
import { sampleMain } from "@/shared/dummy";
import GiftSection from "./GiftSection";
import BannerSection from "./BannerSection/";

const MainPage = () => {
  return (
    <Wrapper>
      <Header />
      <BannerSection />
      <Contents style={{ padding: "10rem 5rem" }}>
        <div className="main__contents-wrapper">
          <div>
            <div className="title">잘나가는</div>
            <ItemList>
              {sampleMain.map((item) => (
                <li key={item.id}>
                  <Item {...item} />
                </li>
              ))}
            </ItemList>
          </div>
          <GiftSection />
          <div>
            <div className="title">잘나가요</div>
            <ItemList>
              {sampleMain.map((item) => (
                <li key={item.id}>
                  <Item {...item} />
                </li>
              ))}
            </ItemList>
          </div>
        </div>
      </Contents>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled(PageWrapper)`
  .main__contents-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 5rem;

    & > div {
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
        margin-bottom: 2rem;
      }
    }
  }
`;

export default MainPage;
