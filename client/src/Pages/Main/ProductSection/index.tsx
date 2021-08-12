import React from "react";
import styled from "styled-components";
import Item from "@/Components/Item";
import { ItemList } from "@/shared/styled";
import { sampleMain } from "@/shared/dummy";

type ProductSectionProps = {
  title: string;
};

const ProductSection = ({ title }: ProductSectionProps) => {
  return (
    <SectionWrapper>
      <div className="title">{title}</div>
      <ItemList>
        {sampleMain.map((item) => (
          <li key={item.id}>
            <Item {...item} />
          </li>
        ))}
      </ItemList>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div``;

export default ProductSection;
