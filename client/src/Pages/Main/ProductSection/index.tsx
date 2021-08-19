import styled from "styled-components";
import Item from "@/Components/Item";
import { ItemList } from "@/shared/styled";
import { sampleMain } from "@/shared/dummy";
import { SectionType } from "..";
import { useState } from "react";

export interface ProductSectionProps extends SectionType {}

const ProductSection = ({ title, type }: ProductSectionProps) => {
  const [items, setItems] = useState(sampleMain);

  return (
    <SectionWrapper>
      <div className="title">{title}</div>
      <ItemList>
        {items.map((item) => (
          <Item {...item} key={item.id} />
        ))}
      </ItemList>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div``;

export default ProductSection;
