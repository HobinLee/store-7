import { useState, useEffect } from "react";

import styled from "styled-components";
import { Loading } from "@/shared/styled";
import { media } from "@/styles/theme";

import Item from "@/Components/Item";
import NoData from "@/Components/Common/NoData";

import { useLazyLoad } from "@/hooks";
import { UseQueryResult } from "react-query";

import { useRecoilValue } from "recoil";
import { LocaitionStateType, locationState } from "@/store/history";

import { ProductElementType } from "@/shared/type";
import { ProductParams } from "@/api/products";

const START_PAGE = 1;
const PRODUCT_PER_PAGE = 12;

interface ProductListProps {
  useProductsQuery: (
    params: ProductParams
  ) => UseQueryResult<ProductElementType[], unknown>;
  order?: string;
}

const InfiniteScroll = ({ useProductsQuery, order }: ProductListProps) => {
  const [products, setProducts] = useState<ProductElementType[]>([]);
  const { params: urlParams }: LocaitionStateType =
    useRecoilValue(locationState);
  const [productParam, setProductParam] = useState<ProductParams>({
    ...urlParams,
    order,
    page: START_PAGE,
  });
  const { data: newProducts, status } = useProductsQuery(productParam);

  useEffect(() => {
    setProducts([]);
    setProductParam({ ...urlParams, order, page: START_PAGE });
  }, [urlParams, order]);

  const addProduct = () => {
    if (status !== "success") return;

    if (productParam.page === START_PAGE) {
      setProducts([...newProducts]);
    } else {
      setProducts([...products, ...newProducts]);
    }
  };

  useEffect(() => {
    const func = addProduct();
    return () => {
      func;
    };
  }, [newProducts]);

  const nextPage = () => {
    setProductParam({ ...urlParams, order, page: productParam.page + 1 });
  };

  const { ref } = useLazyLoad(nextPage);

  return (
    <ProductWrapList>
      {(products?.length ?? 0) > 0
        ? products.map((product: ProductElementType) => (
            <Item {...product} key={product.id} />
          ))
        : status === "success" && <NoData />}
      {status === "loading" && (
        <div className="loading-indicator">
          <Loading />
        </div>
      )}
      {status === "success" && (newProducts?.length ?? 0) === PRODUCT_PER_PAGE && (
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

  ${media[768]} {
    li {
      flex: 0 0 33.3%;
    }
  }

  ${media.mobile} {
    li {
      padding: 0.5rem;
      flex: 0 0 50%;
    }
  }
`;

export default InfiniteScroll;
