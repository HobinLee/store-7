import Header from "@/Components/Header";
import { PageWrapper, Contents } from "@/shared/styled";
import styled from "styled-components";
import Footer from "@/Components/Footer";
import GiftSection from "./GiftSection";
import BannerSection from "./BannerSection/";
import ReviewSection from "./ReviewSection/";
import ProductSection from "./ProductSection/";
import { gap, media } from "@/styles/theme";
import { useSetRecoilState } from "recoil";
import { selectedCategoryState } from "@/store/category";
import { useEffect } from "react";

export interface SectionType {
  title: string;
  type: string;
}

const SECTION_TYPES: {
  [key: string]: SectionType;
} = {
  hot: { title: "잘나가는", type: "hot" },
  discount: { title: "할인 중인 상품", type: "discount" },
  new: { title: "신상", type: "new" },
};

const MainPage = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <Contents>
          <BannerSection />
          <div className="main__contents-wrapper">
            <ProductSection {...SECTION_TYPES.hot} />
            <GiftSection />
            <ProductSection {...SECTION_TYPES.discount} />
            <ReviewSection />
            <ProductSection {...SECTION_TYPES.new} />
          </div>
        </Contents>
        <Footer />
      </Wrapper>
    </>
  );
};

const Wrapper = styled(PageWrapper)`
  .main__contents-wrapper {
    margin-top: 3rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 5rem;
    ${gap("8rem", "column")}

    & > div {
      ${({ theme }) => theme.flexCenter}
      flex-direction: column;
      width: 100%;
      box-sizing: border-box;
      .title {
        width: 100%;
        ${({ theme }) => theme.font.large}
        margin-bottom: 2rem;
      }
    }
    ${media.mobile} {
      padding: 0;
    }
  }
`;

export default MainPage;
