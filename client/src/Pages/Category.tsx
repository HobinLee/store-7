import Header from "@/Components/Header";
import { PageWrapper, Contents } from "@/shared/styled";
import styled from "styled-components";
import Item from "@/Components/Item";
import Footer from "@/Components/Footer";
import { sampleCategory } from "@/shared/dummy";

const CategoryPage = () => {
  return (
    <Wrapper>
      <Header />
      <Contents>
        <Filter>
          <div className="total">총 233개</div>
          <div className="buttons">
            <div className="buttons__btn">추천순</div>
            <div className="buttons__btn">인기순</div>
            <div className="buttons__btn">최신순</div>
            <div className="buttons__btn">낮은가격순</div>
            <div className="buttons__btn">높은가격순</div>
          </div>
        </Filter>
        <div className="items">
          {sampleCategory.map((item, idx) => (
            <Item {...item} key={idx} />
          ))}
        </div>
      </Contents>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled(PageWrapper)`
  .items {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    &__item {
      width: 27rem;
      height: 30rem;
      background-color: lightgray;
      margin: 0.5rem;
    }
  }
`;

const Filter = styled.div`
  ${({ theme }) => theme.flexCenter}
  ${({ theme }) => theme.font.medium}
  justify-content: space-between;
  padding: 3rem 0;
  .total {
  }
  .buttons {
    ${({ theme }) => theme.flexCenter}
    &__btn {
      cursor: pointer;
      padding: 0 2rem;
    }
  }
`;

export default CategoryPage;
