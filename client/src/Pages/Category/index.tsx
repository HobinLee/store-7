import CategoryBanner from "./Banner";
import Filter from "./Filter";

import Header from "@/Components/Header";
import { PageWrapper, Contents } from "@/shared/styled";
import styled from "styled-components";
import Footer from "@/Components/Footer";
import { useProducts } from "@/api/products";
import ProductList from "@/Components/ProductList";

const CategoryPage = ({ params }) => {
  const { data: products } = useProducts(params);
  return (
    <Wrapper>
      <Header />
      <div className="page_contents">
        <CategoryBanner />
        <Filter />
        <ProductList products={products} />
      </div>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled(PageWrapper)`
  .page_contents {
    ${({ theme }) => theme.flexCenter}
    flex-direction: column;
    margin: 0 auto;
    max-width: 120rem;
    width: 100%;
    padding: 0 5rem;
    box-sizing: border-box;
    background: white;
  }
  margin-top: 10rem;
`;

export default CategoryPage;
