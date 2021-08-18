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
          <Item {...item} key={item.id} />
        ))}
      </ItemList>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div``;

export default ProductSection;
