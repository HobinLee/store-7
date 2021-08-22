import styled from "styled-components";
import { SectionType } from "..";
import { useState } from "react";
import ProductList from "@/Components/ProductList";

export interface ProductSectionProps extends SectionType {}

const ProductSection = ({ title, type }: ProductSectionProps) => {
  const [items, setItems] = useState([]);

  return (
    <SectionWrapper>
      <div className="title">{title}</div>
      <ProductList products={items} />
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div``;

export default ProductSection;
