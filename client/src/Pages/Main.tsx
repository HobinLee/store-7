import Header from '@/Components/Header';
import { flexCenter } from '@/styles/global-style';
import React from 'react';
import styled from 'styled-components';

const MainPage = () => {
  return (
    <Wrapper>
      <Header />
      <div className="banner" />
      <div className="contents">
        <div className="contents__content">
          <div className="contents__content--title">잘나가요</div>
          <div className="contents__content--items">
            {[0, 0, 0, 0].map((i) => (
              <div className="contents__content--items__item">{i}</div>
            ))}
          </div>
        </div>
        <div className="contents__content">
          <div className="contents__content--title">잘나가요</div>
          <div className="contents__content--items">
            {[0, 0, 0, 0].map((i) => (
              <div className="contents__content--items__item">{i}</div>
            ))}
          </div>
        </div>
        <div className="contents__content">
          <div className="contents__content--title">잘나가요</div>
          <div className="contents__content--items">
            {[0, 0, 0, 0].map((i) => (
              <div className="contents__content--items__item">{i}</div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin-top: 15rem;
  .banner {
    margin-top: 0.5rem;
    width: 100%;
    height: 35rem;
    background-color: ${({ theme }) => theme.color.blue};
  }
  .contents {
    ${flexCenter}
    flex-direction: column;
    width: 100%;
    &__content {
      ${flexCenter}
      flex-direction: column;
      width: 100%;
      padding: 5rem 10rem;
      box-sizing: border-box;
      &--title {
        width: 100%;
        font-size: 2rem;
      }
      &--items {
        ${flexCenter}
        margin-top: 2rem;
        justify-content: space-between;
        width: 100%;
        grid-template-columns: repeat(4, 1fr);
        &__item {
          width: 25rem;
          height: 30rem;
          background-color: lightgray;
        }
      }
    }
  }
`;

const Footer = styled.div`
  width: 100%;
  height: 30rem;
  background-color: lightgray;
`;

export default MainPage;
