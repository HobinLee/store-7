import Header from "@/Components/Header";
import { PageWrapper, Contents } from "@/shared/styled";
import React from "react";
import styled from "styled-components";
import Footer from "@/Components/Footer";
import GiftSection from "./GiftSection";
import BannerSection from "./BannerSection/";
import ReviewSection from "./ReviewSection/";
import ProductSection from "./ProductSection/";

const MainPage = () => {
  return (
    <Wrapper>
      <Header />
      <BannerSection />
      <Contents style={{ padding: "10rem 5rem" }}>
        <div className="main__contents-wrapper">
          <ProductSection title="잘나가는" />
          <GiftSection />
          <ProductSection title="할인 중인 상품" />
          <ReviewSection />
          <ProductSection title="신상" />
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
    gap: 10rem;

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
