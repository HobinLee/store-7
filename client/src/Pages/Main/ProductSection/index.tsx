import styled from "styled-components";
import { SectionType } from "..";
import { useState } from "react";
import ProductList from "@/Components/ProductList";

export interface ProductSectionProps extends SectionType {}

const ProductSection = ({ title, type }: ProductSectionProps) => {
  const [items, setItems] = useState([]);

  return (
    <SectionWrapper {...{ title }}>
      <div className="title">{title}</div>
      <ProductList products={items} />
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
