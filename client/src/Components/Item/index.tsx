import { useState } from "react";
import { Link } from "@/Router";
import styled, { css } from "styled-components";
import ToggleImageWrapper from "../ToggleImageWrapper";
import { Loading, Wish } from "@/assets";
import { getCurrentPrice, convertToKRW } from "@/utils/util";

type ItemType = {
  id: number;
  discountRate?: number;
  tags?: string[];
  name: string;
  price: number;
  isWish: boolean;
};

const Item = ({
  id,
  discountRate = 0,
  tags = [],
  name,
  price,
  isWish,
}: ItemType) => {
  const toggleWish = (e: Event) => {
    e.stopPropagation();
    //TODO: 서버 좋아요 변경
    // console.log(`${id} 아이템 wish를 ${boolean}으로`);
    setIsWish(!isWishState);
  };
  const [isWishState, setIsWish] = useState(isWish);

  return (
    <li data-testid="test__itme">
      <Link to={`/detail/${id}`}>
        <ItemWrapper>
          <div className="thumbnail">
            <ToggleImageWrapper src="https://user-images.githubusercontent.com/41738385/128832252-b19d32b1-0a89-4eb6-b5d9-c399de5f44cc.jpeg" />
            <div className="thumbnail__tags">
              {tags.map((tag, idx) => (
                <Tag tag={tag} key={idx}>
                  {tag.toUpperCase()}
                </Tag>
              ))}
            </div>
            <WishBox isWishState={isWishState}>
              {isWishState ? (
                <Wish
                  width="36"
                  height="36"
                  opacity="1"
                  fill="#13d8d1"
                  onClick={toggleWish}
                />
              ) : (
                <Wish
                  width="36"
                  height="36"
                  fill="white"
                  onClick={toggleWish}
                />
              )}
            </WishBox>
          </div>
          <div className="info">
            <div className="info__name">{name}</div>
            {discountRate !== 0 && (
              <div className="info__sale">
                <div className="discount-rate">{discountRate}%</div>
                <div className="before-price">{convertToKRW(price)}</div>
              </div>
            )}
            <div className="info__price">
              {getCurrentPrice(price, discountRate)}
            </div>
          </div>
        </ItemWrapper>
      </Link>
    </li>
  );
};

const ItemWrapper = styled.div`
  padding-bottom: 2rem;
  ${({ theme }) => theme.borderRadius.medium}
  &:hover {
    box-shadow: 0 0 10px 2px #d4d4d4;
    transition: all 0.2s;
  }

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
        opacity: 1;
        stroke: #2ac1bc;
        stroke-width: 3rem;
      }
      & > svg:active {
        transform: scale(1.2);
      }
    }
  }

  .info {
    margin-top: 1.5rem;
    padding: 0 1rem;
    &__name {
      ${({ theme }) => theme.font.medium};
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
const WishBox = styled.div<{ isWishState: boolean }>`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  & > svg:hover {
    opacity: 1;
    ${({ isWishState }) =>
      isWishState
        ? css`
            fill: #2ac1bc;
          `
        : css`
            fill: none;
            stroke: #2ac1bc;
            stroke-width: 3rem;
          `}
  }
  & > svg:active {
    transform: scale(1.1);
  }
`;

const Tag = styled.div<{
  tag: string;
}>`
  ${({ theme, tag }) => css`
    ${theme.font.medium}
    ${theme.tags[tag]}
    ${theme.borderRadius.small}
  `};

  font-weight: bold;
  padding: 0.7rem 1rem 0.2rem 1rem;
  box-shadow: 2px 2px 5px #7d8181;
  & + & {
    margin-left: 1rem;
  }
`;

export default Item;
