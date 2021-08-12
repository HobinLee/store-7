import { ItemBannerType } from "@/shared/type";
import React from "react";
import { ETLink } from "@/Router";
import styled from "styled-components";

const GiftItem = ({ item }: { item: ItemBannerType }) => (
  <ItemWrapper isWhite={item.isWhite}>
    <ETLink to={`/detail/${item.id}`}>
      <img src={item.src} />
      <div className="item__info">
        <h5 className="item__title">{item.title}</h5>
        <span className="item__brief">{item.brief}</span>
      </div>
    </ETLink>
  </ItemWrapper>
);

const ItemWrapper = styled.div<{ isWhite: boolean }>`
  display: block;
  overflow: hidden;
  position: relative;
  ${({ theme }) => theme.borderRadius.medium}

  a {
    color: ${({ isWhite, theme }) => {
      return isWhite ? theme.color.off_white : theme.color.title_active;
    }};
  }

  .item__info {
    box-sizing: border-box;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 2rem;
    background: ${({ isWhite }) =>
      isWhite
        ? `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))`
        : `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5))`};
  }
  .item__title {
    ${({ theme }) => theme.font.large}
  }
  .item__brief {
    ${({ theme }) => theme.font.small}
  }

  img {
    display: block;
    width: 100%;
    transition: transform 0.3s;
  }

  &:hover {
    img {
      transform: scale(1.03);
    }
  }
`;

export default GiftItem;
