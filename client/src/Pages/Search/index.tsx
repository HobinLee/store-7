import Header from "@/Components/Header";
import { PageWrapper, Contents } from "@/shared/styled";
import styled from "styled-components";
import Footer from "@/Components/Footer";
import { useRecoilValue } from "recoil";
import Filter, { filters } from "../../Components/Filter";
import InfiniteScroll from "@/Components/ProductList/InfiniteScroll";
import { LocaitionStateType, locationState } from "@/store/history";
import { useState } from "react";
import { getSearchedProducts } from "@/api/search";
import { media } from "@/styles/theme";

const SearchPage = () => {
  const { params }: LocaitionStateType = useRecoilValue(locationState);
  const [filter, setFilter] = useState(filters[0]);
  return (
    <>
      <Header />
      <Wrapper>
        <div className="page-contents">
          <div className="products-wrapper">
            <Filter setFilter={setFilter} currentFilter={filter} />
            <div className="search-page__keyword">
              <span>{params?.keyword}</span>검색결과
            </div>
            <InfiniteScroll
              productAPI={getSearchedProducts}
              order={filter.value}
            />
          </div>
        </div>
        <Footer />
      </Wrapper>
    </>
  );
};

const Wrapper = styled(PageWrapper)`
  ${({ theme }) => theme.flexCenter}
  .search-page__keyword {
    ${({ theme }) => theme.font.medium};
    padding-top: 5rem;
    span {
      font-weight: bolder;
      ${({ theme }) => theme.font.xlarge};
      color: ${({ theme }) => theme.color.primary3};
      margin-right: 1rem;
    }
  }
  .page-contents {
    padding: 0 5rem;
    position: relative;
    ${({ theme }) => theme.flexCenter}
    flex-direction: column;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
    background: white;
    z-index: 10;
  }
  .products-wrapper {
    width: 100%;
    max-width: 110rem;
    padding: 0rem;
  }
  ${media.mobile} {
    .page-contents {
      padding: 0 1rem;
    }
    .products-wrapper {
      max-width: 120rem;
      padding: 0rem;
    }
  }
`;

export default SearchPage;
