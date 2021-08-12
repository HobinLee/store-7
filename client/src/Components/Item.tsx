import React, { useState } from "react";
import { ETLink } from "@/Router";
import styled, { css } from "styled-components";
import MagnifiedImage from "./MagnifiedImage";
import { Wish, BookMark } from "@/assets/";

type ItemType = {
  id: number;
  discountRate?: number;
  tags?: string[];
  title: string;
  price: number;
  isWish: boolean;
};

const Item = ({
  id,
  discountRate = 0,
  tags = [],
  title,
  price,
  isWish,
}: ItemType) => {
  const ToggleWish = (id: number, boolean: boolean) => {
    //TODO: 서버 좋아요 변경
    console.log(`${id} 아이템 wish를 ${boolean}으로`);
    setIsWish(boolean);
  };
  const [isWishState, setIsWish] = useState(isWish);

  return (
    <ETLink to={`/detail/${id}`}>
      <ItemWrapper>
        <div className="thumbnail">
          <MagnifiedImage src="https://user-images.githubusercontent.com/41738385/128832252-b19d32b1-0a89-4eb6-b5d9-c399de5f44cc.jpeg" />
          <div className="thumbnail__tags">
            {tags.map((tag) => (
              <Tag tag={tag}>{tag}</Tag>
            ))}
          </div>
          <div className="thumbnail__wish">
            {isWishState ? (
              <Wish
                opacity="1"
                fill="#2ac1bc"
                onClick={(e) => {
                  e.stopPropagation();
                  ToggleWish(id, false);
                }}
              />
            ) : (
              <Wish
                fill="white"
                onClick={(e) => {
                  e.stopPropagation();
                  ToggleWish(id, true);
                }}
              />
            )}
          </div>
        </div>
        <div className="info">
          <div className="info__title">{title}</div>
          {discountRate !== 0 && (
            <div className="info__sale">
              <div className="discount-rate">{discountRate}%</div>
              <div className="before-price">{appendWon(price)}</div>
            </div>
          )}
          <div className="info__price">
            {getCurrentPrice(price, discountRate)}
          </div>
        </div>
      </ItemWrapper>
    </ETLink>
  );
};

const ItemWrapper = styled.div`
  .thumbnail {
    position: relative;
    &__tags {
      position: absolute;
      top: 1rem;
      left: 1rem;
      display: flex;
    }
    &__wish {
      position: absolute;
      bottom: 1rem;
      right: 1rem;

      & > svg:hover {
        fill: #2ac1bc;
        opacity: 1;
      }
      & > svg:active {
        transform: scale(1.1);
      }
    }
  }

  .info {
    margin-top: 1.5rem;
    padding: 0 1rem;
    &__title {
      ${({ theme }) => theme.font.large};
      font-weight: 500;
      margin-bottom: 1rem;
      line-height: 1.4em;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      word-wrap: break-word;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    &__price {
      ${({ theme }) => theme.font.large};
      font-weight: 900;
    }

    &__sale {
      display: flex;
      align-items: center;
      margin-bottom: 0.3rem;
      .discount-rate {
        color: ${({ theme }) => theme.color.red};
        ${({ theme }) => theme.font.medium};
        font-weight: 700;
      }
      .before-price {
        ${({ theme }) => theme.font.small};
        margin-left: 0.5rem;
        text-decoration: line-through;
      }
    }
  }
`;

const Tag = styled.div<{
  tag: string;
}>`
  ${({ theme, tag }) => css`
    ${theme.font.large}
    ${theme.tags[tag]}
    ${theme.borderRadius.small}
  `};

  font-weight: bold;
  padding: 0.3rem 1rem;

  & + & {
    margin-left: 1rem;
  }
`;
const getCurrentPrice = (price: number, discountRate: number) => {
  const saledPrice = calSaledPrice(price, discountRate);
  return appendWon(saledPrice);
};

const calSaledPrice = (price: number, discountRate: number) => {
  return (price * (100 - discountRate)) / 100;
};

const appendWon = (price) => {
  return price.toLocaleString() + "원";
};

export default Item;
