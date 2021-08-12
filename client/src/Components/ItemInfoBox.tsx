import React from "react";
import styled from "styled-components";

const ItemInfoBox = ({ name, num, price, delivery }) => {
  return (
    <Wrapper>
      <div className="info">
        <input type="checkbox" />
        <img src="" />
        <div>
          <div className="info__name">{name}</div>
          <div className="info__num">{num}개</div>
        </div>
      </div>

      <div className="price">
        <div>총 {price}원</div>
        <div>배송비 {delivery}원</div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.font.medium};
  width: 100%;
  background-color: ${({ theme }) => theme.color.background};
  width: 100%;
  border-radius: 1rem;
  padding: 2rem;
  box-sizing: border-box;
  .info {
    display: flex;
    gap: 2rem;
    &__name {
      ${({ theme }) => theme.font.large};
    }
    &__num {
      margin-top: 2rem;
    }
  }
  img {
    width: 7rem;
    height: 7rem;
    background-color: ${({ theme }) => theme.color.grey1};
  }
  .price {
    ${({ theme }) => theme.flexCenter};
    font-weight: 700;
    justify-content: flex-end;
    gap: 2rem;
  }
`;

export default ItemInfoBox;
