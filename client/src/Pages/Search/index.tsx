import Header from "@/Components/Header";
import { PageWrapper, Contents } from "@/shared/styled";
import styled from "styled-components";
import Footer from "@/Components/Footer";
import { useSearchProducts } from "@/api/search";
import ProductList from "@/Components/ProductList";
import { useEffect } from "react";

const SearchPage = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <Contents>
          <div className="search-page__keyword">
            {/* <span>{params.keyword}</span> */}
          </div>
          {/* <ProductList
            useQuery={useSearchProducts}
            params={params}
            pagination={true}
          /> */}
        </Contents>
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
  .search-page__no-result {
    ${({ theme }) => theme.font.xlarge};
    padding: 16rem;
  }
`;

export default SearchPage;
