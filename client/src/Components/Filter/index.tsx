import { categories } from "@/shared/dummy";
import { selectedCategoryState } from "@/store/category";
import { media } from "@/styles/theme";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

export interface FilterProps {
  currentFilter?: FilterType;
  setFilter: (filter: FilterType) => void;
}

export interface FilterType {
  name: string;
  value?: string;
}

export const filters: FilterType[] = [
  {
    name: "기본순",
    value: "default",
  },
  {
    name: "인기순",
    value: "hot",
  },
  {
    name: "최신순",
    value: "new",
  },
  {
    name: "낮은가격순",
    value: "priceAsc",
  },
  {
    name: "높은가격순",
    value: "priceDesc",
  },
];

const Filter = ({ currentFilter, setFilter }: FilterProps) => {
  const selectedCategory = useRecoilValue(selectedCategoryState);
  const handleClickFilter = (filter: FilterType) => {
    scrollTo({ top: 0, behavior: "smooth" });
    setFilter(filter);
  };
  const generateButtons = filters.map((filter: FilterType) => (
    <button
      className={`buttons__btn ${
        (!currentFilter && !filter.value) ||
        (currentFilter.name === filter.name && "selected")
      }`}
      key={filter.value}
      onClick={() => handleClickFilter(filter)}
    >
      {filter.name}
    </button>
  ));
  return (
    <FilterWrapper
      hasSubCategories={
        selectedCategory.categoryId < 0
          ? false
          : !!categories[selectedCategory.categoryId / 100]?.subCategories
              .length
      }
    >
      <div className="buttons">{generateButtons}</div>
    </FilterWrapper>
  );
};

const FilterWrapper = styled.div<{ hasSubCategories: boolean }>`
  ${({ theme }) => theme.flexCenter}
  ${({ theme }) => theme.font.medium}
  justify-content: flex-end;
  padding: 2rem 0;
  position: -webkit-sticky;
  position: sticky;
  width: 100%;
  background: white;
  z-index: 20;

  .buttons {
    ${({ theme }) => theme.flexCenter}
    &__btn {
      cursor: pointer;
      padding: 0 2rem;
    }
    .selected {
      font-weight: bolder;
      color: ${({ theme }) => theme.color.primary3};
    }
  }
  & > div:nth-child(1) {
    background: ${({ theme }) => theme.color.white};
  }

  top: ${({ hasSubCategories }) => (hasSubCategories ? 17.5 : 13.9)}rem;

  ${media.mobile} {
    top: ${({ hasSubCategories }) => (hasSubCategories ? 9.5 : 6)}rem;
  }
`;

export default Filter;
