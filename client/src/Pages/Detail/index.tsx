import Header from "@/Components/Header";
import OptionBox from "./OptionBox";
import useInput from "@/hooks/useInput";
import { PageWrapper, Contents } from "@/shared/styled";
import { useState } from "react";
import styled from "styled-components";
import Review from "./Review";
import Question from "./Question";
import Footer from "@/Components/Footer";
import Guide from "./Guide";
import DetailInfo from "./DetailInfo";
import ZoomModal from "./ZoomModal";
import { gap, media } from "@/styles/theme";
import { convertToKRW } from "@/utils/util";
import { useProduct } from "@/api/products";
import properties from "@/config/properties";
import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState } from "@/store/state";
import { deleteWishProduct, postWishProduct } from "@/api/my";
import { useDebounce, useDidMountEffect } from "@/hooks";
import { selectedCategoryState } from "@/store/category";
import { categories } from "@/shared/dummy";
import { Image } from "@/Components/Common";
import { useEffect } from "react";

const topHeight = innerWidth > 500 ? 700 : 400;

export const tabs = [
  {
    id: "first",
    title: "상품상세정보",
  },
  { id: "second", title: "배송/교환/반품 안내" },
  { id: "third", title: "상품후기" },
  { id: "fourth", title: "상품문의" },
];

