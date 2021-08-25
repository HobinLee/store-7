import { ProductElementType } from "@/shared/type";
import Item from "@/Components/Item";
import styled from "styled-components";
import { media } from "@/styles/theme";
import { UseQueryResult } from "react-query";
import Loading from "@/Components/Loading";

interface ProductListProps {
  useQuery: (params: any) => UseQueryResult<ProductElementType[], unknown>;
  params?: any;
}

const ProductList = ({ useQuery, params }: ProductListProps) => {
  const { data: products, status } = useQuery(params);
  return (
    <ProductWrapList>
      {products?.map((product: ProductElementType) => (
        <Item {...product} key={product.id} />
      ))}
      {status === "loading" && (
        <div className="loading-indicator">
          <Loading />
        </div>
      )}
    </ProductWrapList>
  );
};

const ProductWrapList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  li {
    padding: 1rem;
    box-sizing: border-box;
    flex: 0 0 25%;
  }
  ${media.mobile} {
    li {
      padding: 0.5rem;
      flex: 0 0 50%;
    }
  }
  .loading-indicator {
    height: 30rem;
    width: 100%;
    ${({ theme }) => theme.flexCenter}
  }
`;

export default ProductList;
