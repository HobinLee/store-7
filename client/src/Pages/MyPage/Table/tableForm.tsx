import React from "react";
import styled from "styled-components";

const ProductOption = ({ url, title }) => {
  return (
    <ProductOptionWrapper>
      <div className="thumbnail">
        <img src={url} />
      </div>
      <h4 className="product__title">{title}</h4>
    </ProductOptionWrapper>
  );
};

const ProductOptionWrapper = styled.div`
  display: flex;
  align-items: center;

  .thumbnail {
    width: 6rem;
    height: 7.5rem;
    img {
      display: block;
      width: 100%;
    }
    margin-right: 2rem;
  }

  .product__title {
    flex: 1;
    ${({ theme }) => theme.font.large}
    font-weight: bold;
    line-height: 2.5rem;
  }
`;

const PriceAndAmount = () => {
  return <PriceAndAmountWrapper></PriceAndAmountWrapper>;
};

const PriceAndAmountWrapper = styled.div``;

const Sum = () => {
  <SumWrapper></SumWrapper>;
};

const SumWrapper = styled.div``;

const TableFrom = {
  ProductOption,
  PriceAndAmount,
  Sum,
};

export default TableFrom;
