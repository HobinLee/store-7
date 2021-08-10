import Header from "@/Components/Header";
import OptionBox from "./OptionBox";
import useInput from "@/hooks/useInput";
import { PageWrapper, Contents } from "@/shared/styled";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Review from "./Review";
import Question from "./Question";
import Footer from "@/Components/Footer";
import { DeliveryQuide, ExchangeGuide } from "./Guide";

const topHeight = 645;

const Blank = styled.div`
  width: 100%;
  height: 100rem;
  background: lightgray;
`;

const tabs = [
  { id: "first", title: "상품상세정보", component: <Blank /> },
  { id: "secone", title: "배송안내", component: <Blank /> },
  { id: "third", title: "교환 및 반품안내", component: <Blank /> },
  { id: "fourth", title: "상품후기", component: <Review /> },
  { id: "fifth", title: "상품문의", component: <Question /> },
];

const DetailPage = () => {
  const [yOffset, setYOffset] = useState(0);

  const numValue = useInput("1");
  const handleClickNumVal = (val: 1 | -1) => {
    let num = parseInt(numValue.value);
    if (val === 1) {
      numValue.setValue((num + 1).toString());
    } else {
      if (num > 0) numValue.setValue((num - 1).toString());
    }
  };

  const [selectedTab, setSelectedTab] = useState("first");
  const handleSelectTab = (val: string) => {
    setSelectedTab(val);
  };

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
    <Wrapper>
      <Header />
      <Contents>
        <InfoBox>
          <img
            src={
              "https://store.baemin.com/data/goods/19/11/48/237/237_detail_058.png"
            }
            className="thumbnail"
          />
          <Info>
            <div className="title">으아아아악</div>

            <div className="list">
              <div className="list__item">
                <div className="list__item--title">판매가격</div>
                <div className="list__item--content price">10,000원</div>
              </div>
              <div className="list__item">
                <div className="list__item--title">배송정보</div>
                <div className="list__item--content">2,500원</div>
              </div>
            </div>

            <OptionBox {...{ numValue, handleClickNumVal }} />
          </Info>
        </InfoBox>

        <Scroll yOffset={yOffset}>
          <Tab yOffset={yOffset}>
            {tabs.map((tab) => (
              <a href={`#${tab.id}`}>
                <TabA
                  onClick={() => handleSelectTab(tab.id)}
                  isSelected={selectedTab === tab.id}
                >
                  {tab.title}
                </TabA>
              </a>
            ))}
          </Tab>

          <div className="bottom-wrapper">
            <div className="scroll">
              {tabs.map((tab) => (
                <ScrollPage>
                  <div className="link" id={tab.id} />
                  {tab.component}
                </ScrollPage>
              ))}
            </div>
          </div>

          {yOffset > topHeight && (
            <div className="option-box">
              <OptionBox {...{ numValue, handleClickNumVal }} />
            </div>
          )}
        </Scroll>
      </Contents>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled(PageWrapper)`
  .contents {
    ${({ theme }) => theme.flexCenter}
    flex-direction: column;
    width: 100%;
  }
`;

const InfoBox = styled.div`
  ${({ theme }) => theme.flexCenter}
  margin-top: 5rem;
  width: 100%;
  height: 50rem;
  box-sizing: border-box;
  gap: 9rem;
  .thumbnail {
    width: 50rem;
    height: 100%;
    object-fit: cover;
    background-color: lightgray;
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

const Scroll = styled.div<{ yOffset: number }>`
  width: 100%;
  margin-top: 10rem;
  .bottom-wrapper {
    ${({ theme }) => theme.flexCenter}
    .scroll {
      margin-top: 7rem;
      width: 100%;
      overflow-y: scroll;
      margin-top: ${({ yOffset }) => yOffset > topHeight && "5rem"};
    }
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

const Tab = styled.div<{ yOffset: number }>`
  ${({ theme }) => theme.flexCenter}
  position: relative;
  width: 100%;
  left: 0;
  position: ${({ yOffset }) => (yOffset > topHeight ? "fixed" : "absolute")};
  top: ${({ yOffset }) => yOffset > topHeight && "14.2rem"};
  background: ${({ theme }) => theme.color.background};
  z-index: 1;
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

const ScrollPage = styled.div`
  position: relative;
  width: 100%;
  margin: 5rem 0;
  .link {
    position: absolute;
    top: -23rem;
  }
`;

export default DetailPage;
