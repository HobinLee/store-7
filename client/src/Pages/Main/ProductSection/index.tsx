import styled from "styled-components";
import { SectionType } from "..";
import ProductList from "@/Components/ProductList";
import { useProducts } from "@/api/products";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { loginState } from "@/store/state";

export interface ProductSectionProps extends SectionType {}

const MAIN_PAGE_PRODUCTS_SIZE = 4;

const ProductSection = ({ title, type }: ProductSectionProps) => {
  const isLoggedIn = useRecoilValue(loginState);
  const product = useProducts({
    order: type,
    size: MAIN_PAGE_PRODUCTS_SIZE,
    page: 1,
  });

  useEffect(() => {
    product.refetch();
  }, [isLoggedIn]);

  return (
    <SectionWrapper {...{ title }}>
      <div className="title">{title}</div>
      <ProductList {...product} />
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div<{ title: string }>`
  .title {
    position: relative;
    &::after {
      content: "${({ title }) => `${title}`}";
      position: absolute;
      white-space: nowrap;
      top: 0.2rem;
      left: 0.2rem;
      color: ${({ theme }) => theme.color.primary1};
      z-index: -1;
    }
  }
`;

export default ProductSection;
