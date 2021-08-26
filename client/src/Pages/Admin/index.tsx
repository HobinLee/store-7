import * as S from "./styles";
import LogoImage from "../../assets/logo.png";
import DashboardIcon from "../../assets/dashboard.png";
import BoxIcon from "../../assets/box.png";
import ClipboardIcon from "../../assets/clipboard.png";
import { useState } from "react";
import AdminHome from "./Home";
import AdminProduct from "./Product";
import AdminProductCreate from "./Create";

export type Page = "Home" | "Product" | "Order" | "ProductCreate";

const AdminPage = () => {
  const [currentPage, setPage] = useState<Page>("Product");
  const Pages = {
    Home: <AdminHome />,
    Product: <AdminProduct setPage={setPage} />,
    ProductCreate: <AdminProductCreate />,
  };

  const SidebarItem = (name: Page, icon: string) => {
    return (
      <S.SideBarItem
        onClick={() => setPage(name)}
        isCurrentPage={currentPage.startsWith(name)}
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
      <S.ContentBox>{Pages[currentPage]}</S.ContentBox>
    </S.AdminPageWrapper>
  );
};

export default AdminPage;
