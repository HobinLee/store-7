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
import { isMyWishInDetail } from "@/store/state";
import { useEffect } from "react";
import useDidMountEffect from "@/hooks/useDidMountEffect";
import { deleteWishProduct, postWishProduct } from "@/api/my";
import useDebounce from "@/hooks/useDebounce";

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
  const productId = location.pathname.split("detail/")[1];
  const {
    status,
    data: product,
    error,
    refetch,
  } = useProduct(parseInt(productId));
  const [isMyWish, setIsMyWish] = useRecoilState(isMyWishInDetail);
  const debounceIsMyWish = useDebounce<boolean>(isMyWish, 300);

  const numValue = useInput("1");
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

  const [isZoomOpened, setIsZoomOpened] = useState(false);

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

  useEffect(() => {
    setIsMyWish(product?.isWish);
  }, [product]);

  useDidMountEffect(() => {
    debounceIsMyWish
      ? postWishProduct(product.id)
      : deleteWishProduct(product.id);
  }, [debounceIsMyWish]);

  return (
    status !== "loading" && (
      <Wrapper>
        <Header />

        <Contents>
          <InfoBox>
            <div
              data-testid="image-box"
              onClick={() => setIsZoomOpened(true)}
              onMouseLeave={() => setIsZoomOpened(false)}
              className="img-box"
            >
              <img
                id="image"
                src={properties.imgURL + product.images[0]}
                className="thumbnail"
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

              <div className="list">
                <div className="list__item">
                  <div className="list__item--title">판매가격</div>
                  <div className="list__item--content price">
                    {convertToKRW(product.price)}
                  </div>
                </div>
                <div className="list__item">
                  <div className="list__item--title">배송정보</div>
                  <div className="list__item--content">
                    {convertToKRW(product.deliveryCost)}
                  </div>
                </div>
              </div>

              <OptionBox
                key="option-box"
                {...{ numValue, handleClickNumVal, product, refetch, isMyWish }}
              />
            </Info>
          </InfoBox>
        </Contents>
        <Scroll selectedTab={selectedTab}>
          <Tab>
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
                  {...{ numValue, handleClickNumVal, product, isMyWish }}
                />
              </div>
            </div>
          </div>
        </Scroll>
        <Footer />
      </Wrapper>
    )
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
  .thumbnail {
    width: 100%;
    max-height: 50rem;
    object-fit: cover;
    background-color: lightgray;
    border-radius: 2rem;
  }
  .img-box {
    cursor: zoom-in;
    position: relative;
  }
  ${media.tablet} {
    height: 40rem;
    padding: 0 2rem;
  }
`;

const Info = styled.div`
  ${({ theme }) => theme.flexCenter}
  flex-direction: column;
  width: 50rem;
  height: 100%;
  align-items: flex-start;
  justify-content: space-between;
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
      }
      &--content {
        margin-left: 3rem;
        &.price {
          ${({ theme }) => theme.font.large}
        }
      }
    }
  }
`;

const Scroll = styled.div<{ selectedTab: string }>`
  width: 100%;
  ${media.mobile} {
    padding: 0;
  }
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
    ${media.tablet} {
      button {
        ${({ theme }) => theme.font.small};
        ${({ theme }) => theme.borderRadius.small};
        padding: 1rem 1.5rem;
      }
    }
    .total-price {
      margin-top: 2rem;
    }
  }
`;

const Tab = styled.div`
  ${({ theme }) => theme.flexCenter}
  position: -webkit-sticky;
  position: sticky;
  ${gap("2rem")}
  top: 14.6rem;
  background: rgba(255, 255, 255, 0.9);
  z-index: 1;
  ${media.mobile} {
    top: 10.6rem;
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
