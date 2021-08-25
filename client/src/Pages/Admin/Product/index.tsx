import * as S from "./styles";
import properties from "../../../config/properties";
import { ProductElementType } from "@/shared/type";
import { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import { getProducts } from "@/api/products";

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    getProducts({ params: { keyword } }).then((data) => {
      setProducts(data);
    });
  }, [keyword]);

  return (
    <S.AdminProduct>
      <S.Header>
        <div>Total ({products.length})</div>
        <div>
          <SearchInput keyword={keyword} setKeyword={setKeyword} />
          <button>상품 추가</button>
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
      <S.ProductList>{convertProductsToElement(products)}</S.ProductList>
    </S.AdminProduct>
  );
};

const convertProductsToElement = (products: ProductElementType[]) => {
  return products.map((product) => {
    return (
      <S.ProductItem>
        <div>{product.id}</div>
        <div>
          <img src={getImage(product.image)} />
          {product.name}
        </div>
        <div>{product.amount}</div>
        <div>{0}</div>
        <div>{0}</div>
        <div>
          <button className="delete">삭제</button>
        </div>
      </S.ProductItem>
    );
  });
};

const getImage = (name: string) => {
  return properties.imgURL + name;
};

/*
<div>
        <label>상품명</label>
        <input id="name" type="text" />
        <br />
        <label>상품 가격</label>
        <input id="price" type="text" />
        <br />
        <label>배송비</label>
        <input id="deliveryCost" type="text" />
        <br />
        <label>할인률</label>
        <input id="discountRate" type="text" />
        <br />
        <label>재고</label>
        <input id="stock" type="text" />
        <br />
        <label>카테고리</label>
        <input id="category" type="text" />
        <br />
        <label>카테고리 - 서브</label>
        <input id="subCategory" type="text" />
        <br />
        <label>상품 이미지</label>
        <input type="file" id="images" accept="image/*" multiple />
        <input type="file" id="details" accept="image/*" multiple />
      </div>
      <br />
      <button onClick={submitProduct}>상품 추가</button>
*/

const getInput = (id: string) => {
  return document.getElementById(id) as HTMLInputElement;
};

const submitProduct = () => {
  const name = getInput("name").value;
  const price = getInput("price").value;
  const deliveryCost = getInput("deliveryCost").value;
  const discountRate = getInput("discountRate").value;
  const stock = getInput("stock").value;
  const category = getInput("category").value;
  const subCategory = getInput("subCategory").value;
  const images = getInput("images").files;
  const details = getInput("details").files;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price);
  formData.append("deliveryCost", deliveryCost);
  formData.append("discountRate", discountRate);
  formData.append("stock", stock);
  formData.append("category", category);
  formData.append("subCategory", subCategory);
  for (let i = 0; i < images.length; i++) {
    formData.append("images", images[i]);
  }
  for (let i = 0; i < details.length; i++) {
    formData.append("details", details[i]);
  }

  fetch(`${properties.baseURL}/products`, {
    method: "POST",
    body: formData,
  }).then((response) => {
    if (response.status === 201) {
      alert("상품이 추가되었습니다.");
    } else {
      alert("상품 추가 실패");
    }
  });
};

export default AdminProduct;
