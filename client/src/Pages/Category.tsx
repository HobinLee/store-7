import Header from "@/Components/Header";
import { ETLink } from "@/Router";
import { PageWrapper, Contents } from "@/shared/styled";
import React from "react";
import styled from "styled-components";

const CategoryPage = () => {
  return (
    <Wrapper>
      <Header />
      <Contents>
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
              <img
                src={
                  "https://store.baemin.com/data/goods/19/11/48/237/237_detail_058.png"
                }
                className="items__item"
              />
            </ETLink>
          ))}
        </div>
      </Contents>
    </Wrapper>
  );
};

const Wrapper = styled(PageWrapper)`
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
`;

const Filter = styled.div`
  ${({ theme }) => theme.flexCenter}
  ${({ theme }) => theme.font.medium}
  justify-content: space-between;
  padding: 3rem 0;
  .total {
  }
  .buttons {
    ${({ theme }) => theme.flexCenter}
    &__btn {
      cursor: pointer;
      padding: 0 2rem;
    }
  }
`;

export default CategoryPage;
