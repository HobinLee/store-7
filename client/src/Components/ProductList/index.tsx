import { ProductWrapList } from "@/shared/styled";
import { ProductElementType } from "@/shared/type";
import Item from "@/Components/Item";

interface ProductListProps {
  products: ProductElementType[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <ProductWrapList>
      {products?.map((product: ProductElementType) => (
        <Item {...product} key={product.id} />
      ))}
    </ProductWrapList>
  );
};

export default ProductList;
