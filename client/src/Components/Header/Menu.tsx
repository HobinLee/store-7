import { useState } from "react";
import styled from "styled-components";
import { getSiblingIndex } from "@/utils/node";
import { ETLink } from "@/Router";
import { categories } from "@/shared/dummy";

export type CategoryType = {
  title: string;
  subCategories?: CategoryType[];
};

const Menu = () => {
  const [currentCategoryIndex, setCurrentCategory] = useState(0);

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

  const handleMouseMove = (e) => {
    if (!checkChangeCategory(e)) return;

    const currentIndex = getSiblingIndex(e.target.closest("LI") as HTMLElement);
    setCurrentCategory(currentIndex);
  };

  return (
    <Wrapper>
      <MainCategoryWrapper onMouseMove={handleMouseMove}>
        {categories.map((category: CategoryType, idx: number) => (
          <li
            key={idx}
            className={currentCategoryIndex === idx ? "selected" : ""}
          >
            <ETLink key={idx} to={`/category?main_id=${idx}`}>
              {category.title}
            </ETLink>
          </li>
        ))}
      </MainCategoryWrapper>
      <SubCategoryWrapper>
        {categories[currentCategoryIndex].subCategories?.map(
          (category: CategoryType, idx: number) => (
            <li key={idx}>
              <ETLink
                key={idx}
                to={`/category?main_id=${currentCategoryIndex}&sub_id=${idx}`}
              >
                {category.title}
              </ETLink>
            </li>
          )
        )}
      </SubCategoryWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-sizing: border-box;
  margin: auto;
  width: 100%;
  max-width: 120rem;
  padding: 0 5rem;
  overflow-x: scroll;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.font.medium}

  ul {
    width: 100%;
    padding: 0.5rem 0;
  }

  li {
    padding: 1rem;
    cursor: pointer;
    text-align: center;
    &:hover {
      opacity: 0.5;
    }
  }
`;

const MainCategoryWrapper = styled.ul`
  justify-content: space-between;
  display: flex;
  flex-direction: row;

  .selected {
    font-weight: bolder;
    a {
      color: ${({ theme }) => theme.color.primary1};
    }
  }
`;

const SubCategoryWrapper = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: row;
  ${({ theme }) => theme.font.small}

  li {
    padding: 1rem 3rem;
  }
`;

export default Menu;
