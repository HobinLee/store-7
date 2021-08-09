import Header from "@/Components/Header";
import { PageWrapper } from "@/shared/styled";
import { flexCenter } from "@/styles/global-style";
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
              <div>찜</div>
              <div>장바구니</div>
              <div>바로 구매</div>
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
    font-size: 3rem;
  }
  .list {
    margin-top: 5rem;
    &__item {
      ${flexCenter}
      justify-content: flex-start;
      margin-top: 2rem;
      font-size: 1.5rem;
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
    div {
      cursor: pointer;
      font-size: 2rem;
      padding: 1.5rem 3rem;
      border: 0.1rem solid black;
    }
  }
`;

const Tab = styled.div`
  ${flexCenter}
  div {
    cursor: pointer;
    padding: 2rem;
    font-size: 1.4rem;
  }
`;

export default DetailPage;
