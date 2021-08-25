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

  return (
    <Wrapper>
      <BGWrapper></BGWrapper>
      <Header category={params.category} />
      <CategoryBanner params={params} />
      <div className="page-contents">
        <div className="products-wrapper">
          <Filter setFilter={setFilter} currentFilter={filter} />
          <ProductList
            useQuery={useProducts}
            params={{ ...params, order: filter.value }}
            pagination={true}
          />
        </div>
      </div>
      <Footer />
    </Wrapper>
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
  padding-top: 10rem;
  ${media.mobile} {
    padding-top: 10rem;
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
  margin-top: 10rem;
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
  ${media.custom(1200)} {
    img {
      height: 30rem;
      width: auto;
    }
  }
  ${media.custom(920)} {
    height: 24rem;
    img {
      height: 24rem;
      width: auto;
    }
  }
  ${media.mobile} {
    margin-top: 10.6rem;
    height: 16.4rem;
    img {
      width: 100vw;
      height: auto;
    }
  }
`;
export default CategoryPage;
