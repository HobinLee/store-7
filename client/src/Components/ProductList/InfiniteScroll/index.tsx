import { ProductElementType } from "@/shared/type";
import Item from "@/Components/Item";
import styled from "styled-components";
import { media } from "@/styles/theme";
import { UseQueryResult } from "react-query";
import { Loading } from "@/shared/styled";
import { useState } from "react";
import { useEffect } from "react";
import NoData from "@/Components/NoData";
import { useLazyLoad } from "@/hooks/useLazyLoad";
import { useRecoilValue } from "recoil";
import { locationState } from "@/store/history";

const START_PAGE = 1;
const PRODUCT_PER_PAGE = 12;

interface ProductListProps {
  useQuery: (params: any) => UseQueryResult<ProductElementType[], unknown>;
  order?: string;
  isPaginated?: boolean;
}

const InfiniteScroll = ({
  useQuery,
  order,
  isPaginated = false,
}: ProductListProps) => {
  const [products, setProducts] = useState([]);
  const [isEndPage, setIsEndPage] = useState(!isPaginated);
  const [page, setPage] = useState(START_PAGE);

  const { params: urlParams } = useRecoilValue(locationState);

  useEffect(() => {
    setIsEndPage(false);
    setPage(1);
  }, [urlParams, order]);
  const nextPage = () => {
    setPage(page + 1);
  };

  const { ref } = useLazyLoad(nextPage);

  const {
    data: newProducts,
    status,
    refetch,
  } = useQuery({ ...urlParams, order, page });

  useEffect(() => {
    console.log(urlParams.category, page, newProducts);
    if (status === "success") {
      if (!urlParams || page === 1) {
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
      {products?.length > 0 ? (
        products.map((product: ProductElementType) => (
          <Item {...product} refetch={refetch} key={product.id} />
        ))
      ) : (
        <NoData />
      )}
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

export default InfiniteScroll;
