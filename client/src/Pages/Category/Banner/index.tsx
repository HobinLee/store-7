import { media } from "@/styles/theme";
import styled from "styled-components";
const info = {
  category: "책",
  subCategory: "매거진",
  brief: "집에 쌓아두면 교양이 쌓이는",
  backgroundImg: "https://images2.alphacoders.com/261/thumb-1920-26102.jpg",
};
const CategoryBanner = () => (
  <Wrapper url={info.backgroundImg}>
    <div className="category-info">
      <h2>{info.category}</h2>
      <div className="category-info-side">
        <h3>{info.subCategory}</h3>
        <span>{info.brief}</span>
      </div>
    </div>
  </Wrapper>
);

const Wrapper = styled.div<{
  url: string;
}>`
  background-image: url(${({ url }) => url});
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  width: 100vw;
  height: 30rem;
  overflow: hidden;
  font-size: x-large;
  color: white;
  .category-info {
    box-sizing: border-box;
    max-width: 120rem;
    padding: 2rem 5rem;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    h2 {
      font-weight: bolder;
      font-size: 10rem;
    }
    .category-info-side {
      display: flex;
      height: 10rem;
      margin-left: 1rem;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
    }

    h3 {
      ${({ theme }) => theme.font.xlarge};
    }

    span {
      ${({ theme }) => theme.font.medium};
    }
  }
  ${media.custom(920)} {
    height: 24rem;

    .category-info {
      h2 {
        font-size: 9rem;
      }
      .category-info-side {
        height: 9rem;
      }
      h3 {
        ${({ theme }) => theme.font.large};
        font-weight: bolder;
      }

      span {
        ${({ theme }) => theme.font.medium};
      }
    }
  }
  ${media.mobile} {
    height: 17rem;

    .category-info {
      h2 {
        font-size: 8rem;
      }
      .category-info-side {
        height: 8rem;
      }
      h3 {
        ${({ theme }) => theme.font.large};
        font-weight: bolder;
      }

      span {
        ${({ theme }) => theme.font.medium};
      }
    }
  }
`;

export default CategoryBanner;
