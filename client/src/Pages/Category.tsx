import Header from "@/Components/Header";
import { PageWrapper, Contents } from "@/shared/styled";
import React from "react";
import styled from "styled-components";
import Item from "@/Components/Item";
import Footer from "@/Components/Footer";

const sample = [
  {
    id: 1,
    discountRate: 40,
    tags: ["new", "sale"],
    title: "타이틀",
    price: 10000,
  },
  {
    id: 2,
    discountRate: 20,
    tags: ["new", "green", "sale"],
    title: "타이틀2",
    price: 260000,
  },
  {
    id: 3,
    tags: ["green"],
    title: "타이틀3",
    price: 10000,
  },
  {
    id: 4,
    discountRate: 50,
    tags: ["sale"],
    title: "타이틀4",
    price: 100000,
  },
  {
    id: 5,
    discountRate: 40,
    tags: ["new", "sale"],
    title: "타이틀",
    price: 10000,
  },
  {
    id: 6,
    discountRate: 20,
    tags: ["new", "green", "sale"],
    title: "타이틀2",
    price: 260000,
  },
  {
    id: 7,
    tags: ["green"],
    title: "타이틀3",
    price: 10000,
  },
  {
    id: 8,
    discountRate: 50,
    tags: ["sale"],
    title: "타이틀4",
    price: 100000,
  },
];

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
          {sample.map((item) => (
            <Item {...item} />
          ))}
        </div>
      </Contents>
      <Footer />
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
