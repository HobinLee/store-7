import styled from "styled-components";

const Filter = () => (
  <FilterWrapper>
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

const FilterWrapper = styled.div`
  ${({ theme }) => theme.flexCenter}
  ${({ theme }) => theme.font.medium}
  justify-content: space-between;
  padding: 3rem 0;

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
`;

export default Filter;
