import { useState } from "react";

import styled from "styled-components";
import { PageWrapper, Contents } from "@/shared/styled";
import { media } from "@/styles/theme";

import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import Filter, { filters } from "@/Components/Filter";
import InfiniteScroll from "@/Components/ProductList/InfiniteScroll";

import { useRecoilValue } from "recoil";
import { LocaitionStateType, locationState } from "@/store/history";

import { useSearchProducts } from "@/api/search";

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
              useProductsQuery={useSearchProducts}
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
