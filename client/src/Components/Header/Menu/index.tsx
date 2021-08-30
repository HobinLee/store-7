import styled, { FlattenSimpleInterpolation } from "styled-components";
import { getSiblingIndex } from "@/utils/node";
import { Link } from "@/Router";
import { categories } from "@/shared/dummy";
import { hideScroll, media } from "@/styles/theme";
import { CategoryType } from "@/Pages/Category";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  categoryPaddingState,
  hoveredCategoryState,
  selectedCategoryState,
} from "@/store/category";

const Menu = () => {
  const selected = useRecoilValue(selectedCategoryState);
  const [hovered, setHoveredCategoryState] =
    useRecoilState(hoveredCategoryState);

  const checkChangeCategory = ({
    target,
    movementX: dx,
    movementY: dy,
  }): boolean => {
    if (target.nodeName === "UL") return false;

    if (!dx && !dy) return false;

    const moveRatio = Math.abs(dx / dy);

    // 기울기가 THRESHOLD 이상으로 넘어갈 때만 category 변경
    const THRESHOLD = 100;

    if (moveRatio !== 0 && moveRatio < THRESHOLD) return false;

    return true;
  };

  const setHoveredCategoryId = (id) => {
    setHoveredCategoryState({
      ...hovered,
      categoryId: id,
    });
  };

  const handleMouseMove = (e) => {
    if (!checkChangeCategory(e)) return;

    const $li: HTMLElement = e.target.closest("LI");
    const currentIndex = getSiblingIndex($li);
    const id = categories[currentIndex]?.id ?? 0;

    if (id !== hovered.categoryId) {
      setHoveredCategoryId(id);
    }
  };

  const handleMouseLeave = () => {
    setHoveredCategoryId(-1);
  };

  const highlighted = hovered.categoryId < 0 ? selected : hovered;

  const generateMainCategory = (
    <MainCategoryWrapper onMouseMove={handleMouseMove}>
      {categories.map((category: CategoryType) => (
        <li
          key={category.id}
          className={highlighted.categoryId === category.id ? "selected" : ""}
        >
          <Link to={`/category?category=${category.id}`}>{category.name}</Link>
        </li>
      ))}
    </MainCategoryWrapper>
  );

  const checkHideSubCategory =
    !categories[highlighted.categoryId / 100]?.subCategories.length &&
    !categories[selected.categoryId / 100]?.subCategories.length;

  const generateSubCategory = (
    <SubCategoryWrapper
      styleCss={categories[highlighted.categoryId / 100]?.style}
    >
      {categories[highlighted.categoryId / 100]?.subCategories?.map(
        (subCategory: CategoryType) => (
          <li
            key={subCategory.id}
            className={
              selected.subCategoryId === subCategory.id ? "selected" : ""
            }
          >
            <Link
              to={`/category?category=${highlighted.categoryId}&subCategory=${subCategory.id}`}
            >
              {subCategory.name}
            </Link>
          </li>
        )
      )}
    </SubCategoryWrapper>
  );

  return (
    <Wrapper id="category" onMouseLeave={handleMouseLeave}>
      {generateMainCategory}
      {!checkHideSubCategory && generateSubCategory}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-sizing: border-box;
  margin: auto;
  width: 100%;
  max-width: 120rem;
  padding: 0 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.font.medium}
  ${hideScroll}

  ul {
    width: 100%;
    box-sizing: border-box;
  }

  li {
    ${({ theme }) => theme.flexCenter}
    cursor: pointer;
    text-align: center;
    a {
      display: block;
      padding: 1rem;
    }
  }
  ${media.mobile} {
    padding: 0 1rem;
  }
`;

const MainCategoryWrapper = styled.ul`
  width: auto;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  font-weight: normal;
  color: #555;
  height: 100%;
  ${media.mobile} {
    ${({ theme }) => theme.font.large};
    font-weight: normal;
  }
  ${hideScroll}

  li {
    flex-shrink: 0;
    border-bottom: 3px solid ${({ theme }) => theme.color.white};
  }

  .selected {
    font-weight: bolder;
    a {
      color: ${({ theme }) => theme.color.primary1};
    }
    border-bottom: 3px solid ${({ theme }) => theme.color.primary1};
  }

  ${media.mobile} {
    height: 6rem;
  }
`;

const SubCategoryWrapper = styled.ul<{ styleCss: FlattenSimpleInterpolation }>`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: row;
  height: 3.6rem;

  ${({ styleCss }) => styleCss}

  ${media.mobile} {
    width: 100%;
    padding: 0;
    justify-content: flex-start;
  }
  ${({ theme }) => theme.font.medium}
  ${hideScroll}
  color: ${({ theme }) => theme.color.grey1};

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  li {
    padding: 0rem 3rem;
    flex-shrink: 0;
    &:hover {
      opacity: 0.5;
    }
  }

  .selected {
    font-weight: bolder;
    a {
      color: ${({ theme }) => theme.color.primary1};
    }
  }

  ${media.tablet} {
    display: flex;
    border-top: 1px solid ${({ theme }) => theme.color.light_grey1};
    padding: 0;
    justify-content: flex-start;

    li {
      padding: 0rem 1rem;
    }
  }
`;

export default Menu;
