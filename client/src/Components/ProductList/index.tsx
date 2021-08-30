import { ProductElementType } from "@/shared/type";
import styled from "styled-components";
import { media } from "@/styles/theme";
import { UseQueryResult } from "react-query";
import { Loading } from "@/shared/styled";
import Item from "@/Components/Item";
import NoData from "@/Components/Common/NoData";

const ProductList = ({
  data: products,
  status,
  refetch,
}: UseQueryResult<ProductElementType[], unknown>) => (
  <ProductWrapList>
    {status === "success" &&
      (products?.length > 0 ? (
        products.map((product: ProductElementType) => (
          <Item {...product} refetch={refetch} key={product.id} />
        ))
      ) : (
        <NoData />
      ))}
    {status === "loading" && (
      <div className="loading-indicator">
        <Loading />
      </div>
    )}
  </ProductWrapList>
);

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

  .loading-indicator {
    height: 30rem;
    width: 100%;
    ${({ theme }) => theme.flexCenter}
  }

  ${media[768]} {
    li {
      flex: 1;
    }

    li:nth-last-child(1) {
      display: none;
    }
  }

  ${media.custom(600)} {
    li {
      padding: 0.5rem;
      flex: 0 0 50%;
    }

    li:nth-last-child(1) {
      display: block;
    }
  }
`;

export default ProductList;
