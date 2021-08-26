import * as S from "./styles";
import properties from "../../../config/properties";
import { AdminProductType } from "@/shared/type";
import { FC, MouseEvent, useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import { deleteProduct, getAllProductsByKeyword } from "@/api/products";
import { Page } from "..";

interface Props {
  setPage: (page: Page) => void;
}

const AdminProduct: FC<Props> = ({ setPage }) => {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [productDetail, setProductDetail] = useState<AdminProductType>(null);

  useEffect(() => {
    getAllProductsByKeyword(keyword).then((data) => {
      setProducts(data);
    });
  }, [keyword]);

  const productDetailCloseHandler = () => {
    setProductDetail(null);
  };

  const productDetailClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const getProductDetail = () => {
    if (productDetail) {
      return (
        <S.ProductDetail
          isShowed={productDetail !== null}
          onClick={productDetailClickHandler}
        >
          <div>
            <img src={getImage(productDetail.image)} />
            <div>
              <div className="header">
                <p>상품명</p>
                <span>{productDetail.name}</span>
              </div>
              <div className="header">
                <p>상품재고</p>
                <span className={productDetail.amount < 10 ? "red" : ""}>
                  {productDetail.amount}개
                </span>
              </div>
              <div className="info">
                <div>
                  <p>주문대기</p>
                  <span>{productDetail.orderWait}건</span>
                </div>
                <div>
                  <p>판매량</p>
                  <span>{productDetail.salse}개</span>
                </div>
              </div>
            </div>
          </div>
          대충 이 부분에는 해당 상품의 판매 정보를 시각화 하여 보여줄 예정
        </S.ProductDetail>
      );
    }
  };

  const clickProductAddHandler = () => {
    setPage("ProductCreate");
  };

  return (
    <>
      <S.AdminProduct>
        <S.Header>
          <div>Total ({products.length})</div>
          <div>
            <SearchInput keyword={keyword} setKeyword={setKeyword} />
            <button onClick={clickProductAddHandler}>상품 추가</button>
          </div>
        </S.Header>
        <S.ProductListHeader>
          <div>상품번호</div>
          <div>상품명</div>
          <div>재고</div>
          <div>주문대기</div>
          <div>판매량</div>
          <div>관리</div>
        </S.ProductListHeader>
        <S.ProductList>
          {convertProductsToElement(products, setProductDetail)}
        </S.ProductList>
      </S.AdminProduct>
      <S.ProductDetailBackground
        isShowed={productDetail !== null}
        onClick={productDetailCloseHandler}
      >
        {getProductDetail()}
      </S.ProductDetailBackground>
    </>
  );
};

const productDeleteClickHandler = (e, id: number) => {
  e.stopPropagation();
  const result = confirm("정말 삭제하시겠습니까?");
  if (result) {
    deleteProduct({ id })
      .then(() => {
        alert("삭제되었습니다.");
      })
      .catch((err) => {
        alert("삭제하는데 뭔가 이상한 에러가?!");
      });
  }
};

const convertProductsToElement = (
  products: AdminProductType[],
  setProductDetail
) => {
  return products.map((product) => {
    return (
      <S.ProductItem
        onClick={() => productClickHandler(product, setProductDetail)}
      >
        <div>{product.id}</div>
        <div>
          <img src={getImage(product.image)} />
          {product.name}
        </div>
        <div>{product.amount}개</div>
        <div>{product.orderWait}건</div>
        <div>{product.salse}개</div>
        <div>
          <button
            className="delete"
            onClick={(e) => productDeleteClickHandler(e, product.id)}
          >
            삭제
          </button>
        </div>
      </S.ProductItem>
    );
  });
};

const productClickHandler = (product: AdminProductType, setProductDetail) => {
  setProductDetail(product);
};

const getImage = (name: string) => {
  return properties.imgURL + name;
};

export default AdminProduct;
