import { useState } from "react";
import { Link } from "@/Router";
import styled, { css } from "styled-components";
import MagnifiedImage from "./MagnifiedImage";
import { Wish } from "@/assets";
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
    <li>
      <Link to={`/detail/${id}`}>
        <ItemWrapper>
          <div className="thumbnail">
            <MagnifiedImage src="https://user-images.githubusercontent.com/41738385/128832252-b19d32b1-0a89-4eb6-b5d9-c399de5f44cc.jpeg" />
            <div className="thumbnail__tags">
              {tags.map((tag, idx) => (
                <Tag tag={tag} key={idx}>
                  {tag.toUpperCase()}
                </Tag>
              ))}
            </div>
            <div className="thumbnail__wish">
              {isWishState ? (
                <Wish opacity="1" fill="#2ac1bc" onClick={toggleWish} />
              ) : (
                <Wish fill="white" onClick={toggleWish} />
              )}
            </div>
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
    }
    .active {
    }
    .inactive {
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

const Tag = styled.div<{
  tag: string;
}>`
  ${({ theme, tag }) => css`
    ${theme.font.medium}
    ${theme.tags[tag]}
    ${theme.borderRadius.small}
  `};

  font-weight: bold;
  padding: 0.3rem 1rem;
  & + & {
    margin-left: 1rem;
  }
`;

export default Item;
