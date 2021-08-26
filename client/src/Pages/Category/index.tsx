import CategoryBanner from "./Banner";
import Filter, { filters } from "../../Components/Filter";

import Header from "@/Components/Header";
import { PageWrapper, Contents } from "@/shared/styled";
import styled from "styled-components";
import Footer from "@/Components/Footer";
import { useProducts } from "@/api/products";
import ProductList from "@/Components/ProductList";
import { media } from "@/styles/theme";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import { selectedCategoryState } from "@/store/category";

export interface CategoryType {
  id: number;
  name: string;
}

export interface MainCategoryType extends CategoryType {
  brief: string;
  backgroundImg: string;
  fontColor?: string;
  font?: string;
  subCategories?: CategoryType[];
}

export type CategoryParamType = {
  category: string;
  subCategory?: string;
  order?: string;
};

const CategoryPage = ({ params }) => {
  const [filter, setFilter] = useState(filters[0]);
  const [selected, setSelectedCategoryState] = useRecoilState(
    selectedCategoryState
  );

  useEffect(() => {
    setSelectedCategoryState({
      categoryId: parseInt(params.category) ?? 0,
      subCategoryId: params.subCategory ? parseInt(params.subCategory) : -1,
    });
  }, [params]);

  return (
    <>
      <Header />
      <Wrapper>
        <BGWrapper></BGWrapper>
        <CategoryBanner params={params} />
        <div className="page-contents">
          <div className="products-wrapper">
            <Filter
              categoryId={selected.categoryId}
              setFilter={setFilter}
              currentFilter={filter}
            />
            <ProductList
              useQuery={useProducts}
              params={{ ...params, order: filter.value }}
              pagination={true}
            />
          </div>
        </div>
        <Footer />
      </Wrapper>
    </>
  );
};

const Wrapper = styled(PageWrapper)`
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
    max-width: 110rem;
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

const BGWrapper = styled.div`
  width: 100vw;
  height: 30rem;
  top: 0;
  left: 0;
  margin-top: 13rem;
  position: fixed;
  overflow: hidden;
  ${({ theme }) => theme.flexCenter}
  background: black;
  z-index: 0;
  img {
    width: 100vw;
    height: auto;
    object-fit: cover;
  }
  ${media.custom(920)} {
    height: 24rem;
    img {
      height: 24rem;
      width: auto;
    }
  }
  ${media.mobile} {
    margin-top: 13rem;
    height: 17rem;
    img {
      width: 100vw;
      height: auto;
    }
  }
`;
export default CategoryPage;
