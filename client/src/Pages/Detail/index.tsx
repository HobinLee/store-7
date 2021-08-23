import Header from "@/Components/Header";
import OptionBox from "./OptionBox";
import useInput from "@/hooks/useInput";
import { PageWrapper, Contents } from "@/shared/styled";
import { useState, useEffect } from "react";
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

const topHeight = 740;

export const tabs = [
  {
    id: "first",
    title: "상품상세정보",
    component: <DetailInfo />,
  },
  { id: "seconed", title: "배송/교환/반품 안내", component: <Guide /> },
  { id: "third", title: "상품후기", component: <Review /> },
  { id: "fourth", title: "상품문의", component: <Question /> },
];

const DetailPage = () => {
  const productId = location.pathname.split("detail/")[1];
  const [yOffset, setYOffset] = useState(0);

  const { status, data: product, error } = useProduct(parseInt(productId));

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
    window.scrollTo({ top: topHeight + 1, behavior: "smooth" });
    setSelectedTab(val);
  };

  const [isZoomOpened, setIsZoomOpened] = useState(false);

  useEffect(() => {
    addEventListener("scroll", () => {
      setYOffset(window.pageYOffset);
    });

    return () => {
      removeEventListener("scroll", () => {
        setYOffset(window.pageYOffset);
      });
    };
  }, []);

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
                src={process.env.IMG_URL + product.images[0]}
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
                {...{ numValue, handleClickNumVal, product }}
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
            {tabs.map((tab) => (
              <TabPage data-testid={tab.title} key={tab.title}>
                {tab.id === selectedTab && tab.component}
              </TabPage>
            ))}
          </div>

          {yOffset > topHeight && selectedTab === "first" && (
            <div className="option-box">
              <OptionBox {...{ numValue, handleClickNumVal, product }} />
            </div>
          )}
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
  margin-top: 5rem;
  width: 100%;
  height: 50rem;
  box-sizing: border-box;
  ${gap("5rem")}
  .thumbnail {
    width: 50rem;
    height: 100%;
    object-fit: cover;
    background-color: lightgray;
  }
  .img-box {
    cursor: zoom-in;
    position: relative;
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
  padding-right: ${({ selectedTab }) => selectedTab === "first" && "25rem"};
  ${media.mobile} {
    padding: 0;
  }
  box-sizing: border-box;
  margin-top: 10rem;

  .bottom-wrapper {
    box-sizing: border-box;
    width: 100%;
    padding: 0 5rem;
  }

  .option-box {
    position: fixed;
    right: 3rem;
    bottom: 3rem;
    .total-price {
      margin-top: 3rem;
    }
    &::after {
      content: "";
      z-index: -1;
      width: 50rem;
      height: 33.5rem;
      border-radius: 1rem;
      position: absolute;
      top: 3rem;
      left: -2rem;
      opacity: 0.5;
      background: #fff;
    }
  }
`;

const Tab = styled.div`
  ${({ theme }) => theme.flexCenter}
  position: -webkit-sticky;
  position: sticky;

  top: 14.6rem;
  background: ${({ theme }) => theme.color.background};
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
`;

const TabPage = styled.div`
  position: relative;
  width: 100%;
  padding: 2rem 0;
`;

export default DetailPage;
