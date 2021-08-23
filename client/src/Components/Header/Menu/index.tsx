import { useState } from "react";
import styled from "styled-components";
import { getSiblingIndex } from "@/utils/node";
import { Link } from "@/Router";
import { categories } from "@/shared/dummy";
import { media } from "@/styles/theme";

export type CategoryType = {
  name: string;
  subCategories?: CategoryType[];
};

const Menu = () => {
  const [currentCategoryIndex, setCurrentCategory] = useState(0);
  const [padding, setPadding] = useState(0);

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

  const getPadding = ($li: HTMLElement) => {
    const left: number = $li.offsetLeft - $li.parentElement.offsetLeft;
    const width: number = $li.offsetWidth;
    const barWidth: number = $li.parentElement.offsetWidth;

    setPadding(barWidth - 2 * left - width);
  };

  const handleMouseMove = (e) => {
    if (!checkChangeCategory(e)) return;

    const $li: HTMLElement = e.target.closest("LI");
    const currentIndex = getSiblingIndex($li);

    if (currentIndex !== currentCategoryIndex) {
      setCurrentCategory(currentIndex);
      getPadding($li);
    }
  };

  const generateMainCategory = (
    <MainCategoryWrapper onMouseMove={handleMouseMove}>
      {categories.map((category: CategoryType, idx: number) => (
        <li
          key={idx}
          className={currentCategoryIndex === idx ? "selected" : ""}
        >
          <Link key={idx} to={`/category?main_id=${idx}`}>
            {category.name}
          </Link>
        </li>
      ))}
    </MainCategoryWrapper>
  );

  const getWidth = (list: CategoryType[]): number => {
    const CHAR_WIDTH = 10; //한 글자당 가로 크기: 10px (대충)
    const PADDING = 60; //한 버튼당 가로 패딩이: 6rem

    return (
      list?.reduce(
        (prev, curr) => prev + curr.name.length * CHAR_WIDTH + PADDING,
        0
      ) ?? 0
    );
  };

  const generateSubCategory = (
    <SubCategoryWrapper
      padding={padding}
      width={getWidth(categories[currentCategoryIndex].subCategories)}
    >
      {categories[currentCategoryIndex].subCategories?.map(
        (category: CategoryType, idx: number) => (
          <li key={idx}>
            <Link
              key={idx}
              to={`/category?category=${categories[currentCategoryIndex].name}&subCategory=${category.name}`}
            >
              {category.name}
            </Link>
          </li>
        )
      )}
    </SubCategoryWrapper>
  );

  return (
    <Wrapper>
      {generateMainCategory}
      {generateSubCategory}
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

  ul {
    width: 100%;
  }

  li {
    padding: 1rem;
    cursor: pointer;
    text-align: center;
    &:hover {
      opacity: 0.5;
    }
  }
  ${media[768]} {
    padding: 0 1rem;
  }
`;

const MainCategoryWrapper = styled.ul`
  padding: 0.5rem 0;
  width: auto;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  color: #fff;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  li {
    flex-shrink: 0;
  }

  .selected {
    font-weight: bolder;
    a {
      color: ${({ theme }) => theme.color.primary1};
    }
  }
`;

/* Sub 카테고리가 메인 카테고리 가운데 오도록 padding 값을 구하는 함수!
 * 하지만 만약 Sub카테고리의 길이가 길어서 가운데 온다면 전체 영역을 벗어 나기 때문에
 * padding을 적용하지 않고 flex-start, flex-end로 제일 끝에 오도록 반영
 */
const setPadding = (padding: number, width: number): string => {
  const PADDING = 100; //100px;

  const barWidth = window.innerWidth - PADDING;
  const totalWidth = Math.abs(padding) + width;

  // 가운데 위치해도 괜찮은 경우
  if (totalWidth < barWidth) {
    return padding > 0
      ? `padding-right:${padding}px;`
      : `padding-left:${Math.abs(padding)}px;`;
  } else {
    //길이가 길어서 가운데 위치 한다면 가릴 경우
    return padding > 0
      ? `justify-content: flex-start;`
      : `justify-content: flex-end;`;
  }
};

const SubCategoryWrapper = styled.ul<{ padding: number; width: number }>`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: row;
  ${({ padding, width }) => setPadding(padding, width)}
  ${({ theme }) => theme.font.small}
  overflow-x: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  color: #fff;

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  li {
    padding: 1rem 3rem;
    flex-shrink: 0;
  }
`;

export default Menu;
