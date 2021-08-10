import Button from "@/Components/Button";
import Header from "@/Components/Header";
import { PageWrapper } from "@/shared/styled";
import { flexCenter, textMedium, textXLarge } from "@/styles/global-style";
import React from "react";
import styled from "styled-components";

const DetailPage = () => {
  return (
    <Wrapper>
      <Header />
      <div className="contents">
        <InfoBox>
          <div className="thumbnail" />
          <Info>
            <div>
              <div className="title">으아아아악</div>
              <div className="list">
                <div className="list__item">
                  <div className="list__item--title">판매가격</div>
                  <div className="list__item--content">10,000원</div>
                </div>
                <div className="list__item">
                  <div className="list__item--title">배송정보</div>
                  <div className="list__item--content">2,500원</div>
                </div>
              </div>
            </div>

            <div className="buttons">
              <Button>찜</Button>
              <Button>장바구니</Button>
              <Button primary>바로 구매</Button>
            </div>
          </Info>
        </InfoBox>

        <div className="tabs">
          <Tab>
            <div>상품상세정보</div>
            <div>배송안내</div>
            <div>교환 및 반품안내</div>
            <div>상품후기</div>
            <div>상품문의</div>
          </Tab>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled(PageWrapper)`
  .contents {
    ${flexCenter}
    flex-direction: column;
    width: 100%;
  }
  .tabs {
    margin-top: 10rem;
  }
`;

const InfoBox = styled.div`
  ${flexCenter}
  margin-top: 5rem;
  width: 100%;
  height: 50rem;
  box-sizing: border-box;
  gap: 3rem;
  .thumbnail {
    width: 50rem;
    height: 100%;
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
  .title {
    ${textXLarge}
  }
  .list {
    margin-top: 5rem;
    &__item {
      ${flexCenter}
      justify-content: flex-start;
      margin-top: 2rem;
      ${textMedium}
      &--title {
      }
      &--content {
        margin-left: 1rem;
      }
    }
  }
  .buttons {
    ${flexCenter}
    width: 100%;
    justify-content: flex-end;
    gap: 1rem;
  }
`;

const Tab = styled.div`
  ${flexCenter}
  div {
    cursor: pointer;
    padding: 2rem;
    ${textMedium}
  }
`;

export default DetailPage;
