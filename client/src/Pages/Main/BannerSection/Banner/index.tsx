import styled from "styled-components";
import { Link } from "@/Router";
import { ItemBannerType } from "@/shared/type";
import { gap, media } from "@/styles/theme";
import Image from "@/Components/Common/Image";

export interface BannerProps {
  banners: ItemBannerType[];
}

const Banner = ({ banner }: { banner: ItemBannerType }) => {
  return (
    <BannerWrapper>
      <Link to={`/detail/${banner.id}`}>
        <div className="banner-content">
          <div className="banner__info-wrapper">
            <div className="banner__info">
              <h3 className="banner__title">{banner.title}</h3>
              <div className="banner__brief">{banner.brief}</div>
            </div>
            <div className="banner__button">
              <span>자세히 보기</span>
            </div>
          </div>
          <div className="banner__image">
            <Image src={banner.src} />
          </div>
        </div>
      </Link>
    </BannerWrapper>
  );
};

const BannerWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 110rem;
  flex: 1 0 auto;

  .banner-content {
    width: 100%;
    position: relative;
    border-radius: 2rem;
    overflow: hidden;
    ${({ theme }) => theme.flexCenter}
    .banner__image {
      width: 100%;
      & > img {
        width: 100%;
      }
    }
  }

  a {
    ${({ theme }) => theme.flexCenter}
  }

  .banner__info-wrapper {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
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
    ${gap("3rem")}
    color: white;
  }

  .banner__title {
    ${({ theme }) => theme.font.xlarge}
    margin-bottom: 1rem;
    text-align: right;
    ${media[768]} {
      ${({ theme }) => theme.font.medium}
    }
  }

  .banner__brief {
    width: 100%;
    ${({ theme }) => theme.font.medium}
    text-align: right;
  }

  img {
    width: 100%;
    transition: transform 0.2s;
  }

  .banner__button {
    padding: 1rem;
    border: 1px solid white;
    border-radius: 0.5rem;
    transition: background-color 0.5s;
    background: none;
    ${({ theme }) => theme.font.medium}
  }

  &:hover {
    img {
      transform: scale(1.02);
    }

    .banner__button {
      font-weight: bolder;
      border: 1px solid ${({ theme }) => theme.color.primary1};
      background: ${({ theme }) => theme.color.primary1};
    }
  }

  ${media[768]} {
    padding: 0;

    .banner__info-wrapper {
      padding: 2rem;
    }
    .banner__title {
      ${({ theme }) => theme.font.large}
    }

    .banner__brief {
      ${({ theme }) => theme.font.small}
    }

    .banner__button {
      display: none;
    }
  }
`;

export default Banner;
