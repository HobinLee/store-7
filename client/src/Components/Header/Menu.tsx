import React, { useState } from "react";
import styled from "styled-components";
import { getSiblingIndex } from "@/utils/node";

type CategoryType = {
  title: string,
  subCategories?: CategoryType[]
}
//전체문구리빙책배민그린ㅋㅋ에디션을지로에디션배달이친구들선물세트콜라보레이션
const categories:CategoryType[] = [
  {
    title: '전체'
  }, {
    title: '문구',
    subCategories: [{
      title:'펜'
    },{
      title:'공책'
    }]
  }, {
    title: '리빙',
    subCategories: [{
      title:'가방'
    },{
      title:'그립톡'
    },{
      title:'레터링시트지'
    },{
      title:'돗자리'
    },{
      title:'기타'
    }]
  }, {
    title: '책',
    subCategories: [{
      title:'매거진'
    },{
      title:'소설'
    },{
      title:'교양용'
    },{
      title:'전문가용'
    },{
      title:'기타'
    }]
  }, {
    title: '배민그린',
    subCategories: [{
      title:'가방'
    },{
      title:'문구'
    },{
      title:'리빙'
    },{
      title:'기타'
    }]
  }, {
    title: 'ㅋㅋ에디션',
    subCategories: [{
      title:'양말'
    },{
      title:'슬리퍼'
    },{
      title:'핸드폰 액세서리'
    },{
      title:'옷'
    },{
      title:'기타'
    }]
  }, {
    title: '을지로에디션',
    subCategories: [{
      title:'뱃지'
    },{
      title:'엽서'
    },{
      title:'리빙'
    },{
      title:'기타'
    }]
  }, {
    title: '배달이친구들',
    subCategories: [{
      title:'포스터'
    },{
      title:'피규어'
    },{
      title:'기타'
    }]
  }, {
    title: '선물세트',
    subCategories: [{
      title:'문구'
    },{
      title:'리빙'
    },{
      title:'기타'
    }]
  }, {
    title: '콜라보레이션',
    subCategories: [{
      title:'업사이클링'
    },{
      title:'세븐일레븐'
    },{
      title:'넛때문이야'
    }]
  },
];

const Menu = () => {
  const [currentCategoryIndex, setCurrentCategory] = useState(1);
  
  const checkChangeCategory = (e): boolean => {
    if (e.target.nodeName === 'UL') return false;

    const [dx, dy] = [e.movementX, e.movementY];

    if(!dx && !dy) return false;

    const moveRatio = Math.abs(dx/dy);
    
    // 기울기가 THRESHOLD 이상으로 넘어갈 때만 category 변경
    const THRESHOLD = 20;

    if (moveRatio !== 0 && (moveRatio < THRESHOLD)) return false;
    
    return true;
  }

  const handleMouseMove = (e) => {
    if(!checkChangeCategory(e)) return;

    const currentIndex = getSiblingIndex(e.target as HTMLElement);
    setCurrentCategory(currentIndex);
  }

  return (
    <Wrapper>
      <MainCategoryWrapper onMouseMove={handleMouseMove}>
        {categories.map((category: CategoryType, idx: number) =>
        <li key={idx} className={currentCategoryIndex === idx ? 'selected' : ''}>
          {category.title}
        </li>)}
      </MainCategoryWrapper>
      <SubCategoryWrapper>
        {categories[currentCategoryIndex].subCategories?.map(
          (category: CategoryType, idx: number) =>
          <li key={idx}>
            {category.title}
          </li>
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
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  .selected {
    font-weight: bolder;
    color: ${({ theme }) => theme.color.primary1};
  }
`

const SubCategoryWrapper = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  ${({ theme }) => theme.font.small}

  li {
    padding: 1rem 3rem;
  }
`

export default Menu;


/****
 * 
 * 
 * 
 * 
 * 
 * const Menu = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const handleMenuOpen = (val: boolean) => {
    setIsMenuOpened(val);
  };

  const [isMenuhover, setIsMenuHover] = useState(false);
  const handleMenuHover = (val: boolean) => {};

  return (
    <Wrapper
      onMouseEnter={() => handleMenuOpen(true)}
      onMouseLeave={() => handleMenuOpen(false)}
    >
      <MenuIcon />
      {isMenuOpened && (
        <DropdownWrapper style={{ left: 0, top: "10rem" }}>
          {[0, 0, 0, 0, 0, 0, 0].map((i, idx) => (
            <ETLink to={`/category/${idx}`}>
              <DropdownItem key={idx}>asdf</DropdownItem>
            </ETLink>
          ))}
        </DropdownWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  cursor: pointer;
  position: relative;
  width: 10rem;
  height: 10rem;

  img {
    width: 10rem;
    height: 10rem;
  }
`;

 */
