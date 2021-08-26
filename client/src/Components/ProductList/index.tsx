import { ProductElementType } from "@/shared/type";
import Item from "@/Components/Item";
import styled from "styled-components";
import { media } from "@/styles/theme";
import { UseQueryResult } from "react-query";
import { Loading } from "@/shared/styled";
import { useState } from "react";
import { ProductParams } from "@/api/products";
import { useLazyLoad } from "@/hooks/useLazyLoad";
import { useEffect } from "react";

const PRODUCT_PER_PAGE = 12;

interface ProductListProps {
  useQuery: (params: any) => UseQueryResult<ProductElementType[], unknown>;
  params?: ProductParams;
  pagination?: boolean;
}

const ProductList = ({
  useQuery,
  params: originParams,
  pagination,
}: ProductListProps) => {
  const [isEnd, setIsEnd] = useState(!pagination);

  const [page, setPage] = useState(1);

  const nextPage = () => {
    if (status === "success" && !isEnd) {
      setPage(page + 1);
    }
  };

  const { ref } = useLazyLoad(nextPage);
  const { data: newProducts, status } = useQuery({ ...originParams, page });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (status === "success") {
      setProducts([...products, ...newProducts]);

      if (newProducts?.length < PRODUCT_PER_PAGE) {
        setIsEnd(true);
      }
    }
    if (status === "error") {
      setIsEnd(true);
    }
  }, [newProducts]);

  useEffect(() => {
    setPage(1);
    setIsEnd(!pagination);
    setProducts([]);
  }, [originParams]);

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
      {status === "success" && !isEnd && (
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
