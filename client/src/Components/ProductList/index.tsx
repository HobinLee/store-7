import { ProductWrapList } from "@/shared/styled";
import { ProductElementType } from "@/shared/type";
import Item from "@/Components/Item";
import { sampleProducts } from "@/shared/dummy";

interface ProductListProps {
  products: ProductElementType[];
}

const ProductList = ({ products }: ProductListProps) => (
  <ProductWrapList>
    {(products ?? sampleProducts).map((product: ProductElementType) => (
      <Item {...product} key={product.id} />
    ))}
  </ProductWrapList>
);

export default ProductList;
