import Header from "@/Components/Header";
import { ETLink } from "@/Router";
import { PageWrapper } from "@/shared/styled";
import { flexCenter, textMedium } from "@/styles/global-style";
import React from "react";
import styled from "styled-components";

const CategoryPage = () => {
  return (
    <Wrapper>
      <Header />
      <div className="contents">
        <Filter>
          <div className="total">총 233개</div>
          <div className="buttons">
            <div className="buttons__btn">추천순</div>
            <div className="buttons__btn">인기순</div>
            <div className="buttons__btn">최신순</div>
            <div className="buttons__btn">낮은가격순</div>
            <div className="buttons__btn">높은가격순</div>
          </div>
        </Filter>
        <div className="items">
          {new Array(30).fill(1).map((i, idx) => (
            <ETLink to={`/detail/${idx}`}>
              <div className="items__item">{i}</div>
            </ETLink>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled(PageWrapper)`
  .contents {
    padding: 0 20rem;
    .items {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      &__item {
        width: 27rem;
        height: 30rem;
        background-color: lightgray;
        margin: 0.5rem;
      }
    }
  }
`;

const Filter = styled.div`
  ${flexCenter}
  ${textMedium}
  justify-content: space-between;
  padding: 3rem 0;
  .total {
  }
  .buttons {
    ${flexCenter}
    &__btn {
      cursor: pointer;
      padding: 0 2rem;
    }
  }
`;

export default CategoryPage;
