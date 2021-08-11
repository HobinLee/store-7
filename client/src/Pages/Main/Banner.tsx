import React from "react";
import styled from "styled-components";
import { ETLink } from "@/Router";

export type ItemType = {
  brief?: string,
  title: string,
  src: any,
  id: number,
};

type BannerPropsType = {
  items: ItemType[],
}

const Banner = ({ items }: BannerPropsType) => {
  return <BannerWrapper>
    <div className="banner-content">
      <ETLink to={`/store/`}>
        <div className="banner__info-wrapper">
          <div className="banner__info">
            <h3  className="banner__title">{items[0].title}</h3>
            <div className="banner__brief">{items[0].brief}</div>
          </div>
          <div className="banner__button">
            <span>자세히 보기</span>
          </div>
        </div>
        <img src={items[0].src} />
      </ETLink>
    </div>
  </BannerWrapper>
}

const BannerWrapper = styled.div`
  margin: 0 auto;
  max-width: 110rem;
  height: 40rem;
  padding: 0 5rem;

  .banner-content{
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 2rem;
    overflow: hidden;
    ${({theme}) => theme.flexCenter}
  }
  
  a {
    width: 100%;
    height: 100%;
    ${({theme}) => theme.flexCenter}
  }

  .banner__info-wrapper {
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.3));
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 3rem;
    left: 0;
    top: 0;
    z-index: 3;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-end;
    gap: 2rem;
    color: white;
  }

  .banner__title {
    ${({theme}) => theme.font.xlarge}
    margin-bottom: 1rem;
    text-align: right;
  }

  .banner__brief {
    width: 100%;
    ${({theme}) => theme.font.medium}
    text-align: right;
  }

  img {
    height: 100%;
    width: auto;
    transition: transform 0.2s;
  }

  .banner__button {
    padding: 1rem;
    border: 1px solid white;
    border-radius: 0.5rem;
    transition: background-color 0.5s;
    background: none;
    ${({theme}) => theme.font.medium}
  }

  &:hover{
    img {
      transform: scale(1.02);
    }

    .banner__button {
      font-weight: bolder;
      border: 1px solid ${({ theme }) => theme.color.primary1};
      background: ${({ theme }) => theme.color.primary1};
    }
  }
  
`

export default Banner;