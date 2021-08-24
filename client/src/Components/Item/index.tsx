import { useState } from "react";
import { Link } from "@/Router";
import styled, { css } from "styled-components";
import ToggleImageWrapper from "../ToggleImageWrapper";
import { WishIcon } from "@/assets";
import { getCurrentPrice, convertToKRW } from "@/utils/util";
import { postWishProduct, deleteWishProduct } from "@/api/my";
import { media } from "@/styles/theme";
import { ProductElementType } from "@/shared/type";
import properties from "@/config/properties";

const Item = ({
  id,
  originPrice,
  price,
  discountRate,
  tags = [],
  name,
  amount,
  image,
  isWish,
}: ProductElementType) => {
  const [isWishState, setIsWish] = useState(isWish);

  const handleClickWish = (apiCallback) => async (e: Event) => {
    e.stopPropagation();
    await apiCallback({ productId: id });
    setIsWish(!isWishState);
  };

  return (
    <li data-testid="test__itme">
      <Link to={`/detail/${id}`}>
        <ItemWrapper>
          <div className="thumbnail">
            <ToggleImageWrapper src={properties.imgURL + image} />
            <div className="thumbnail__tags">
              {tags.map((tag, idx) => (
                <Tag tag={tag} key={idx}>
                  {tag.toUpperCase()}
                </Tag>
              ))}
            </div>
            <WishBox isWishState={isWishState}>
              {isWishState ? (
                <WishIcon
                  width="36"
                  height="36"
                  opacity="1"
                  fill="#13d8d1"
                  onClick={handleClickWish(deleteWishProduct)}
                />
              ) : (
                <WishIcon
                  width="36"
                  height="36"
                  fill="white"
                  onClick={handleClickWish(postWishProduct)}
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
    ${({ theme }) => theme.shadow}
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
  ${media.mobile} {
    .thumbnail {
      max-width: 46vw;
      max-height: 46vw;
      overflow: hidden;
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
