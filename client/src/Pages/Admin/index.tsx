import * as S from "./styles";
import LogoImage from "../../assets/logo.png";
import DashboardIcon from "../../assets/dashboard.png";
import BoxIcon from "../../assets/box.png";
import ClipboardIcon from "../../assets/clipboard.png";
import { useState } from "react";
import properties from "../../config/properties";

type Page = "Home" | "Product" | "Order";

const AdminPage = () => {
  const [currentPage, setPage] = useState<Page>("Product");

  const SidebarItem = (name: Page, icon: string) => {
    return (
      <S.SideBarItem
        onClick={() => setPage(name)}
        isCurrentPage={currentPage === name}
      >
        <img src={icon} />
        {name}
      </S.SideBarItem>
    );
  };

  return (
    <S.AdminPageWrapper>
      <S.SideBar>
        <img src={LogoImage} />
        {SidebarItem("Home", DashboardIcon)}
        {SidebarItem("Product", BoxIcon)}
        {SidebarItem("Order", ClipboardIcon)}
      </S.SideBar>
      <S.ContentBox>{getCurrentPage(currentPage)}</S.ContentBox>
    </S.AdminPageWrapper>
  );
};

const getCurrentPage = (page: Page) => {
  if (page === "Home") return AdminHome();
  if (page === "Product") return AdminProduct();
};

const AdminHome = () => {
  return <S.AdminHome>Home</S.AdminHome>;
};

const AdminProduct = () => {
  return (
    <S.AdminProduct>
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
    </S.AdminProduct>
  );
};

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

export default AdminPage;
