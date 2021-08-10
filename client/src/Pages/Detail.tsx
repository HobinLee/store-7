import Button from "@/Components/Button";
import Header from "@/Components/Header";
import Input from "@/Components/Input";
import useInput from "@/hooks/useInput";
import { PageWrapper, Contents } from "@/shared/styled";
import {
  flexCenter,
  textMedium,
  textXLarge,
  textLarge,
} from "@/styles/global-style";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const OptionBox = ({ numValue, handleClickNumVal }) => (
  <div>
    <div className="select-option">
      <div>으아아아악</div>
      <div className="select-option__right">
        <div className="num-input">
          <NumInput value={numValue.value} onChange={numValue.onChange} />
          <div>
            <button type="button" onClick={() => handleClickNumVal(1)}>
              .
            </button>
            <button type="button" onClick={() => handleClickNumVal(-1)}>
              .
            </button>
          </div>
        </div>
        10,000원
      </div>
    </div>

    <div className="total-price">
      <div>총 합계금액</div>10,000원
    </div>

    <div className="buttons">
      <Button>찜</Button>
      <Button>장바구니</Button>
      <Button primary>바로 구매</Button>
    </div>
  </div>
);

const tabs = [
  { id: "first", title: "상품상세정보" },
  { id: "secone", title: "배송안내" },
  { id: "third", title: "교환 및 반품안내" },
  { id: "fourth", title: "상품후기" },
  { id: "fifth", title: "상품문의" },
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
              <TabA
                onClick={() => handleSelectTab(tab.id)}
                id={tab.id}
                href={`#${tab.id}`}
                isSelected={selectedTab === tab.id}
              >
                {tab.title}
              </TabA>
            ))}
          </Tab>

          <div className="bottom-wrapper">
            <div className="scroll">
              {tabs.map((tab) => (
                <div id={tab.id}>{tab.title}</div>
              ))}
            </div>
          </div>

          {yOffset > 645 && (
            <div className="option-box">
              <OptionBox {...{ numValue, handleClickNumVal }} />
            </div>
          )}
        </Scroll>
      </Contents>
    </Wrapper>
  );
};

const Wrapper = styled(PageWrapper)`
  .contents {
    ${flexCenter}
    flex-direction: column;
    width: 100%;
  }
  .buttons {
    ${flexCenter}
    width: 100%;
    justify-content: flex-end;
    gap: 1rem;
  }
  .select-option {
    ${flexCenter}
    ${textMedium}
    justify-content: space-around;
    margin-top: 5rem;
    background: ${({ theme }) => theme.color.background};
    width: 100%;
    padding: 1.5rem 0;
    &__right {
      ${flexCenter}
      gap: 2rem;
      .num-input {
        ${flexCenter}
        div {
          ${flexCenter}
          flex-direction: column;
          button {
            cursor: pointer;
            border: none;
            background: ${({ theme }) => theme.color.primary2};
          }
        }
      }
    }
  }
  .total-price {
    ${flexCenter}
    ${textXLarge}
    justify-content: space-between;
    padding: 2.25rem 0;
    border-top: 0.1rem solid ${({ theme }) => theme.color.line};
    width: 100%;
    margin-top: 10rem;
    color: ${({ theme }) => theme.color.primary1};
    & > * {
      ${textMedium}
      color: ${({ theme }) => theme.color.title_active};
    }
  }
`;

const InfoBox = styled.div`
  ${flexCenter}
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
  ${flexCenter}
  flex-direction: column;
  width: 50rem;
  height: 100%;
  align-items: flex-start;
  justify-content: space-between;
  & > * {
    width: 100%;
  }
  .title {
    ${textXLarge}
  }
  .list {
    &__item {
      ${flexCenter}
      justify-content: flex-start;
      margin-top: 2rem;
      ${textMedium}
      &--title {
      }
      &--content {
        margin-left: 3rem;
        &.price {
          ${textLarge}
        }
      }
    }
  }
`;

const NumInput = styled(Input)`
  width: 3rem;
  text-align: center;
  padding: 1rem;
`;

const Scroll = styled.div<{ yOffset: number }>`
  width: 100%;
  margin-top: 10rem;
  .bottom-wrapper {
    ${flexCenter}
    .scroll {
      margin-top: 7rem;
      width: 100%;
      overflow-y: scroll;
      margin-top: ${({ yOffset }) => yOffset > 645 && "5rem"};
      div {
        width: 100%;
        height: 100rem;
        background: lightgray;
      }
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
  ${flexCenter}
  position: relative;
  width: 100%;
  left: 0;
  position: ${({ yOffset }) => (yOffset > 645 ? "fixed" : "absolute")};
  top: ${({ yOffset }) => yOffset > 645 && "14.2rem"};
  background: ${({ theme }) => theme.color.background};
  z-index: 0;
`;

const TabA = styled.a<{ isSelected: boolean }>`
  cursor: pointer;
  padding: 2rem 4rem;
  ${textMedium}
  border-bottom: 0.3rem solid ${({ isSelected, theme }) =>
    isSelected ? theme.color.primary1 : "transparent"};
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.color.primary1 : theme.color.title_active};
`;

export default DetailPage;
