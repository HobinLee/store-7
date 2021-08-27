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
const START_PAGE = 1;

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
  const [products, setProducts] = useState([]);
  const [params, setParams] = useState({ ...originParams, page: START_PAGE });

  const nextPage = () => {
    console.log(status, params);
    if (status === "loading") {
      return false;
    }
    if (status === "success" && !isEnd) {
      console.log("next!");
      setParams({ ...originParams, page: params.page + 1 });
      return true;
    }
    return true;
  };

  const { ref } = useLazyLoad(nextPage);

  const { data: newProducts, status, refetch } = useQuery(params);

  const initStates = () => {
    setParams({ ...originParams, page: START_PAGE });
    setIsEnd(!pagination);
  };

  useEffect(() => {
    console.log(status);
    if (status === "success") {
      console.log(newProducts);
      if (params.page === 1) {
        setProducts([...newProducts]);
      } else {
        setProducts([...products, ...newProducts]);
      }

      if (newProducts?.length < PRODUCT_PER_PAGE) {
        console.log("a");
        setIsEnd(true);
      }
    }
    if (status === "error") {
      setIsEnd(true);
      console.log("E");
    }
  }, [newProducts, status]);

  useEffect(() => {
    initStates();
  }, [originParams]);

  return (
    <ProductWrapList>
      {products?.map((product: ProductElementType) => (
        <Item {...product} refetch={refetch} key={product.id} />
      ))}
      {status === "loading" && (
        <div className="loading-indicator">
          ㄴㄴ
          <Loading />
        </div>
      )}
      {status === "success" && !isEnd && (
        <div className="loading-indicator" ref={ref}>
          ㅇㅇ
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
