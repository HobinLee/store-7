import { ProductElementType } from "@/shared/type";
import Item from "@/Components/Item";
import styled from "styled-components";
import { media } from "@/styles/theme";
import { UseQueryResult } from "react-query";
import { Loading } from "@/shared/styled";
import { useRef, useState } from "react";
import { ProductParams } from "@/api/products";
import { useLazyLoad } from "@/hooks/useLazyLoad";
import { useEffect } from "react";

const PRODUCT_PER_PAGE = 4;

interface ProductListProps {
  useQuery: (params: any) => UseQueryResult<ProductElementType[], unknown>;
  productParams?: ProductParams;
  nextPage?: () => void;
}

const ProductList = ({
  useQuery,
  productParams,
  nextPage,
}: ProductListProps) => {
  const [products, setProducts] = useState([]);
  const [isEndPage, setIsEndPage] = useState(!nextPage);

  const { ref } = useLazyLoad(nextPage);

  const { data: newProducts, status, refetch } = useQuery(productParams);

  useEffect(() => {
    if (status === "success") {
      if (!productParams || productParams.page === 1) {
        setProducts([...newProducts]);
      } else {
        setProducts([...products, ...newProducts]);
      }

      if (newProducts?.length < PRODUCT_PER_PAGE) {
        setIsEndPage(true);
      }
    }
    if (status === "error") {
      setIsEndPage(true);
    }
  }, [newProducts, status]);

  return (
    <ProductWrapList>
      {products?.map((product: ProductElementType) => (
        <Item {...product} refetch={refetch} key={product.id} />
      ))}
      {status === "loading" && (
        <div className="loading-indicator">
          <Loading />
        </div>
      )}
      {status === "success" && !isEndPage && (
        <div className="loading-indicator" ref={ref}>
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
  .load-next {
    height: 30rem;
    width: 100%;
  }
  .lazy-loading {
    height: 30rem;
  }
`;

export default ProductList;