const DetailPage = () => {
  const category = useRecoilValue(selectedCategoryState);
  const productId = location.pathname.split("detail/")[1];
  const {
    status,
    data: product,
    error,
    refetch,
  } = useProduct(parseInt(productId));

  const [isMyWish, setIsMyWish] = useState(product?.isWish);
  const debounceIsMyWish = useDebounce<boolean>(isMyWish, 300);
  const isLoggedin = useRecoilValue(loginState);
  const numValue = useInput("1");

  const handleClickWish = async (e: Event) => {
    e.stopPropagation();
    if (!isLoggedin) {
      return;
    }
    setIsMyWish((isMyWish) => !isMyWish);
  };

  const handleClickNumVal = (val: 1 | -1) => {
    let num = parseInt(numValue.value);
    if (val === 1) {
      numValue.setValue((num + 1).toString());
    } else {
      if (num > 1) numValue.setValue((num - 1).toString());
    }
  };

  const [selectedTab, setSelectedTab] = useState("first");
  const handleSelectTab = (val: string) => {
    window.scrollTo({ top: topHeight, behavior: "smooth" });
    setSelectedTab(val);
  };

  useEffect(() => {
    if (product) {
      setIsMyWish(product?.isWish);
    }
  }, [product]);

  const [isZoomOpened, setIsZoomOpened] = useState(false);

  useDidMountEffect(async () => {
    //like를 이미 했는데, undefined -> like처리가 됨
    if (debounceIsMyWish !== product.isWish) {
      debounceIsMyWish
        ? await postWishProduct(product.id)
        : await deleteWishProduct(product.id);
    }
  }, [debounceIsMyWish]);

  const RenderTabComponent = useCallback(() => {
    switch (selectedTab) {
      case "first":
        return <DetailInfo {...{ product }} />;
      case "second":
        return <Guide />;
      case "third":
        return <Review />;
      case "fourth":
        return <Question />;
      default:
        return;
    }
  }, [product, selectedTab]);

  return (
    <>
      <Header />
      {status !== "loading" && (
        <Wrapper>
          <Contents>
            <InfoBox>
              <div
                data-testid="image-box"
                onClick={() => setIsZoomOpened(true)}
                onMouseLeave={() => setIsZoomOpened(false)}
                className="img-box"
              >
                <Image
                  id="image"
                  src={properties.imgURL + product.images[0]}
                  className="thumbnail"
                  lazyload={true}
                />
                {isZoomOpened && (
                  <>
                    <ZoomLens data-testid="zoom-lens" id="zoom-lens" />
                    <ZoomModal />
                  </>
                )}
              </div>
              <Info>
                <div className="title">{product.name}</div>

                <div>
                  <div className="list">
                    <div className="list__item">
                      <div className="list__item--title">판매가격</div>
                      <div className="list__item--content price">
                        {convertToKRW(product.price)}
                        {product.discountRate !== 0 && (
                          <div className="list__item--sale">
                            <div className="before-price">
                              {convertToKRW(product.originPrice)}
                            </div>
                            <div className="discount-rate">
                              {product.discountRate}%
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="list__item">
                    <div className="list__item--title">배송비</div>
                    <div className="list__item--content">
                      {product.deliveryCost === 0
                        ? "무료"
                        : convertToKRW(product.deliveryCost)}
                    </div>
                  </div>
                </div>

                <OptionBox
                  {...{
                    numValue,
                    handleClickNumVal,
                    product,
                    refetch,
                    isMyWish,
                    handleClickWish,
                  }}
                />
              </Info>
            </InfoBox>
          </Contents>
          <Scroll selectedTab={selectedTab}>
            <Tab
              hasSubCategories={
                category.categoryId < 0
                  ? false
                  : !!categories[category.categoryId / 100]?.subCategories
                      .length
              }
            >
              {tabs.map((tab) => (
                <TabA
                  key={tab.title}
                  onClick={() => handleSelectTab(tab.id)}
                  isSelected={selectedTab === tab.id}
                >
                  {tab.title}
                </TabA>
              ))}
            </Tab>

            <div className="bottom-wrapper">
              <div>
                <TabPage>
                  <RenderTabComponent />
                </TabPage>
                <div className="option-box">
                  <OptionBox
                    {...{
                      numValue,
                      handleClickNumVal,
                      product,
                      isMyWish,
                      handleClickWish,
                    }}
                  />
                </div>
              </div>
            </div>
          </Scroll>
          <Footer />
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled(PageWrapper)`
  .contents {
    ${({ theme }) => theme.flexCenter}
    flex-direction: column;
    width: 100%;
  }
  .header-wrapper {
    position: relative;
  }
`;

const ZoomLens = styled.div`
  position: absolute;
  border: 1px solid #d4d4d4;
  width: 15rem;
  height: 15rem;
`;

const InfoBox = styled.div`
  ${({ theme }) => theme.flexCenter}
  align-items: flex-start;
  margin-top: 5rem;
  width: 100%;
  height: 50rem;
  box-sizing: border-box;
  ${gap("5rem")}
  ${media.mobile} {
    ${gap("0")}
  }
  .thumbnail {
    width: 100%;
    max-height: 50rem;
    object-fit: cover;
    background-color: lightgray;
    border-radius: 2rem;
    ${media.mobile} {
      max-height: 40rem;
      margin-bottom: 2rem;
    }
  }
  .img-box {
    cursor: zoom-in;
    position: relative;
  }
  ${media.tablet} {
    padding: 0 2rem;
  }
  ${media.mobile} {
    height: 90rem;
    flex-direction: column;
    align-items: center;
  }
`;

const Info = styled.div`
  ${({ theme }) => theme.flexCenter}
  flex-direction: column;
  width: 50rem;
  height: 100%;
  align-items: flex-start;
  justify-content: space-between;
  ${media.mobile} {
    width: 100%;
    padding: 0 2rem;
    box-sizing: border-box;
  }
  & > * {
    width: 100%;
  }
  .title {
    ${({ theme }) => theme.font.xlarge}
  }
  .list {
    &__item {
      ${({ theme }) => theme.flexCenter}
      justify-content: flex-start;
      margin-top: 2rem;
      ${({ theme }) => theme.font.medium}
      &--title {
        width: 6rem;
      }
      &--content {
        margin-left: 3rem;
        &.price {
          ${({ theme }) => theme.font.large}
          display: flex;
        }
      }
      &--sale {
        display: flex;
        align-items: flex-end;
        margin-left: 0.5rem;

        .before-price {
          ${({ theme }) => theme.font.medium};
          text-decoration: line-through;
        }
        .discount-rate {
          color: ${({ theme }) => theme.color.red};
          ${({ theme }) => theme.font.large};
          font-weight: 700;
          margin-left: 0.5rem;
        }
      }
    }
  }
`;

const Scroll = styled.div<{ selectedTab: string }>`
  width: 100%;
  box-sizing: border-box;
  margin-top: 5rem;
  background: #fff;

  .bottom-wrapper {
    ${({ theme }) => theme.flexCenter};
    width: 100%;
    box-sizing: border-box;
    padding: 0 5rem;
    position: relative;
    & > div {
      width: 120rem;
      padding: 3rem 0;
      display: flex;
      ${gap("3rem")}
      img {
        width: 100%;
      }
    }
  }

  .option-box {
    ${media.mobile} {
      display: none;
    }
  }
`;

const Tab = styled.div<{ hasSubCategories: boolean }>`
  ${({ theme }) => theme.flexCenter}
  position: -webkit-sticky;
  position: sticky;
  ${gap("2rem")}
  background: rgba(255, 255, 255, 0.9);
  z-index: 1;
  top: ${({ hasSubCategories }) => (hasSubCategories ? 17.2 : 13.6)}rem;

  ${media.mobile} {
    top: ${({ hasSubCategories }) => (hasSubCategories ? 9.2 : 5.7)}rem;
  }
`;

const TabA = styled.div<{ isSelected: boolean }>`
  cursor: pointer;
  padding: 2rem 4rem;
  ${({ theme }) => theme.font.medium}
  border-bottom: 0.3rem solid ${({ isSelected, theme }) =>
    isSelected ? theme.color.primary1 : "transparent"};
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.color.primary1 : theme.color.title_active};
  ${media.tablet} {
    padding: 2rem 1rem;
  }
`;

const TabPage = styled.div`
  position: relative;
  width: 100%;
  padding: 2rem 0;
`;

export default DetailPage;
