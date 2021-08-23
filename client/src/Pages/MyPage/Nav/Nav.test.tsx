import "jest-styled-components";
import { render, fireEvent } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import Nav, { NavProps } from "./index";

// const SidebarProps: NavProps = {
//   setCurrent: (path: string) => {},
// };

// describe("<Sidebar />", () => {
//   let page;
//   beforeEach(() => {
//     const { container } = render(<Nav {...SidebarProps} />);
//     page = container;
//   });
//   it("should render component in document", () => {
//     expect(page).toBeInTheDocument();
//   });

//   it("should render contents in sidebar", () => {
//     expect(screen.queryByText("쇼핑정보")).toBeInTheDocument();
//     expect(screen.queryByText("주문목록/배송조회")).toBeInTheDocument();
//     expect(screen.queryByText("찜리스트")).toBeInTheDocument();

//     expect(screen.queryByText("회원정보")).toBeInTheDocument();
//     expect(screen.queryByText("회원정보 변경")).toBeInTheDocument();
//     expect(screen.queryByText("나의 상품문의")).toBeInTheDocument();
//     expect(screen.queryByText("나의 상품후기")).toBeInTheDocument();
//   });
// });
