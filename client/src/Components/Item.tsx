import { ETLink } from "@/Router";
import React from "react";
import styled, { css } from "styled-components";

type ItemType = {
  id: number;
  discountRate?: number;
  tags?: string[];
  title: string;
  price: number;
};
const Item = ({ id, discountRate = 0, tags = [], title, price }: ItemType) => {
  return (
    <ETLink to={`/${id}`}>
      <ItemWrapper>
        <div className="image-box">
          <img src="https://user-images.githubusercontent.com/41738385/128832252-b19d32b1-0a89-4eb6-b5d9-c399de5f44cc.jpeg" />
        </div>
        <div className="text">
          {discountRate !== 0 && <div className="sale">{discountRate}%</div>}
          <div className="title">{title}</div>
          <div className="price">
            {discountRate !== 0 && <div className="before">{price}</div>}
            <div className="current">{calPrice(price, discountRate)}</div>
          </div>
        </div>
        <div className="tags">{tags.map((tag) => TAGS[tag])}</div>
      </ItemWrapper>
    </ETLink>
  );
};

const calPrice = (price: number, discountRate: number) => {
  return (price * (100 - discountRate)) / 100;
};

const ItemWrapper = styled.div`
  width: 100%;
  position: relative;
  .image-box {
    overflow: hidden;
    & > img {
      display: block;
      width: 100%;
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.03);
      }
    }
  }

  .tags {
    position: absolute;
    top: 0;
    display: flex;
  }

  .text {
    & > .sale {
      color: ${({ theme }) => theme.color.red};
      ${({ theme }) => theme.font.large};
      margin: 1.2rem 0;
    }

    & > .title {
      ${({ theme }) => theme.font.medium};
      margin: 1rem 0;
    }
  }

  .price {
    & > .before {
      ${({ theme }) => theme.font.small};
      margin: 0.2rem 0;
      text-decoration: line-through;
    }
    & > .current {
      ${({ theme }) => theme.font.medium};
    }
  }
`;

const Tag = styled.div<{
  background: string;
}>`
  ${({ theme }) => css`
    ${theme.font.medium}
  `};
  background: ${({ background, theme }) => theme.color[background]};
  padding: 0.4rem;
  border-radius: 0.3rem;

  & + & {
    margin-left: 1rem;
  }

  color: white;
`;

const TAGS = {
  new: <Tag background="primary1">NEW</Tag>,
  sale: <Tag background="primary2">SALE</Tag>,
  green: <Tag background="primary3">GREEN</Tag>,
};

export default Item;
