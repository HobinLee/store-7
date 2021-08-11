import React, { useState } from "react";
import styled from "styled-components";
import { getSiblingIndex } from "@/utils/node";
import { ETLink } from "@/Router";

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
  const [currentCategoryIndex, setCurrentCategory] = useState(0);
  
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

    const currentIndex = getSiblingIndex(e.target.closest('LI') as HTMLElement);
    setCurrentCategory(currentIndex);
  }

  return (
    <Wrapper>
      <MainCategoryWrapper onMouseMove={handleMouseMove}>
        {categories.map((category: CategoryType, idx: number) =>
        <li key={idx} className={currentCategoryIndex === idx ? 'selected' : ''}>
          <ETLink key={idx} to={`/category?main_id=${idx}`}>
            {category.title}
          </ETLink>
        </li>)}
      </MainCategoryWrapper>
      <SubCategoryWrapper>
        {categories[currentCategoryIndex].subCategories?.map(
          (category: CategoryType, idx: number) =>
          <li key={idx}>
            <ETLink key={idx} to={`/category?main_id=${currentCategoryIndex}&sub_id=${idx}`}>
              {category.title}
            </ETLink>
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
`

const SubCategoryWrapper = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: row;
  ${({ theme }) => theme.font.small}

  li {
    padding: 1rem 3rem;
  }
`

export default Menu;