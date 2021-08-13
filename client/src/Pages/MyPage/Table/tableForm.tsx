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
    ${({ theme }) => theme.font.medium}
    font-weight: bold;
    line-height: 2.5rem;
    text-align: left;
  }
`;

const PriceAndAmount = () => {
  return <PriceAndAmountWrapper></PriceAndAmountWrapper>;
};

const PriceAndAmountWrapper = styled.div``;

const Sum = () => {
  return <SumWrapper></SumWrapper>;
};

const SumWrapper = styled.div``;

const Order = ({
  orderDate,
  orderNumber,
}: {
  orderDate: number | string;
  orderNumber: number | string;
}) => {
  return (
    <OrderWrapper>
      <div className="order__date">{orderDate}</div>
      <div className="order__number">{orderNumber}</div>
    </OrderWrapper>
  );
};

const OrderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ theme }) => theme.font.small}

  .order__date {
    margin-bottom: 1rem;
  }
`;

const TableFrom = {
  ProductOption,
  PriceAndAmount,
  Sum,
  Order,
};

export default TableFrom;
