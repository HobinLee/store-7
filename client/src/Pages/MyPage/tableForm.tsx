import React from "react";
import styled from "styled-components";

const ProductOption = ({ url, title }) => {
  return (
    <ProductOptionWrapper>
      <div className="thumbnail">
        <img src={url} />
      </div>
      <h4 className="title">{title}</h4>
    </ProductOptionWrapper>
  );
};

const ProductOptionWrapper = styled.div`
  display: flex;
  align-items: center;
  .thumbnail {
    width: 4rem;
    height: 5rem;
    img {
      display: block;
      width: 100%;
    }
    margin-right: 1rem;
  }

  .title {
    ${({ theme }) => theme.font.small}
    font-weight: bold;
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

const tableForm = {
  ProductOption,
  PriceAndAmount,
  Sum,
};

export default tableForm;
