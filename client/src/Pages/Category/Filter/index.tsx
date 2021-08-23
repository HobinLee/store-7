import { media } from "@/styles/theme";
import styled from "styled-components";

const Filter = ({ category }: { category: string }) => (
  <FilterWrapper category={category}>
    <div className="total">총 233개</div>
    <div className="buttons">
      <div className="buttons__btn">추천순</div>
      <div className="buttons__btn">인기순</div>
      <div className="buttons__btn">최신순</div>
      <div className="buttons__btn">낮은가격순</div>
      <div className="buttons__btn">높은가격순</div>
    </div>
  </FilterWrapper>
);

const FilterWrapper = styled.div<{
  category: string;
}>`
  ${({ theme }) => theme.flexCenter}
  ${({ theme }) => theme.font.medium}
  justify-content: space-between;
  padding: 2rem 0;
  position: -webkit-sticky;
  position: sticky;
  top: ${({ category }) => (category === "0" ? 14.6 : 17.8)}rem;
  width: 100%;
  background: white;
  z-index: 20;

  .buttons {
    ${({ theme }) => theme.flexCenter}
    &__btn {
      cursor: pointer;
      padding: 0 2rem;
    }
  }
  & > div:nth-child(1) {
    background: ${({ theme }) => theme.color.white};
  }
  ${media[768]} {
    top: ${({ category }) => (category === "0" ? 10.6 : 13.8)}rem;
  }
`;

export default Filter;
