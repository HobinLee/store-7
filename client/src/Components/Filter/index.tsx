import { media } from "@/styles/theme";
import { useState } from "react";
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
  const generateButtons = filters.map((filter: FilterType) => (
    <button
      className={`buttons__btn ${
        (!currentFilter && !filter.value) ||
        (currentFilter.name === filter.name && "selected")
      }`}
      key={filter.value}
      onClick={() => setFilter(filter)}
    >
      {filter.name}
    </button>
  ));
  return (
    <FilterWrapper>
      <div className="buttons">{generateButtons}</div>
    </FilterWrapper>
  );
};

const FilterWrapper = styled.div`
  ${({ theme }) => theme.flexCenter}
  ${({ theme }) => theme.font.medium}
  justify-content: flex-end;
  padding: 2rem 0;
  position: -webkit-sticky;
  position: sticky;
  top: 14.6rem;
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
  ${media.mobile} {
    top: 10.6rem;
  }
`;

export default Filter;
