import { categories } from "@/shared/dummy";
import { media } from "@/styles/theme";
import { useState } from "react";
import { useEffect } from "react";
import styled, { css } from "styled-components";
import { CategoryType, MainCategoryType } from "../";
import { useRecoilValue } from "recoil";
import { selectedCategoryState } from "@/store/category";
import { moveTo } from "@/Router";

interface CategoryInfo extends MainCategoryType {
  subCategoryName?: string;
}

const DEFAULT_CATEGORY_PATH = "/category?category=0";

export const currentCategoryInfo = ({
  categoryId,
  subCategoryId,
}): CategoryInfo => {
  const category: MainCategoryType = categories.find(
    (category: MainCategoryType) => category.id === categoryId
  );

  const subCategoryName = category?.subCategories.find(
    (subCategory: CategoryType) => subCategory.id === subCategoryId
  )?.name;

  return {
    ...category,
    subCategoryName,
  };
};

const CategoryBanner = () => {
  const category = useRecoilValue(selectedCategoryState);
  const [info, setInfo] = useState(currentCategoryInfo(category));
  useEffect(() => {
    const currentCategory = currentCategoryInfo(category);
    if (currentCategory.name) {
      setInfo(currentCategory);
    } else {
      moveTo(DEFAULT_CATEGORY_PATH);
    }
  }, [category]);

  return (
    <>
      <BGWrapper>
        <img src={info.backgroundImg} alt="배경 이미지" />
      </BGWrapper>
      <Wrapper
        fontColor={info.fontColor}
        font={info.font}
        img={info.backgroundImg}
      >
        <div className="category-info">
          <h2 className="category-name">{info.name}</h2>
          <div className="category-info-side">
            <h3>{info.subCategoryName ?? ""}</h3>
            <span>{info.brief}</span>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

const BGWrapper = styled.div`
  width: 100vw;
  height: 30rem;
  top: 0;
  left: 0;
  margin-top: 13rem;
  position: fixed;
  overflow: hidden;
  ${({ theme }) => theme.flexCenter}
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  ${media.custom(920)} {
    height: 24rem;
  }
  ${media.mobile} {
    height: 17rem;
  }
`;

const Wrapper = styled.div<{ fontColor?: string; font?: string; img?: string }>`
  width: 100vw;
  height: 30rem;
  overflow: hidden;
  font-size: x-large;
  color: ${({ fontColor }) => fontColor ?? "white"};
  ${({ font }) =>
    css`
      font-family: ${font ? font : "BMDOHYEON"};
    `}
  position: relative;
  .category-info {
    box-sizing: border-box;
    max-width: 120rem;
    padding: 2rem 5rem;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    .category-name {
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
      padding: 2rem 4rem;
      .category-name {
        font-size: 9rem;
      }
      .category-info-side {
        height: 8rem;
      }
      h3 {
        ${({ theme }) => theme.font.large};
      }

      span {
        ${({ theme }) => theme.font.medium};
      }
    }
  }
  ${media.mobile} {
    height: 17rem;
    ${({ img }) =>
      img &&
      css`
        background-image: url(${img});
      `};
    background-position-x: 60%;
    background-size: cover;

    .category-info {
      padding: 2rem 3rem;
      .category-name {
        font-size: 12vw;
      }

      .category-info-side {
        height: 12vw;
      }

      h3 {
        font-size: 3vw;
        font-weight: bolder;
      }

      span {
        font-size: 2vw;
      }
    }
  }
`;

export default CategoryBanner;
